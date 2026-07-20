# Interface: GET /portal-cliente/agendamentos

> Identificador da feature: `003-acesso-cliente-atendimentos`
> Tipo: HTTP (Nest Controller novo, `backend/src/portal-cliente/`)
> Consumido por: `frontend/src/app/features/portal-cliente/lista/` (novo, via `PoPageDynamicTable`)

## Request

- **Método/rota:** `GET /portal-cliente/agendamentos`
- **Guards:** `JwtAuthGuard`, `EmpresaGuard`, `MenuGuard` (`@RequireMenu('portal-cliente-lista')`), `ClienteContextGuard`
- **Query params:** os mesmos filtros já aceitos por `AgendamentosService.search` (reaproveitado internamente), exceto `contratoId`/`profissionalId` continuam disponíveis para o cliente refinar dentro do próprio escopo:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `search` | string | não | Busca textual (descrição, contrato, profissional) |
| `tipo` | string (`A`\|`R`\|`C`\|`F`) | não | Filtro por status |
| `local` | string (`P`\|`R`\|`F`) | não | Filtro por modalidade |
| `contratoId` | number | não | Restringe a um contrato específico (sempre dentro dos contratos do cliente) |
| `dataInicial` / `dataFinal` | string (ISO date) | não | Intervalo de datas |
| `page` / `pageSize` | number | não | Paginação (padrão igual ao resto do backend: `page=1`, `pageSize=20`) |

- `clienteId` é sempre injetado a partir do JWT antes de chamar `AgendamentosService.search`, nunca aceito como query param (decisão D-04).

## Response (200)

Envelope paginado, no mesmo formato já padronizado no restante do backend (exigido pelo PO UI):

```json
{
  "items": [ { "id": 123, "descricao": "...", "dataAgenda": "2026-07-20", "tipo": "R", "contrato": { "descricao": "FUNLEC", "valorHora": 120.0 }, "observacao": "..." } ],
  "page": 1,
  "pageSize": 20,
  "total": 34,
  "hasNext": true
}
```

## Erros

| Status | Condição |
|--------|----------|
| 401 | Token ausente/expirado |
| 403 | `empresaId` ausente no token |
| 403 | Rotina `portal-cliente-lista` não liberada no perfil |
| 403 | `clienteId` ausente no token |

Nota de implementação: se `contratoId` informado pertencer a outro cliente, o filtro combinado (`contratoId` E `contrato.clienteId`) simplesmente não casa com nenhum registro — a resposta é `200` com `items: []`, não um erro. Não há vazamento de dado (nenhum atendimento de outro cliente é retornado), só uma lista vazia.

## Idempotência e timeouts

- Leitura pura, idempotente. Mesma política de paginação/timeout do restante do backend.
