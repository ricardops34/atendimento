# Roadmap: Acesso do Cliente aos Atendimentos

> Identificador: `003-acesso-cliente-atendimentos`
> Data: `2026-07-20`
> Requirements: `_reversa_forward/003-acesso-cliente-atendimentos/requirements.md`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA

## 1. Resumo da abordagem

A feature não tem equivalente no legado (nenhum ator "Cliente" com login próprio), então o desenho é inteiramente novo, mas reaproveita ao máximo a infraestrutura já migrada: `Profile → Menu → MenuItem → Routine → Module`, `MenuGuard`/`EmpresaGuard`, e a lógica já existente de extrato em `AgendamentosService`. A decisão central (RF-03/RF-09) é isolar toda a superfície nova num Module "Clientes" com Routines, Menu e Perfil próprios, sem tocar no Module/Routines de Agendamentos usados pelo backoffice — nem no Module/Routines de Usuários/Perfis/Menus. No backend, um novo módulo Nest (`portal-cliente`) expõe endpoints somente-GET que reaproveitam `AgendamentosService.search`/`generateExportExtrato` internamente, adicionando um filtro obrigatório de `clienteId` resolvido a partir do JWT — nunca da query string, para blindar o isolamento (RF-06). O vínculo 1:1 Usuário↔Cliente (RN-03) exige um campo novo em `User`, com uma ação nova na tela e no backend de **Clientes** (já existentes) para criar/vincular/remover o usuário de portal — o cadastro de Usuários (`configuracoes/usuarios`) permanece intocado; ele é usado apenas como referência de padrão (hash de senha, criação de `User`), não como ponto de alteração.

## 2. Princípios aplicados

Não existe `.reversa/principles.md` cadastrado neste projeto — nenhum princípio formal a verificar. Se princípios forem definidos no futuro via `/reversa-principles`, esta feature deve ser reavaliada contra eles.

## 3. Decisões técnicas

| ID | Decisão | Justificativa | Alternativas descartadas | Confidência |
|----|---------|----------------|---------------------------|-------------|
| D-01 | Adicionar campo único e opcional `usuarioId` em `Cliente` (vínculo 1:1 com `User`), **não** em `User` | Decisão explícita do usuário: o vínculo é "um campo Usuário no cadastro de Cliente" — a FK vive em `Cliente`, o inverso do padrão de `Profissional.userId` | Campo `clienteId` em `User` (tentativa inicial, revertida por instrução direta do usuário); tabela de vínculo N:N (rejeitada: RN-03 define 1:1 explicitamente) | 🟢 |
| D-02 | Criar novo `Module` "Clientes", `Routine`s dedicadas (calendário, lista, extrato), `Menu` dedicado e `Profile` "Cliente" via as telas administrativas já existentes (Módulos/Rotinas/Menus/Perfis) | Atende RF-01/RF-03/RF-09 sem exigir nenhuma alteração de código nas telas de configuração já existentes — é só cadastro de dados | Reaproveitar as Routines/MenuItems de Agendamentos e restringir por regra especial (rejeitada explicitamente pelo usuário: "sem alterar as que temos hoje") | 🟢 |
| D-03 | Criar módulo de backend novo `backend/src/portal-cliente/` com controller próprio expondo apenas `GET` (calendário, lista, extrato), sem tocar em `AgendamentosController` | Isola a superfície de API do cliente (RF-09) e garante RF-07 "de graça": não existem rotas de escrita nesse controller | Adicionar parâmetro `clienteId` opcional nos endpoints existentes de `AgendamentosController` (rejeitada: violaria RF-09 e aumentaria a superfície de risco do controller interno) | 🟢 |
| D-04 | O `clienteId` usado para filtrar dados vem sempre de `req.user.clienteId` (claim do JWT), nunca de parâmetro de query ou body enviado pelo cliente | Garante RF-06 (isolamento) mesmo que o frontend seja adulterado ou o parâmetro seja manipulado diretamente na chamada HTTP | Confiar em um `clienteId` enviado pela query string com validação cruzada (rejeitada: superfície de erro maior, um bug de validação vazaria dados de outro cliente) | 🟢 |
| D-05 | Adicionar `clienteId` ao payload do JWT (`auth.service.ts`, `jwt.strategy.ts`) e criar um guard novo `ClienteContextGuard`, aplicado só nas rotas do `portal-cliente`, que responde 403 quando `user.clienteId` é nulo | Cobre tanto usuário interno mal atribuído ao perfil "Cliente" quanto usuário "Cliente" sem vínculo cadastrado (RF-02, RF-06) | Verificar `clienteId` manualmente em cada handler do controller (rejeitada: duplica lógica, mais fácil esquecer em um novo endpoint futuro) | 🟢 |
| D-06 | Reaproveitar `AgendamentosService.generateExportExtrato(filters, 'pdf')` (já usado hoje pelo backoffice, ver `backend/src/agendamentos/agendamentos.service.ts` e `buildPdfCalendario.ts`) para o RF-08, acrescentando `clienteId` a `buildWhereFromFilters` | Já existe geração de extrato em PDF com `pdfkit`, incluindo horas previstas por contrato; construir do zero duplicaria lógica de cálculo de horas já testada | Gerar um PDF simplificado do zero, específico para o cliente (rejeitada: RF-08 pede "todos os campos", ou seja, o extrato completo já existente atende; criar um novo geraria divergência de números entre o que o backoffice vê e o que o cliente vê) | 🟢 |
| D-07 | O cadastro de **Cliente** (`clientes-edit.page.ts` + `ClientesController`/`ClientesService`) ganha um campo simples "Usuário" (combo) que **vincula** um usuário já existente (criado normalmente na tela de Usuários); não há criação de e-mail/senha embutida no cadastro de Cliente | Decisão explícita do usuário, refinada duas vezes: primeiro "vincular pelo cadastro de Cliente" (não pelo de Usuários), depois simplificado para "só um campo Usuário", sem fluxo de criação de acesso embutido | Aba "Acesso ao Portal" com criação de e-mail/senha embutida (tentativa inicial, revertida — usuário quis algo mais simples); campo na tela de Usuários (descartada: usuário quis o campo no cadastro de Cliente) | 🟢 |
| D-08 | `AgendamentoExportFilters` (tipo já existente em `agendamentos.service.ts`) ganha um campo opcional `clienteId`, aplicado em `buildWhereFromFilters` como `{ contrato: { clienteId } }` | `Agendamento` não tem `clienteId` direto — o vínculo é indireto via `Agendamento.contratoId → Contrato.clienteId` (ver `_reversa_sdd/architecture.md#🗄️-modelo-entidade-relacionamento-resumido-erd`) | Desnormalizar `clienteId` diretamente em `Agendamento` (rejeitada por ora: exigiria migração de dados históricos e não é necessária, já que o filtro via `contrato.clienteId` é suficiente para o volume atual) | 🟢 |
| D-09 | O campo `usuarioId` trafega como parte normal do payload de `POST /clientes` e `PATCH /clientes/:id` (igual a `municipioId`/`estadoId`), sem sub-rotas dedicadas. Violação do unique constraint (`usuario_id`) é convertida de erro cru do Prisma (`P2002`) para `ConflictException` amigável em `ClientesService` | Mais simples que sub-rotas: é só mais um campo do cadastro. A lista de usuários disponíveis no combo vem de `GET /users` (já existente, sem alteração) | Sub-rotas `POST/PATCH/DELETE /clientes/:id/usuario-portal` com criação de e-mail/senha embutida (tentativa inicial, revertida a pedido do usuário) | 🟢 |

## 4. Premissas

Nenhuma premissa pendente — todas as dúvidas do `requirements.md` foram resolvidas em `/reversa-clarify` antes deste plano (ver seção 9 e 10 do requirements, ambas sem `[DÚVIDA]` aberto).

## 5. Delta arquitetural

| Componente | Arquivo de origem no legado | Tipo de mudança | Resumo |
|------------|------------------------------|------------------|--------|
| Ator "Cliente" no diagrama de contexto | `_reversa_sdd/c4-context.md` (só descreve o ator "Usuário do Sistema") | componente-novo | Novo ator externo autenticado, sem equivalente no C4 do legado; deve ser adicionado numa futura atualização do `c4-context.md` pelo `reversa-architect`. |
| Módulo "Clientes" (Module/Routines/Menu/Profile) | n/a (não existe no legado nem no `_reversa_sdd/architecture.md`) | componente-novo | Novo agrupamento de rotinas somente-leitura, isolado do Module de Agendamentos. |
| `backend/src/portal-cliente/` (Controller + Service fino) | n/a | componente-novo | Novo módulo Nest, consome `AgendamentosService` existente por composição, não por herança/alteração. |
| `backend/src/agendamentos/agendamentos.service.ts#buildWhereFromFilters` | n/a (código do sistema já migrado, não do legado) | contrato-alterado | Ganha um filtro opcional `clienteId`; assinatura da função não muda para os chamadores existentes (`AgendamentosController`), que continuam sem passar esse campo. |
| `backend/src/auth/auth.service.ts` / `jwt.strategy.ts` | n/a | contrato-alterado | Payload do JWT ganha campo opcional `clienteId`. |
| `backend/src/clientes/clientes.controller.ts` / `clientes.service.ts` | n/a | contrato-alterado | `create`/`update` ganham o campo opcional `usuarioId` (D-09), com conversão de conflito de unique constraint para `ConflictException` amigável. `configuracoes/usuarios` e seu backend (`UsersController`/`UsersService`) permanecem sem nenhuma alteração. |
| `frontend/src/app/features/cadastros-apoio/clientes/clientes-edit.page.ts` (+ `.html`) | n/a | contrato-alterado | Ganha um campo combo "Usuário" na aba "Dados Cadastrais", carregado via `UserService.findAll()` (já existente, sem alteração). |
| `frontend/src/app/features/portal-cliente/` (novo) | n/a | componente-novo | Telas somente-leitura de calendário, lista e extrato do cliente. |

## 6. Delta no modelo de dados

- Resumo das mudanças: um campo novo (`usuarioId`, único e opcional) em `Cliente`, com relação para `User`; nenhuma tabela nova. Todo o resto (Module, Routine, Menu, Profile, MenuItem) já existe estruturalmente — a feature só insere linhas novas nessas tabelas via `seed-portal-cliente.ts`.
- Detalhe completo em: `_reversa_forward/003-acesso-cliente-atendimentos/data-delta.md`

## 7. Delta de contratos externos

| Contrato | Tipo | Arquivo de detalhe |
|----------|------|--------------------|
| `GET /portal-cliente/agendamentos/calendario` | HTTP | `_reversa_forward/003-acesso-cliente-atendimentos/interfaces/portal-cliente-calendario.md` |
| `GET /portal-cliente/agendamentos` (lista/search) | HTTP | `_reversa_forward/003-acesso-cliente-atendimentos/interfaces/portal-cliente-lista.md` |
| `GET /portal-cliente/agendamentos/extrato` | HTTP | `_reversa_forward/003-acesso-cliente-atendimentos/interfaces/portal-cliente-extrato.md` |
| `POST /clientes`, `PATCH /clientes/:id` (campo `usuarioId` novo) | HTTP | `_reversa_forward/003-acesso-cliente-atendimentos/interfaces/clientes-usuario-portal.md` |

## 8. Plano de migração

1. Criar migration SQL manual em `backend/prisma/manual-migrations/` (seguindo a convenção já usada no projeto, ex.: `2026-07-2x_add_cliente_id_to_users.sql`), adicionando `cliente_id` único e nulo em `users` com FK para `cliente`. **Não aplicar sem autorização explícita do usuário**, conforme regra de proteção de banco de dados do projeto.
2. Atualizar `schema.prisma` (`User.clienteId`, relação `cliente`) e regenerar o Prisma Client.
3. Implementar `backend/src/portal-cliente/` (controller + service fino sobre `AgendamentosService`), guard `ClienteContextGuard`, e o campo `clienteId` no payload/estratégia JWT.
4. Adicionar `clienteId` opcional a `buildWhereFromFilters` em `agendamentos.service.ts` (retrocompatível).
5. Implementar as telas novas em `frontend/src/app/features/portal-cliente/` (calendário, lista, extrato — somente leitura, sem sidebar de criação/edição) e as rotas correspondentes em `app.routes.ts`.
6. Adicionar as sub-rotas `usuario-portal` em `ClientesController`/`ClientesService` (D-09) e a seção "Acesso ao Portal" em `clientes-edit.page.ts`/`.html`, sem alterar `configuracoes/usuarios`.
7. Cadastrar o Module "Clientes", as 3 Routines novas, o Menu dedicado e o Profile "Cliente" via script `backend/prisma/seed-portal-cliente.ts` (dado de configuração, script novo e isolado — ver nota abaixo sobre `seed.ts`).

> **Nota descoberta durante `/reversa-coding`:** `backend/prisma/seed.ts` contém lógica de Menu/Perfil (`ensureMenu`, `prisma.profileMenu`) incompatível com o `schema.prisma` atual (que usa `Menu.title` + `MenuItem` e `Profile.menuId` único, sem tabela `profile_menus`). Isso é uma inconsistência pré-existente do repositório, não introduzida por esta feature. Para não depender desse código nem tentar corrigi-lo fora de escopo, a semeadura desta feature foi implementada em um script novo e independente (`seed-portal-cliente.ts`), seguindo o mesmo padrão já usado por `seed-paises.ts`. Recomenda-se investigar `seed.ts` separadamente.
8. Executar os cenários Gherkin da seção 7 do `requirements.md` como QA manual, mais os passos descritos em `onboarding.md`.

## 9. Riscos e mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|----------------|-----------|
| Admin configura o Menu do perfil "Cliente" incluindo, por engano, uma Routine interna (ex.: Agendamentos) | alto | baixo | `MenuGuard` já bloquearia qualquer perfil sem o `MenuItem` correto, mas o filtro real é a curadoria do Menu; documentar o passo 7 do plano de migração com clareza no `onboarding.md` |
| Alteração de `schema.prisma` aplicada sem autorização em ambiente com dados reais | alto | baixo | Seguir a regra do projeto (CLAUDE.md) de nunca migrar/alterar banco sem aviso e aprovação explícita |
| Reaproveitar `generateExportExtrato` introduz uma regressão no extrato usado hoje pelo backoffice | médio | baixo | Cobrir com teste que `clienteId` ausente (uso interno) mantém o comportamento e resultado atuais, comparando com o `agendamentos.service.spec.ts` já existente |
| `clienteId` não propagado corretamente para o JWT em sessões já ativas (usuários logados antes da mudança) | médio | médio | Forçar novo login (token antigo não terá o claim); comunicar como parte do deploy, não requer migração de dados |
| Futuro requisito de múltiplos contatos por Cliente (1:N) invalidar o unique constraint | baixo | médio | Unique constraint pode ser removido em uma migração futura sem quebrar dados existentes, já que 1:1 é um subconjunto válido de 1:N |
| `ClientesService` duplicar lógica de hash/validação de senha que já existe em `UsersService` (D-09), divergindo com o tempo | médio | médio | Extrair a função de hash/validação mínima para um helper compartilhado (ex.: `backend/src/auth/password.util.ts`) usado por ambos os services, sem que um controller chame o outro |

## 10. Critério de pronto

- [ ] Todas as ações do `actions.md` marcadas `[X]`
- [ ] `cross-check.md` (se executado) sem CRITICAL nem HIGH
- [ ] `regression-watch.md` gerado
- [ ] Cenários Gherkin da seção 7 do `requirements.md` validados manualmente (ver `onboarding.md`)
- [ ] Nenhuma Routine, MenuItem, Menu ou Module de Agendamentos alterado (checagem literal via `git diff` restrita a `backend/src/agendamentos/` e às telas internas correspondentes, exceto o filtro aditivo em `buildWhereFromFilters`)
- [ ] `configuracoes/usuarios` (frontend e backend) sem nenhuma linha alterada (`git diff` vazio nesses arquivos)
- [ ] Re-extração reversa executada e sem regressão vermelha (recomendado, não obrigatório)

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-07-20 | Versão inicial gerada por `/reversa-plan` | reversa |
| 2026-07-20 | Ajustado D-07 e criado D-09: vínculo de usuário passa a ser feito pelo cadastro de Cliente (`clientes-edit.page.ts`/`ClientesController`), não pelo cadastro de Usuários, por instrução direta do usuário | reversa |
| 2026-07-20 | Reajuste durante `/reversa-coding`: revertida a FK para `Cliente.usuarioId` (estava em `User.clienteId`) e simplificado D-07/D-09 — campo "Usuário" simples no cadastro de Cliente (vincula usuário já existente), sem criação de e-mail/senha embutida | reversa |
