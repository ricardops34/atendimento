# Regression Watch: Listagem de Atendimentos

> Feature: `002-agendamento-list`
> Gerado por: `/reversa-coding` em 2026-06-18

## Watch items

| ID | Origem | Regra esperada após mudança | Tipo de verificação | Sinal de violação |
|----|--------|-----------------------------|---------------------|-------------------|
| W001 | `_reversa_sdd/domain.md#RN04` + `legacy-impact.md#AgendamentosService` | O endpoint `PATCH /agendamentos/:id/confirmar` deve retornar HTTP 422 quando o `tipo` atual do agendamento não for `A` | presença | Se a re-extração documentar `onConfirmar` sem restrição de `tipo = A`, ou se o spec do controller não cobrir o caso 422 |
| W002 | `_reversa_sdd/migration/target_business_rules.md#BR-MIGRAR-003` + `legacy-impact.md#AgendamentosController` | `GET /agendamentos/search` e `PATCH /agendamentos/:id/confirmar` devem retornar HTTP 401 para requisições sem token JWT | presença | Se a re-extração do controller não listar `JwtAuthGuard` como guard da classe |
| W003 | `_reversa_sdd/agendamentos/requirements.md#RF-08` + `legacy-impact.md` | `GET /agendamentos/export?format=csv` deve retornar arquivo com header `Content-Disposition: attachment; filename="atendimentos.csv"` | redação | Se a re-extração do controller não documentar o endpoint `/export` ou se o header estiver ausente |

---

## Observações (sem peso de regressão)

- A serialização PDF usa PDFKit com layout landscape A4. Qualidade visual do relatório é inferida (🟡) e pode variar com volume de dados.
- O limite de 1.000 registros para export é uma política de sistema definida nesta feature, sem equivalente no legado.

---

## Histórico de re-extrações

*Vazio. Será preenchido automaticamente pelo `/reversa` nas próximas re-extrações.*

---

## Arquivadas

*Vazio.*
