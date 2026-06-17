---
schemaVersion: 1
generatedAt: 2026-06-17T15:24:00Z
reversa:
  version: "1.2.43"
kind: screen_deviation_log
producedBy: screen-translator
mode: append-only
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde4"
---

# Screen Deviation Log — atendimento

> Registro de toda divergência entre o legado e a spec gerada em `target_screens.md`. Append-only.

## Resumo

- **Total**: 3
- **Pendentes**: 0
- **Aprovadas**: 3
- **Rejeitadas**: 0

---

## Entradas

### DEV-001

| Campo | Valor |
|---|---|
| Tela afetada | `AgendamentoList` / `AgendamentoCalendarioFormIncluir` |
| Tipo | `modernizacao` |
| Descrição | Botão/ícone de emissão de Ordem de Serviço (OS) atua apenas como placeholder visual inativo ou exibe popover de aviso de migração. |
| Motivo | A classe legada `OrdemServicoDocument` de PDF está fora do escopo acordado do MVP. |
| Origem no legado | `antigo/app/control/servicos/AgendamentoList.php` |
| Implicação para parity tests | Parity tests visuais devem ignorar o fluxo de redirecionamento e geração do documento PDF, validando apenas a presença e o estado inativo do botão na interface. |
| Aprovação | `aprovado` |
| Aprovado por | Ricardo (Product Owner) |
| Aprovado em | 2026-06-17T15:23:55Z |
| Propaga para `parity_specs.md § Exceções` | sim |

### DEV-002

| Campo | Valor |
|---|---|
| Tela afetada | `AgendamentoCalendarioFormIncluir` |
| Tipo | `modernizacao` |
| Descrição | O formulário de inclusão/edição de agendamentos deixa de abrir em janela padrão de formulário Adianti síncrono e passa a abrir como uma Sidebar/Drawer lateral reativa sobre a tela do calendário. |
| Motivo | Aproveitar as diretrizes de UX e componentes nativos da biblioteca PO-UI. |
| Origem no legado | `antigo/app/control/servicos/AgendamentoCalendarioForm.php` |
| Implicação para parity tests | Eliminar comparação de layout pixel-a-pixel. Testes devem cobrir fluxo semântico de preenchimento, interações do form e disparo da requisição POST/PUT para a API. |
| Aprovação | `aprovado` |
| Aprovado por | Ricardo (Product Owner) |
| Aprovado em | 2026-06-17T15:23:55Z |
| Propaga para `parity_specs.md § Exceções` | sim |

### DEV-003

| Campo | Valor |
|---|---|
| Tela afetada | `AgendamentoList` / `AgendamentoCalendarioFormView` |
| Tipo | `correcao` |
| Descrição | Contratos históricos com cores hexadecimais vazias ou nulas passam a renderizar com a cor cinza `#333333` padrão no calendário e nas grades do frontend Angular. |
| Motivo | Evitar erros de renderização e console no PO-UI/FullCalendar moderno devido a dados corrompidos na base legado. |
| Origem no legado | `antigo/backup/bjsoft18_portal.sql` |
| Implicação para parity tests | Na paridade visual do calendário, registros sem cor no legado devem ser testados e validados com a cor `#333333` na nova UI. |
| Aprovação | `aprovado` |
| Aprovado por | Ricardo (Product Owner) |
| Aprovado em | 2026-06-17T15:23:55Z |
| Propaga para `parity_specs.md § Exceções` | sim |

---

## Telas com mais de uma deviation

| Tela | IDs |
|---|---|
| `AgendamentoList` | DEV-001, DEV-003 |
| `AgendamentoCalendarioFormIncluir` | DEV-001, DEV-002 |

---

## Notas
- Todas as deviations listadas foram formalmente aprovadas pelo Product Owner durante a Fase 1 (decisão de modo modernizado e curadoria de dados AL-002), o que desbloqueia de imediato o pipeline de paridade para o Inspector.
