# Legacy Impact: Listagem de Atendimentos

> Feature: `002-agendamento-list`
> Data: `2026-06-18`
> Gerado por: `/reversa-coding`

## Arquivos afetados

| Arquivo afetado | Componente (`_reversa_sdd/`) | Tipo | Severidade | Justificativa |
|----------------|------------------------------|------|------------|---------------|
| `backend/src/agendamentos/agendamentos.service.ts` | `_reversa_sdd/agendamentos/design.md#AgendamentoList` | regra-alterada + regra-nova | HIGH | `confirmar()` com transação atômica substitui lógica de confirmação via PATCH genérico; `generateExport()` é funcionalidade nova sem equivalente no legado |
| `backend/src/agendamentos/agendamentos.controller.ts` | `_reversa_sdd/agendamentos/design.md#AgendamentoList` | contrato-novo + regra-alterada | HIGH | Endpoints `PATCH /:id/confirmar` e `GET /export` adicionados; guards de autenticação aplicados a todos os endpoints |
| `backend/src/agendamentos/agendamentos.module.ts` | `_reversa_sdd/architecture.md#ERD` | componente-novo | LOW | `ModuleGuard` adicionado como provider do módulo |
| `frontend/src/app/core/services/agendamento.service.ts` | `_reversa_sdd/migration/target_screens.md#AgendamentoList` | contrato-novo + contrato-alterado | MEDIUM | `confirmar()` agora usa `PATCH /:id/confirmar` em vez de `PATCH /:id` com body; `export()` é contrato novo |
| `frontend/src/app/features/agendamentos/lista/lista.ts` | `_reversa_sdd/migration/target_screens.md#AgendamentoList` | regra-nova + componente-novo | MEDIUM | Ação OS desabilitada adicionada; método `onExport()` adicionado |
| `frontend/src/app/features/agendamentos/lista/lista.html` | `_reversa_sdd/agendamento/screens.md#AgendamentoList` | contrato-alterado | LOW | Botões de exportação (CSV, XLS, PDF, XML) adicionados à barra de ações |

---

## Diff conceitual por componente

### `AgendamentosService`

A lógica de confirmação foi extraída do `update()` genérico para um método dedicado `confirmar()` que usa `prisma.$transaction`. A validação de `tipo !== 'A'` antes de atualizar para `R` foi preservada integralmente. O método `generateExport()` é funcionalidade nova: busca até 1.001 registros, rejeita com HTTP 422 se acima de 1.000, e serializa em CSV (nativo), XLSX (ExcelJS), PDF (PDFKit) ou XML (nativo).

### `AgendamentosController`

Todos os endpoints passaram a exigir autenticação JWT + contexto de tenant + módulo `appointments-list`. Foram adicionados dois endpoints: `PATCH /:id/confirmar` (sem body, semântica explícita) e `GET /export` (query params de filtro + `format`).

### `AgendamentoService` (Angular)

O método `confirmar()` foi atualizado para chamar o endpoint dedicado. O método `export()` é novo e retorna `Observable<Blob>`.

---

## Regras preservadas (sem alteração)

| Regra | Origem | Status |
|-------|--------|--------|
| RN04 — Imutabilidade: só `tipo = A` pode ser confirmado | `_reversa_sdd/domain.md#RN04` | ✅ Preservada — validada no `confirmar()` via transação |
| RN03 — Cálculo de duração líquida | `_reversa_sdd/domain.md#RN03` | ✅ Preservada — `calculateDuration()` inalterado |
| RN05 — Herança de propriedades de contrato | `_reversa_sdd/domain.md#RN05` | ✅ Preservada — `OnChangeContrato` inalterado |
| Cor fallback `#333333` para contratos sem cor | `_reversa_sdd/migration/target_business_rules.md#BR-HUMANA-002` | ✅ Preservada — default no schema Prisma |

## Regras modificadas

| Regra | Origem | Natureza da mudança |
|-------|--------|---------------------|
| Confirmação de agendamento | `_reversa_sdd/domain.md#RN04` | Migrada de `PATCH /:id { tipo: 'R' }` para endpoint dedicado `PATCH /:id/confirmar` sem body. Lógica de negócio inalterada, apenas semântica de API alterada. |
