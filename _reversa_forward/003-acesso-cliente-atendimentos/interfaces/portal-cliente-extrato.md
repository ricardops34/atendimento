# Interface: GET /portal-cliente/agendamentos/extrato

> Identificador da feature: `003-acesso-cliente-atendimentos`
> Tipo: HTTP (Nest Controller novo, `backend/src/portal-cliente/`)
> Consumido por: `frontend/src/app/features/portal-cliente/extrato/` (novo)

## Request

- **Método/rota:** `GET /portal-cliente/agendamentos/extrato`
- **Guards:** `JwtAuthGuard`, `EmpresaGuard`, `MenuGuard` (`@RequireMenu('portal-cliente-extrato')`), `ClienteContextGuard`
- **Query params:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `dataInicial` | string (ISO date) | sim | Início do período |
| `dataFinal` | string (ISO date) | sim | Fim do período |
| `format` | string (`pdf`) | sim | Fixo em `pdf` nesta feature (RF-08 não pede `xls` para o cliente; `AgendamentosService.generateExportExtrato` já suporta `xls` internamente, mas o portal do cliente só expõe `pdf` por decisão de escopo) |

- Internamente, reaproveita `AgendamentosService.generateExportExtrato(filters, 'pdf')` (decisão D-06 do `roadmap.md`), passando `clienteId` do JWT dentro de `filters`.

## Response (200)

- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="extrato-cliente.pdf"`
- Corpo binário (Buffer), mesmo layout de extrato já usado internamente (`buildPdfCalendario.ts`), incluindo todos os campos (valores de contrato, observações) — conforme RN-05 —, mas restrito aos atendimentos do cliente logado.

## Erros

| Status | Condição |
|--------|----------|
| 401 | Token ausente/expirado |
| 403 | `empresaId` ausente no token |
| 403 | Rotina `portal-cliente-extrato` não liberada no perfil |
| 403 | `clienteId` ausente no token |
| 400 | `format` diferente de `pdf`, ou `dataInicial`/`dataFinal` ausentes/invertidas |

## Idempotência e timeouts

- Leitura pura, idempotente. Chamadas repetidas para o mesmo período geram o mesmo PDF (a menos que os dados subjacentes mudem entre as chamadas).
- Sem timeout especial além do padrão do backend; PDFs muito grandes (período extenso) seguem a mesma limitação de geração síncrona já aceita pelo `export-extrato` interno.
