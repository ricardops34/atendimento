---
schemaVersion: 1
generatedAt: 2026-06-17T15:20:00Z
reversa:
  version: "1.2.43"
kind: target_data_model
producedBy: designer
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde0"
---

# Target Data Model — atendimento

> Modelo de dados do sistema novo. Definições de tabelas, schema Prisma, relacionamentos e restrições.

## Visão geral
O banco de dados principal do novo sistema é o **PostgreSQL**, acessado de forma síncrona/assíncrona através do **Prisma ORM** no NestJS. O modelo de dados reflete o isolamento dos dois bounded contexts (Cadastros de Apoio e Agendamentos). A persistência foi otimizada para remover acoplamentos de apresentação e para garantir cálculos de tempo faturados mais eficientes usando tipos de dados nativos adequados (minutos em inteiro e horas de faturamento em decimal).

## Entidades de dados

| Entidade | Tabela / coleção | Aggregate dono | PK | Bounded context |
|---|---|---|---|---|
| `Empresa` | `empresa` | (CRUD Externo) | `id` | `cadastros-apoio` |
| `Profissional` | `profissional` | (CRUD Externo) | `id` | `cadastros-apoio` |
| `Contrato` | `contrato` | `AGG-Contrato` | `id` | `cadastros-apoio` |
| `ContratoItem` | `contrato_item` | `AGG-Contrato` | `id` | `cadastros-apoio` |
| `Agendamento` | `agendamento` | `AGG-Agendamento` | `id` | `agendamentos` |
| `Realizado` | `realizado` | `AGG-Agendamento` | `id` | `agendamentos` |

---

## Schema (schema.prisma)

```prisma
// Configuração do Prisma Client e do Banco PostgreSQL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

/// Representa a empresa cliente (Cadastros de Apoio)
model Empresa {
  id        Int        @id @default(autoincrement())
  nome      String     @db.VarChar(255)
  contratos Contrato[]

  @@map("empresa")
}

/// Representa o profissional executor (Cadastros de Apoio)
model Profissional {
  id           Int            @id @default(autoincrement())
  nome         String         @db.VarChar(255)
  agendamentos Agendamento[]
  escalas      ContratoItem[]

  @@map("profissional")
}

/// Representa o contrato de serviço (Cadastros de Apoio)
model Contrato {
  id           Int            @id @default(autoincrement())
  empresaId    Int            @map("empresa_id")
  empresa      Empresa        @relation(fields: [empresaId], references: [id], onDelete: Restrict)
  descricao    String         @db.VarChar(255)
  cor          String         @default("#333333") @db.VarChar(7)
  isFeriado    Boolean        @default(false) @map("is_feriado") // Flag para identificar dinamicamente o contrato de feriados
  agendamentos Agendamento[]
  escalas      ContratoItem[]

  @@map("contrato")
}

/// Representa a escala semanal recorrente do profissional no contrato (Cadastros de Apoio)
model ContratoItem {
  id             Int          @id @default(autoincrement())
  contratoId     Int          @map("contrato_id")
  contrato       Contrato     @relation(fields: [contratoId], references: [id], onDelete: Cascade)
  profissionalId Int          @map("profissional_id")
  profissional   Profissional @relation(fields: [profissionalId], references: [id], onDelete: Cascade)
  diaSemana      Int          @map("dia_semana") // 0 (Domingo) a 6 (Sábado)
  horaInicio     String       @map("hora_inicio") @db.VarChar(5) // hh:ii
  horaFim        String       @map("hora_fim") @db.VarChar(5) // hh:ii
  intervaloIni   String       @map("intervalo_ini") @db.VarChar(5) // hh:ii
  intervaloFim   String       @map("intervalo_fim") @db.VarChar(5) // hh:ii

  @@map("contrato_item")
}

/// Representa os apontamentos de atendimentos (Agendamentos)
model Agendamento {
  id                   Int           @id @default(autoincrement())
  contratoId           Int?          @map("contrato_id")
  contrato             Contrato?     @relation(fields: [contratoId], references: [id], onDelete: SetNull)
  profissionalId       Int?          @map("profissional_id")
  profissional         Profissional? @relation(fields: [profissionalId], references: [id], onDelete: SetNull)
  descricao            String        @db.VarChar(500)
  dataAgenda           DateTime      @map("data_agenda") @db.Date
  horaInicio           String        @map("hora_inicio") @db.VarChar(5)
  horaFim              String        @map("hora_fim") @db.VarChar(5)
  horaIntervaloInicial String        @default("00:00") @map("hora_intervalo_inicial") @db.VarChar(5)
  horaIntervaloFinal   String        @default("00:00") @map("hora_intervalo_final") @db.VarChar(5)
  duracaoMinutos       Int           @map("duracao_minutos") // Novo! Gravação em minutos inteiros líquidos
  horarioInicial       DateTime      @map("horario_inicial") @db.Timestamptz // Datetime composto formatado
  horarioFinal         DateTime      @map("horario_final") @db.Timestamptz // Datetime composto formatado
  local                String        @default("P") @db.VarChar(1) // P (Presencial), R (Remoto), F (Falta)
  tipo                 String        @default("A") @db.VarChar(1) // A (Agendada), R (Realizada), C (Cancelada), F (Feriado)
  cor                  String        @default("#333333") @db.VarChar(7)
  observacao           String?       @db.Text
  realizados           Realizado[]

  @@map("agendamento")
}

/// Representa os atendimentos realizados faturados (Agendamentos)
model Realizado {
  id            Int         @id @default(autoincrement())
  agendamentoId Int         @map("agendamento_id")
  agendamento   Agendamento @relation(fields: [agendamentoId], references: [id], onDelete: Cascade)
  horasDecimais Decimal     @map("horas_decimais") @db.Decimal(5, 2) // Novo! Horas líquidas decimais para faturamento

  @@map("realizado")
}
```

---

## Relacionamentos

| Origem | Destino | Cardinalidade | Integridade | Notas |
|---|---|---|---|---|
| `contrato.empresa_id` | `empresa.id` | N:1 | FK ON DELETE RESTRICT | Impede a exclusão de uma empresa com contratos ativos. |
| `contrato_item.contrato_id` | `contrato.id` | N:1 | FK ON DELETE CASCADE | Exclui as escalas associadas se o contrato for deletado. |
| `contrato_item.profissional_id`| `profissional.id` | N:1 | FK ON DELETE CASCADE | Exclui as escalas associadas se o profissional for deletado. |
| `agendamento.contrato_id` | `contrato.id` | N:1 | FK ON DELETE SET NULL | Mantém o agendamento histórico mesmo se o contrato for desativado/removido. |
| `agendamento.profissional_id` | `profissional.id` | N:1 | FK ON DELETE SET NULL | Mantém o agendamento mesmo se o profissional se desligar. |
| `realizado.agendamento_id` | `agendamento.id` | N:1 | FK ON DELETE CASCADE | Remove o lançamento de faturamento se o agendamento correspondente for apagado. |

---

## Restrições

- **Unicidade**: Nenhuma regra de restrição única complexa (choque de horários tolerado no legado e reafirmado na decisão de paridade do PO).
- **Integridade referencial**: Ativada via chaves estrangeiras físicas no PostgreSQL e gerenciada pelo Prisma Client no backend.
- **Índices críticos**:
  - `idx_agendamento_data_agenda`: Índice na coluna `data_agenda` da tabela `agendamento` para acelerar a renderização do calendário mensal e semanal.
  - `idx_agendamento_profissional_data`: Índice composto `(profissional_id, data_agenda)` para filtros de busca rápidos por profissional na listagem geral.
  - `idx_contrato_item_busca`: Índice composto `(contrato_id, profissional_id)` na tabela `contrato_item` para busca da escala contratual.

---

## Considerações específicas do paradigma alvo
- **Imutabilidade**: O controle de edição e salvamento concorrente é gerenciado por uma validação atômica no controller do NestJS que confere o status `tipo` do registro antes de acionar comandos Prisma.
- **Precisão de Decimal**: Para a tabela `realizado`, o campo `horas_decimais` utiliza o tipo de dados `Decimal` nativo do PostgreSQL (via `db.Decimal(5, 2)` no Prisma) para evitar perda de precisão de ponto flutuante, crucial para relatórios financeiros.

---

## Origem no legado

| Tabela / coleção nova | Origem no legado | Transformação |
|---|---|---|
| `empresa` | `empresa` | Normalização de tipos e renomeação de colunas. |
| `profissional` | `profissional` | Normalização de tipos e renomeação de colunas. |
| `contrato` | `contrato` | Inclusão do campo `is_feriado` e default de cor `#333333`. |
| `contrato_item` | `contrato_item` | Normalização de tipos e relacionamentos. |
| `agendamento` | `agendamento` | Substituição do campo textual `hora_total` pela coluna inteira `duracao_minutos`, e alteração dos tipos datetime técnicos para TIMESTAMPTZ. |
| `realizado` | `realizado` | Vinculação direta via FK ao `agendamento.id` e tipagem Decimal. |
