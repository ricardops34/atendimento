# Regression Watch: Acesso do Cliente aos Atendimentos

> Identificador: `003-acesso-cliente-atendimentos`

## Itens de observação

Nenhuma regra 🟢 CONFIRMADO de `_reversa_sdd/domain.md` foi alterada ou removida por esta feature (ver seção "Modificadas" de `legacy-impact.md`, vazia). Por isso, não há watch items de regressão de regra de negócio nesta rodada.

| ID | Origem (arquivo, seção) | Regra esperada após mudança | Tipo de verificação | Sinal de violação |
|----|--------------------------|------------------------------|----------------------|---------------------|
| — | — | — | — | — |

## Observações

<!-- Itens com confidência originalmente 🟡 ou 🔴, ou achados sem peso de regressão de regra confirmada. -->

- 🔴 **W-OBS-01** — `backend/prisma/seed.ts` usa `prisma.profileMenu` e um shape de `Menu` (`moduleId`/`routineId`/`parentId`/`label`/`link`) incompatível com `schema.prisma` atual. Verificar em re-extrações futuras se isso foi corrigido; se sim, avaliar se `seed-portal-cliente.ts` (desta feature) pode ser consolidado de volta em `seed.ts`.
- 🔴 **W-OBS-02** — `_reversa_sdd/inventory.md` cita `app/control/public/` do legado sem análise de conteúdo. Se uma futura extração reversa analisar essa pasta e encontrar sobreposição funcional com o Portal do Cliente, revisar `requirements.md` desta feature.
- 🟡 **W-OBS-03** — ~~Nenhum teste desta feature foi executado no ambiente de coding~~ **Atualizado:** testes executados via Docker (estágio `builder`). Todos os testes desta feature passam; 6 falhas remanescentes são pré-existentes e não relacionadas (ver W-OBS-04).
- 🔴 **W-OBS-04** — Falhas pré-existentes na suíte de testes, não relacionadas a esta feature: `clientes.service.spec.ts` (teste não atualizado após `include` ser adicionado a `search()`), `agendamentos.service.spec.ts` (mock sem `findFirst`; ordem esperada de `where.AND` não bate com `buildWhereFromFilters`), `profissionais.controller.spec.ts`, `feriados.service.spec.ts`/`feriados.controller.spec.ts`, `agendamentos.controller.spec.ts` (importa `../auth/guards/tenant.guard`, arquivo inexistente). Recomenda-se investigação em separado.
- 🔴 **W-OBS-05 (severidade alta, achado de QA end-to-end)** — Nenhum controller de cadastro (`ClientesController`, `ContratosController`, `ProfissionaisController`, `FeriadosController`, `AtributosController`, `EmpresasController`) usa `MenuGuard`, apenas o `JwtAuthGuard` global. Confirmado com token real de um usuário perfil "Cliente": `GET /clientes`, `/contratos`, `/profissionais`, `/feriados`, `/atributos` e `/empresas` retornam 200 e expõem a listagem completa da empresa a esse usuário externo (fora do escopo de RF-06/RF-07, que cobrem apenas Agendamentos). É uma lacuna pré-existente (não introduzida por esta feature), mas que se torna consequente agora que existe um ator externo ("Cliente") com login próprio. Decisão de correção pendente do usuário — ver conversa da feature.

## Histórico de re-extrações

_Nenhuma re-extração executada ainda após esta feature._

## Arquivadas

_Nenhum item arquivado ainda._
