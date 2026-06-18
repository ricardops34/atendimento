# Interface: GET /agendamentos/search

> Feature: `002-agendamento-list`
> Status: **já implementado** — delta: adicionar guards de autenticação

## Descrição

Retorna lista paginada de agendamentos do tenant autenticado com suporte a filtros múltiplos.

## Request

```
GET /agendamentos/search
Authorization: Bearer <jwt>
X-Tenant-Slug: <slug>
```

### Query params

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `page` | `number` | Não | Página atual (default: 1) |
| `pageSize` | `number` | Não | Itens por página (default: 20; opções: 10, 20, 50) |
| `search` | `string` | Não | Busca livre em `descricao`, `contrato.descricao`, `profissional.nome` |
| `tipo` | `'A'\|'R'\|'C'\|'F'` | Não | Filtro por status |
| `local` | `'P'\|'R'\|'F'` | Não | Filtro por modalidade |
| `contratoId` | `number` | Não | Filtro por contrato |
| `profissionalId` | `number` | Não | Filtro por profissional |
| `dataInicial` | `string (ISO date)` | Não | Data inicial do intervalo (`dataAgenda >= dataInicial`) |
| `dataFinal` | `string (ISO date)` | Não | Data final do intervalo (`dataAgenda <= dataFinal`) |

## Response 200

```json
{
  "items": [
    {
      "id": 1,
      "dataAgenda": "2026-06-17T00:00:00.000Z",
      "descricao": "Atendimento REINF",
      "tipo": "A",
      "local": "P",
      "duracaoMinutos": 450,
      "cor": "#4CAF50",
      "contrato": { "id": 2, "descricao": "FUNLEC", "cor": "#4CAF50" },
      "profissional": { "id": 1, "nome": "Ricardo" }
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 47,
  "hasNext": true
}
```

## Erros

| Status | Código | Situação |
|--------|--------|----------|
| 401 | Unauthorized | Token ausente ou inválido |
| 403 | Forbidden | Tenant inválido ou módulo `appointments-list` não liberado no perfil |

## Idempotência

Leitura segura; sem efeitos colaterais.

## Delta desta feature

Adicionar ao controller:
```typescript
@UseGuards(JwtAuthGuard, TenantGuard, ModuleGuard)
@RequireModule('appointments-list')
@Get('search')
```
