# Actions: Listagem de Atendimentos

> Identificador: `002-agendamento-list`
> Data: `2026-06-17`
> Roadmap: `_reversa_forward/002-agendamento-list/roadmap.md`

## Resumo

| Métrica | Valor |
|---------|-------|
| Total de ações | 11 |
| Paralelizáveis (`[//]`) | 4 |
| Maior cadeia de dependência | 4 |

---

## Fase 1, Preparação

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T001 | Instalar as dependências de exportação no backend: `exceljs` (XLS) e `pdfkit` (PDF). Adicionar `@types/pdfkit` em devDependencies. Executar `npm install` no diretório `backend/`. | - | `[//]` | `backend/package.json` | 🟡 | `[X]` |
| T002 | Garantir que o registro `{ key: 'appointments-list' }` exista na tabela `modules` via seed do Prisma. | - | `[//]` | `backend/prisma/seed.ts` | 🟢 | `[X]` |

---

## Fase 2, Testes

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T003 | Atualizar `agendamentos.service.spec.ts` adicionando casos de teste para: (a) `confirmar()` status A → R; (b) `confirmar()` status R → HTTP 422; (c) `generateExport()` CSV com zero registros retorna Buffer. | - | - | `backend/src/agendamentos/agendamentos.service.spec.ts` | 🟢 | `[X]` |

---

## Fase 3, Núcleo

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T004 | Remover `// @ts-nocheck` de `agendamentos.service.ts` e adicionar tipagem explícita em todos os métodos existentes. | - | - | `backend/src/agendamentos/agendamentos.service.ts` | 🟢 | `[X]` |
| T005 | Adicionar `confirmar(id, tenantId)` em `AgendamentosService` com `prisma.$transaction` e HTTP 422 quando `tipo !== 'A'`. | T004 | - | `backend/src/agendamentos/agendamentos.service.ts` | 🟡 | `[X]` |
| T006 | Adicionar `generateExport(filters, format)` em `AgendamentosService` suportando CSV (nativo), XLS (exceljs), PDF (pdfkit) e XML (nativo) com limite de 1.000 registros. | T001, T004 | - | `backend/src/agendamentos/agendamentos.service.ts` | 🟡 | `[X]` |
| T007 | Adicionar guards (`JwtAuthGuard`, `TenantGuard`, `ModuleGuard` + `@RequireModule('appointments-list')`) a `AgendamentosController`; adicionar `PATCH /:id/confirmar` e `GET /export`. Atualizar `AgendamentosModule` para prover `ModuleGuard`. | T005, T006 | - | `backend/src/agendamentos/agendamentos.controller.ts` | 🟢 | `[X]` |

---

## Fase 4, Integração

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T008 | Atualizar Angular `AgendamentoService`: substituir `confirmar()` para usar `PATCH /:id/confirmar` sem body; adicionar `export(params, format)` retornando `Observable<Blob>`. | T007 | - | `frontend/src/app/core/services/agendamento.service.ts` | 🟢 | `[X]` |
| T009 | Atualizar `lista.ts`: restaurar padrão show-more nativo PO-UI (`hasNext`, `loadingShowMore`, `onShowMore`); adicionar ação OS desabilitada; adicionar `onExport(format)` com download via Blob. | T008 | - | `frontend/src/app/features/agendamentos/lista/lista.ts` | 🟢 | `[X]` |
| T010 | Atualizar `lista.html`: adicionar botões de exportação (CSV, XLS, PDF, XML); remover `po-pagination`; manter `p-show-more` nativo. | T009 | - | `frontend/src/app/features/agendamentos/lista/lista.html` | 🟢 | `[X]` |

---

## Fase 5, Polimento

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T011 | Atualizar `lista.spec.ts`: adicionar testes para OS action sempre desabilitada; Confirmar desabilitada para tipo !== A; manter testes de show-more existentes. | T010 | `[//]` | `frontend/src/app/features/agendamentos/lista/lista.spec.ts` | 🟢 | `[X]` |
| T012 | Atualizar `agendamentos.controller.spec.ts`: adicionar testes para `confirmar` (200 + 422) e `export` (200 csv + 400 formato inválido). | T007 | `[//]` | `backend/src/agendamentos/agendamentos.controller.spec.ts` | 🟢 | `[X]` |

---

## Notas de execução

- T002: seed já continha `appointments-list` — ação confirmada, sem alteração necessária.
- PO-UI v21 não possui `po-pagination` standalone; mantido o padrão nativo `p-show-more` do `po-table`.
- `tooltip` não é propriedade de `PoTableAction` em PO-UI v21; ação OS fica com `disabled: () => true` sem tooltip.

---

## Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-06-17 | Versão inicial gerada por `/reversa-to-do` | reversa |
| 2026-06-18 | Todas as ações executadas por `/reversa-coding` | reversa |
