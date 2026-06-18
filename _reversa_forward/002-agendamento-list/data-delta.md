# Data Delta: Listagem de Atendimentos

> Identificador: `002-agendamento-list`
> Data: `2026-06-17`
> Schema atual: `backend/prisma/schema.prisma`

## Resumo

O schema Prisma está correto e completo para esta feature. **Não há migração de schema necessária.**

A única mudança de dados é uma **seed** de módulo no banco.

---

## Schema atual relevante (sem alteração)

### `Agendamento`

| Campo | Tipo Prisma | Observação |
|-------|-------------|------------|
| `id` | `Int @id @default(autoincrement())` | PK |
| `tenantId` | `Int` FK → `Tenant` | Isolamento por tenant já implementado |
| `contratoId` | `Int?` FK → `Contrato` | Opcional, cascata SetNull |
| `profissionalId` | `Int?` FK → `Profissional` | Opcional, cascata SetNull |
| `descricao` | `String @db.VarChar(500)` | — |
| `dataAgenda` | `DateTime @db.Date` | Filtro de data usa esse campo |
| `horaInicio` | `String @db.VarChar(5)` | `hh:mm` |
| `horaFim` | `String @db.VarChar(5)` | `hh:mm` |
| `horaIntervaloInicial` | `String @default("00:00")` | — |
| `horaIntervaloFinal` | `String @default("00:00")` | — |
| `duracaoMinutos` | `Int` | 🟢 Migração já concluída: inteiro de minutos (não mais VARCHAR) |
| `horarioInicial` | `DateTime @db.Timestamptz` | Campo técnico para calendário |
| `horarioFinal` | `DateTime @db.Timestamptz` | Campo técnico para calendário |
| `local` | `String @default("P") @db.VarChar(1)` | P / R / F |
| `tipo` | `String @default("A") @db.VarChar(1)` | A / R / C / F |
| `cor` | `String @default("#333333") @db.VarChar(7)` | 🟢 Fallback de cor já implementado no schema |

### `Module`

| Campo | Tipo Prisma |
|-------|-------------|
| `id` | `Int @id @default(autoincrement())` |
| `name` | `String @db.VarChar(255)` |
| `key` | `String @unique @db.VarChar(255)` |

---

## Mudança necessária: seed do módulo `appointments-list`

### Objetivo

Garantir que o módulo `appointments-list` exista na tabela `modules` para que o `ModuleGuard` consiga liberar o acesso por perfil.

### Script de seed (TypeScript / Prisma)

```typescript
await prisma.module.upsert({
  where: { key: 'appointments-list' },
  update: {},
  create: {
    key: 'appointments-list',
    name: 'Listagem de Atendimentos',
  },
});
```

### Quando executar

- No script de seed existente do projeto (`backend/prisma/seed.ts` ou equivalente), **antes** de qualquer teste de autenticação com módulo
- Pode ser executado mais de uma vez sem efeito colateral (upsert)

---

## Índices opcionais (recomendação)

Para suportar queries de listagem e export com filtros de data e status sem full table scan em volumes acima de 10.000 registros:

```sql
CREATE INDEX idx_agendamento_tenant_data_tipo
  ON agendamento (tenant_id, data_agenda, tipo);
```

No Prisma:

```prisma
@@index([tenantId, dataAgenda, tipo])
```

> Esta adição é recomendada mas não é bloqueante para esta feature. Pode ser postergada para uma feature de performance dedicada.

---

## Campos NÃO alterados

Os campos abaixo existem no legado e foram descartados ou transformados na migração. **Não devem ser adicionados ao schema novo:**

| Campo legado | Motivo do descarte |
|---|---|
| `hora_total (VARCHAR hh:ii)` | Substituído por `duracaoMinutos (Int)` |
| `horario_inicial / horario_final (DATETIME concatenado)` | Mantidos como `horarioInicial / horarioFinal (Timestamptz)` — já no schema novo |
| `system_*` (tabelas de permissão do Adianti) | Substituídos pelo modelo `Tenant / Profile / Module / ProfileModule` |
