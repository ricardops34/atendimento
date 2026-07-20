# Interface: GET /portal-cliente/agendamentos/calendario

> Identificador da feature: `003-acesso-cliente-atendimentos`
> Tipo: HTTP (Nest Controller novo, `backend/src/portal-cliente/`)
> Consumido por: `frontend/src/app/features/portal-cliente/calendario/` (novo)

## Request

- **Método/rota:** `GET /portal-cliente/agendamentos/calendario`
- **Guards:** `JwtAuthGuard`, `EmpresaGuard`, `MenuGuard` (`@RequireMenu('portal-cliente-calendario')`), `ClienteContextGuard`
- **Query params:** nenhum. Segue o mesmo padrão do calendário interno (`AgendamentosController#findAll` / `frontend/features/agendamentos/calendario`), que carrega todos os atendimentos da empresa e deixa a navegação por mês/semana/dia inteiramente a cargo do FullCalendar no cliente — aqui, escopado ao cliente logado.
- **Nunca aceita** `clienteId` nem `empresaId` como query param — ambos vêm exclusivamente do JWT (`req.user.clienteId`, `req.empresaId`), conforme decisão D-04 do `roadmap.md`.

## Response (200)

Mesmo formato de evento já usado pelo calendário interno (`frontend/src/app/features/agendamentos/calendario/`), reaproveitando os campos do model `Agendamento` com `contrato` e `profissional` inclusos:

```json
[
  {
    "id": 123,
    "descricao": "Atendimento Reinf",
    "dataAgenda": "2026-07-20",
    "horaInicio": "08:30",
    "horaFim": "17:30",
    "tipo": "A",
    "local": "P",
    "cor": "#4CAF50",
    "observacao": "...",
    "contrato": { "id": 10, "descricao": "FUNLEC", "valorHora": 120.0, "valorFixo": null },
    "profissional": { "id": 5, "nome": "Ricardo" }
  }
]
```

## Erros

| Status | Condição |
|--------|----------|
| 401 | Token ausente/expirado (`JwtAuthGuard`) |
| 403 | `empresaId` ausente no token (`EmpresaGuard`) |
| 403 | Rotina `portal-cliente-calendario` não liberada no perfil do usuário (`MenuGuard`) |
| 403 | `clienteId` ausente no token — usuário sem vínculo de Cliente (`ClienteContextGuard`) |
| 400 | `mes`/`ano` ausentes ou fora do intervalo válido |

## Idempotência e timeouts

- Operação de leitura pura, idempotente por natureza.
- Sem timeout especial além do padrão do backend (mesma política das rotas de `AgendamentosController`).
