# Interface: PATCH /agendamentos/:id/confirmar

> Feature: `002-agendamento-list`
> Status: **novo** — atualmente a confirmação é feita via `PATCH /agendamentos/:id` com `{ tipo: 'R' }` no body

## Descrição

Confirma um atendimento individual, transitando seu status de `A` (Agendado) para `R` (Realizado). Encapsula a regra de imutabilidade: a transição é bloqueada se o status atual não for `A`.

## Request

```
PATCH /agendamentos/42/confirmar
Authorization: Bearer <jwt>
X-Tenant-Slug: <slug>
```

Sem body de requisição.

## Response 200

```json
{
  "id": 42,
  "tipo": "R",
  "dataAgenda": "2026-06-17T00:00:00.000Z",
  "descricao": "Atendimento REINF",
  "duracaoMinutos": 450,
  "contrato": { "id": 2, "descricao": "FUNLEC" },
  "profissional": { "id": 1, "nome": "Ricardo" }
}
```

## Erros

| Status | Situação |
|--------|----------|
| 401 | Token ausente ou inválido |
| 403 | Módulo `appointments-list` não liberado ou agendamento pertence a tenant diferente |
| 404 | Agendamento com o ID informado não encontrado |
| 422 | Agendamento não está com status `A` — não pode ser confirmado |

### Body do 422

```json
{
  "statusCode": 422,
  "message": "Registro não pode ser alterado. Status atual: R (Realizado)."
}
```

## Idempotência

**Não idempotente**: chamar duas vezes com o mesmo ID retornará 422 na segunda chamada (o status já terá sido alterado para `R`).

## Regra de negócio

Mapeada em `_reversa_sdd/domain.md#RN04` e `_reversa_sdd/migration/target_business_rules.md#BR-MIGRAR-003`.

A validação de `tipo === 'A'` deve ocorrer **no backend**, dentro de uma transação Prisma, para evitar race conditions em confirmações concorrentes do mesmo agendamento.

## Implementação sugerida no service

```typescript
async confirmar(id: number, tenantId: number): Promise<Agendamento> {
  return this.prisma.$transaction(async (tx) => {
    const agendamento = await tx.agendamento.findUnique({ where: { id, tenantId } });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
    if (agendamento.tipo !== 'A') {
      throw new HttpException(
        `Registro não pode ser alterado. Status atual: ${agendamento.tipo}.`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    return tx.agendamento.update({ where: { id }, data: { tipo: 'R' } });
  });
}
```
