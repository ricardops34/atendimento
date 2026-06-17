---
schemaVersion: 1
generatedAt: 2026-06-17T15:20:00Z
reversa:
  version: "1.2.43"
kind: target_domain_model
producedBy: designer
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde9"
---

# Target Domain Model — atendimento

> Modelo de domínio do sistema novo de atendimento. Rastreabilidade explícita para o legado.

## Aggregates

### AGG-Agendamento
- **Aggregate root**: `Agendamento`
- **Invariantes**:
  - **Imutabilidade**: Se o status atual do agendamento for diferente de `A` (Agendado) (ex: `Realizado`, `Cancelado` ou `Feriado`), nenhuma operação de escrita, salvamento ou re-confirmação é permitida.
  - **Tempo Líquido Coeso**: A duração líquida é calculada dinamicamente subtraindo a duração de intervalo da duração bruta (em minutos) e persistida no mesmo aggregate.
- **Comandos aceitos**:
  - `CriarAgendamento` (Cria novo agendamento com status `A` e modalidade `P` por padrão)
  - `AtualizarAgendamento` (Permite alterar dados se status for `A`)
  - `ConfirmarAgendamento` (Muda status para `R` e dispara a criação do respectivo registro de faturamento `Realizado`)
  - `CancelarAgendamento` (Muda status para `C`)
- **Origem no legado**: `_reversa_sdd/domain.md` § 1. Agendamento e `_reversa_sdd/state-machines.md`.

### AGG-Contrato
- **Aggregate root**: `Contrato`
- **Invariantes**:
  - **Empresa Obrigatória**: Todo contrato deve possuir obrigatoriamente uma chave estrangeira para um registro ativo de Empresa.
  - **Escala Recorrente**: Contém uma coleção de itens de escala semanal de profissionais (`contrato_item`).
- **Comandos aceitos**:
  - `CriarContrato` (Valida empresa_id e cor hexadecimal antes de salvar)
  - `AtualizarContrato`
  - `AdicionarEscala`
  - `RemoverEscala`
- **Origem no legado**: `_reversa_sdd/domain.md` § 2. Contrato e 3. Contrato Item.

---

## Entidades

| Entidade | Aggregate dono | Atributos principais | Origem no legado |
|---|---|---|---|
| `Agendamento` | `AGG-Agendamento` | id, contrato_id, profissional_id, descricao, data_agenda, hora_inicio, hora_fim, duracao_minutos, local, tipo, cor | `Agendamento` model |
| `Contrato` | `AGG-Contrato` | id, empresa_id, descricao, cor | `Contrato` model |
| `ContratoItem` | `AGG-Contrato` | id, contrato_id, profissional_id, dia_semana, hora_inicio, hora_fim, intervalo_inicio, intervalo_fim | `ContratoItem` model |
| `Empresa` | (Externo / CRUD) | id, nome | `Empresa` model |
| `Profissional` | (Externo / CRUD) | id, nome | `Profissional` model |
| `Realizado` | `AGG-Agendamento` | id, agendamento_id, horas_decimais | `Realizado` (atendimento faturado) |

---

## Value objects

| Value object | Atributos | Validações | Origem |
|---|---|---|---|
| `CorHexadecimal` | cor (string) | Deve corresponder ao regex `/^#[0-9A-F]{6}$/i`. Fallback: `#333333` se nulo na importação. | `contrato.cor`, `agendamento.cor` |
| `HorarioMinutos` | minutos (int) | Minutos inteiros acumulados a partir do cálculo de tempo líquido (deve ser $\ge 0$). | `agendamento.hora_total` (legado string hh:ii) |

---

## Regras de domínio

> Mapeamento de regras vindas de `target_business_rules.md` (regras MIGRAR) para os aggregates onde elas vivem agora.

| Regra (ID) | Local no domínio novo | Origem (target_business_rules.md) |
|---|---|---|
| BR-MIGRAR-001 | `AGG-Agendamento.horario_inicial / horario_final` (derived) | BR-MIGRAR-001 (Datetime compostos) |
| BR-MIGRAR-002 | `AGG-Agendamento.duracao_minutos` (cálculo de tempo líquido) | BR-MIGRAR-002 (Duração líquida) |
| BR-MIGRAR-003 | `AGG-Agendamento.invariante.Imutabilidade` | BR-MIGRAR-003 (Imutabilidade de status) |
| BR-MIGRAR-004 | `AGG-Agendamento.cor / descricao` (OnChangeContrato service) | BR-MIGRAR-004 (Herança de Contrato) |
| BR-MIGRAR-005 | `AGG-Agendamento.tipo / local` (defaults) | BR-MIGRAR-005 (Parâmetros padrão) |
| BR-MIGRAR-006 | `AGG-Contrato.invariante.Empresa Obrigatória` | BR-MIGRAR-006 (Empresa obrigatória) |
| BR-MIGRAR-007 | `AGG-Contrato / Empresa / Profissional` (class-validator) | BR-MIGRAR-007 (Campos obrigatórios) |
| BR-MIGRAR-008 | `AGG-Agendamento.ConfirmarAgendamento` (fechamento em lote) | BR-MIGRAR-008 (Fechamento em lote) |

---

## Rastreabilidade para o legado

| Elemento novo | Origem no legado | Tipo de mapeamento |
|---|---|---|
| `AGG-Agendamento` | `domain.md § Agendamento` + `Agendamento.php` | fundido (combina agendamento com a lógica de mudança de status e escrita de concluídos) |
| `AGG-Contrato` | `domain.md § Contrato / Contrato Item` | fundido (combina o contrato comercial e a sua escala semanal) |
| `CorHexadecimal` | `contrato.cor` | novo (como value object tipado e higienizado com regex no NestJS) |
| `HorarioMinutos` | `agendamento.hora_total` | dividido (anteriormente era apenas string hh:ii no banco; agora é inteiro de minutos) |
