# Legacy Impact: Acesso do Cliente aos Atendimentos

> Identificador: `003-acesso-cliente-atendimentos`
> Data: `2026-07-20`

## Resumo

Esta feature não migra nem altera nenhuma rotina do sistema legado (Adianti/PHP) — o legado nunca teve um ator "Cliente" com login próprio (`_reversa_sdd/architecture.md#🗺️-diagrama-de-contexto-de-sistema-nível-1`). Todo o trabalho é aditivo sobre o sistema já migrado (NestJS/Angular): um novo módulo de backend/frontend para o portal do cliente, um campo novo em `Cliente` (`usuarioId`, vínculo com um usuário já existente), e uma extensão pontual e retrocompatível em `AgendamentosService`. Nenhuma rotina, tela ou regra de negócio confirmada do legado foi alterada ou removida.

## Arquivos afetados

| Arquivo afetado | Componente | Tipo | Severidade | Justificativa |
|------------------|------------|------|------------|----------------|
| `backend/prisma/schema.prisma` | `Cliente`, `User` (modelo de dados) | delta-de-dados | LOW | Campo novo, opcional, único (`Cliente.usuarioId`); nenhum campo existente removido ou renomeado. |
| `backend/prisma/manual-migrations/2026-07-20_add_cliente_id_to_users.sql` | Banco de dados | delta-de-dados | LOW | Script criado mas **não aplicado** neste ambiente; idempotente, aditivo, `ON DELETE SET NULL`. Conteúdo corrigido durante `/reversa-coding` (coluna `usuario_id` em `cliente`, não `cliente_id` em `users`). |
| `backend/prisma/seed-portal-cliente.ts` | Módulo/Rotina/Menu/Perfil (dado de configuração) | componente-novo | LOW | Script novo e isolado; não modifica `seed.ts`. |
| `backend/src/portal-cliente/**` | n/a (sem equivalente no legado) | componente-novo | LOW | Módulo Nest novo, isolado, somente leitura (GET). |
| `backend/src/auth/guards/cliente-context.guard.ts(.spec.ts)` | n/a | componente-novo | LOW | Guard novo, aplicado apenas nas rotas do portal do cliente. |
| `backend/src/auth/auth.service.ts` | Autenticação (sessão/JWT) | contrato-alterado | MEDIUM | Payload do JWT ganha claim opcional `clienteId` (resolvido via `user.cliente?.id`, relação inversa de `Cliente.usuarioId`); claims existentes (`sub`, `email`, `empresaId`, `profileId`) inalterados. |
| `backend/src/auth/strategies/jwt.strategy.ts` | Autenticação (validação de token) | contrato-alterado | LOW | `validate()` passa a repassar `clienteId`; comportamento para usuários sem esse claim é `null` (equivalente a hoje). |
| `backend/src/agendamentos/agendamentos.module.ts` | Agendamentos (wiring do módulo) | contrato-alterado | LOW | Adicionado `exports: [AgendamentosService]` para permitir composição pelo `portal-cliente`; nenhuma rota do `AgendamentosController` alterada. |
| `backend/src/agendamentos/agendamentos.service.ts` | Agendamentos (`RN01`–`RN05` de `_reversa_sdd/domain.md`) | contrato-alterado | MEDIUM | `AgendamentoExportFilters`, `search()` e `findAll()` ganham parâmetro opcional `clienteId`; quando ausente (uso interno atual), o comportamento é idêntico ao anterior (coberto por `T008`). |
| `backend/src/agendamentos/agendamentos.service.spec.ts` | Testes | componente-novo | LOW | Testes novos adicionados; nenhum teste existente removido ou alterado. |
| `backend/src/clientes/clientes.controller.ts`, `clientes.service.ts` | Clientes (cadastro de apoio) | contrato-alterado | LOW | `create`/`update` ganham o campo opcional `usuarioId` (vincula um `User` já existente, não cria); `findOne` passa a incluir `usuario` no retorno (campo adicional, não removido nenhum existente). |
| `backend/src/clientes/dto/create-cliente.dto.ts` | Clientes | contrato-alterado | LOW | Campo opcional `usuarioId` adicionado ao DTO existente. |
| `backend/src/clientes/clientes.controller.spec.ts`, `clientes.service.spec.ts` | Testes | componente-novo | LOW | Testes novos adicionados aos arquivos existentes. |
| `backend/src/app.module.ts` | Composição raiz da aplicação | contrato-alterado | LOW | Import/registro do novo `PortalClienteModule`. |
| `frontend/src/app/core/services/portal-cliente.service.ts` | n/a | componente-novo | LOW | Serviço HTTP novo, isolado. |
| `frontend/src/app/features/portal-cliente/**` | n/a | componente-novo | LOW | Telas novas, isoladas; não importam nem alteram `features/agendamentos/**`. |
| `frontend/src/app/features/cadastros-apoio/clientes/clientes-edit.page.ts(.html)` | Clientes (frontend) | contrato-alterado | LOW | Campo combo "Usuário" novo na aba "Dados Cadastrais" (com `UserService.findAll()`, já existente); demais campos e a aba "Atributos" inalterados. |
| `frontend/src/app/app.routes.ts` | Roteamento | contrato-alterado | LOW | 3 rotas novas (`/portal/*`) adicionadas ao final do array; nenhuma rota existente movida ou removida. |

## Diff conceitual por componente

- **Agendamento (domínio):** nenhuma regra de negócio (`RN01`–`RN05`) foi alterada. O que muda é puramente um filtro adicional de leitura (`contrato.clienteId`), nunca aplicado às chamadas já existentes do backoffice (parâmetro `undefined` por padrão).
- **Autenticação:** o JWT ganha um claim novo e opcional. Sessões emitidas antes do deploy não terão o claim (tratado como `null`, mesmo efeito de "sem vínculo de cliente" — não quebra login de usuários internos).
- **Clientes (cadastro de apoio):** ganha um único campo novo (`usuarioId`, vínculo com um usuário já existente); dados do cliente, endereço e atributos não mudam em nenhum campo ou comportamento.
- **Superfície nova (Portal do Cliente):** inteiramente aditiva — módulo, rotinas, menu, perfil e telas próprias, sem overlap de código com Agendamentos ou Usuários.

## Preservadas

Regras 🟢 CONFIRMADO de `_reversa_sdd/domain.md` que continuam intactas, sem nenhuma alteração de comportamento:

- RN01 — Geração de Agendamentos em Lote (Escala Contratual)
- RN02 — Fechamento/Faturamento de Atendimentos em Lote (Realizados)
- RN03 — Cálculo de Horas Líquidas
- RN04 — Imutabilidade de Atendimentos Concluídos
- RN05 — Re-Preenchimento Assíncrono do Agendamento (Herança de Contrato)

## Modificadas

Nenhuma regra 🟢 CONFIRMADO de `_reversa_sdd/domain.md` foi alterada ou removida por esta feature.

## Observações (fora do escopo de regressão de regras confirmadas)

1. 🔴 `_reversa_sdd/inventory.md` cita `app/control/public/` (telas públicas não autenticadas do legado) sem análise de conteúdo. Não há evidência de sobreposição com o Portal do Cliente novo, mas permanece uma lacuna de conhecimento do legado, não desta feature.
2. 🔴 **Descoberta durante `/reversa-coding`:** `backend/prisma/seed.ts` referencia `prisma.profileMenu` e campos de `Menu` (`moduleId`, `routineId`, `parentId`, `label`, `link`) que não existem em `schema.prisma` (que usa `Menu.title` + `MenuItem`, `Profile.menuId` único). Isso sugere que `seed.ts` ficou desatualizado em relação às migrations manuais mais recentes (`2026-07-18` em diante) e pode estar quebrado no ambiente atual. **Não foi corrigido por esta feature** (fora de escopo); recomenda-se investigação e correção em separado. Por isso, a semeadura desta feature foi feita em `seed-portal-cliente.ts`, isolado.
3. Ambiente de execução deste `/reversa-coding` não possuía `node`/`npm`/`npx` disponíveis — todo o código foi escrito e revisado manualmente, mas **nenhum teste foi executado, nenhuma migração foi aplicada, e `prisma generate` não foi rodado**. Ver `progress.jsonl` para o detalhamento por ação.
4. O usuário, após ver o build real, corrigiu duas decisões tomadas nesta rodada de coding: (a) a sintaxe `[(ngModel)]` em `po-combo`/`po-email`/`po-password` não é suportada nesta versão do PO UI (corrigida para `[ngModel]` + `(ngModelChange)`, padrão já usado no resto do projeto); (b) o vínculo Cliente↔Usuário deveria ser um campo simples no cadastro de Cliente apontando para um usuário já existente (FK em `Cliente.usuarioId`), não uma FK em `User.clienteId` com criação de e-mail/senha embutida — revertido e refeito nesta rodada.
