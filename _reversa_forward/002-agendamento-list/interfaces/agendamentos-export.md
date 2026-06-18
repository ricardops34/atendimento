# Interface: GET /agendamentos/export

> Feature: `002-agendamento-list`
> Status: **novo** — não existe ainda

## Descrição

Exporta os atendimentos filtrados como arquivo para download. Reutiliza os mesmos parâmetros de filtro do `/search`, sem paginação. Limitado a 1.000 registros por chamada.

## Request

```
GET /agendamentos/export?format=csv
Authorization: Bearer <jwt>
X-Tenant-Slug: <slug>
```

### Query params

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `format` | `'csv'\|'xls'\|'pdf'\|'xml'` | **Sim** | Formato do arquivo de saída |
| `search` | `string` | Não | Mesmo comportamento do `/search` |
| `tipo` | `'A'\|'R'\|'C'\|'F'` | Não | Idem |
| `local` | `'P'\|'R'\|'F'` | Não | Idem |
| `contratoId` | `number` | Não | Idem |
| `profissionalId` | `number` | Não | Idem |
| `dataInicial` | `string (ISO date)` | Não | Idem |
| `dataFinal` | `string (ISO date)` | Não | Idem |

## Response 200 — stream de arquivo

| Format | Content-Type | Content-Disposition |
|--------|-------------|---------------------|
| `csv` | `text/csv; charset=utf-8` | `attachment; filename="atendimentos.csv"` |
| `xls` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | `attachment; filename="atendimentos.xlsx"` |
| `pdf` | `application/pdf` | `attachment; filename="atendimentos.pdf"` |
| `xml` | `application/xml; charset=utf-8` | `attachment; filename="atendimentos.xml"` |

### Colunas exportadas (todas as colunas da listagem)

`Data`, `Contrato`, `Profissional`, `Modalidade`, `Duração Total (hh:mm)`, `Status`, `Descrição`

## Erros

| Status | Situação |
|--------|----------|
| 400 | `format` ausente ou inválido |
| 401 | Token ausente ou inválido |
| 403 | Módulo `appointments-list` não liberado |
| 422 | Resultado da query excede 1.000 registros — refinar filtros |

### Body do 422

```json
{
  "statusCode": 422,
  "message": "Refine os filtros para exportar menos de 1.000 registros. A query atual retornaria 1.247 registros."
}
```

## Idempotência

Leitura segura; sem efeitos colaterais. Pode ser chamado múltiplas vezes com o mesmo resultado.

## Timeout

Recomendado: 30 segundos no proxy/gateway para suportar exports de PDFs com tabelas grandes.
