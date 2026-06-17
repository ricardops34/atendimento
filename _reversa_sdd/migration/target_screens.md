---
schemaVersion: 1
generatedAt: 2026-06-17T15:24:00Z
reversa:
  version: "1.2.43"
kind: target_screens
producedBy: screen-translator
mode: modernized
sourcePlatform: php-server-rendered
targetPlatform: web-spa
adapter: adapters/php-server-rendered__web-spa
screenCount: 4
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde5"
---

# Target Screens — atendimento

> Especificação executável de cada tela do sistema novo, derivada do legado segundo o modo modernizado aprovado em `screen_modernization_decision.md`.

## Resumo

- **Modo aplicado**: `modernized` (modernizado)
- **Telas geradas**: 4
- **Adapter**: `php-server-rendered__web-spa`
- **Tokens consumidos**: ver `_reversa_sdd/design-system/tokens.md` e `tokens-derived.md`
- **Golden files**: 0 (captura manual sugerida em `screens/golden/manifest.yaml` para v2)
- **Deviations registradas**: 3 em `screen_deviation_log.md`

---

## Tela: AgendamentoList

**Origem**: `antigo/app/control/servicos/AgendamentoList.php:1`
**Modo aplicado**: `modernized`
**Componentes do design-system**: [`po-page-list`, `po-table`, `po-button`, `po-popup`]
**Pontos de interpolação**: `{{duracao_total}}`, `{{agendamento_id}}`
**Transições de saída**: [`SCR-0002` (Filtros), `SCR-0004` (Inclusão)]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: route-component
spec.route: /agendamentos/lista
spec.layout: AppLayout
spec.states: [idle, loading, error, success]
spec.component:
  name: AgendamentoListPage
  legacy_origin: "AgendamentoList"
  children:
    - component: po-page-list
      props:
        p-title: "Atendimentos Operacionais"
      children:
        - component: po-button
          props:
            p-label: "Novo Agendamento"
            p-type: primary
            p-icon: "po-icon-plus"
          action: sidebar.open(SCR-0004)
        - component: po-button
          props:
            p-label: "Filtrar"
            p-icon: "po-icon-filter"
          action: sidebar.open(SCR-0002)
        - component: po-table
          props:
            p-items: $state.agendamentos
            p-columns:
              - property: dataAgenda
                label: "Data"
                type: date
              - property: contratoDescricao
                label: "Contrato"
              - property: profissionalNome
                label: "Profissional"
              - property: localFormatado
                label: "Modalidade"
              - property: duracaoFormatada
                label: "Duração Total"
                content: "{{duracao_minutos | minutesToHours}}"
            p-actions:
              - label: "Confirmar"
                icon: "po-icon-ok"
                action: agendamento.confirmar(id)
                visible: "tipo === 'A'"
              - label: "Ordem de Serviço (OS)"
                icon: "po-icon-doc"
                action: os.showPlaceholder()
                deviation: DEV-001
spec.api_changes:
  - legacy: GET index.php?class=AgendamentoList (renderização completa)
    target: GET /api/agendamentos (retorna JSON estruturado)
```

### Pontos de divergência aceitos
- **DEV-001**: O botão de OS não redirecionará para a geração de PDF, atuando apenas como um placeholder inativo ou exibindo popover "Módulo em migração".
- **DEV-003**: Agendamentos de contratos com cores nulas ou vazias aparecem pintados com `#333333` padrão na lista/tabela.

### Estados

| Estado | Descrição | Conteúdo / mensagem |
|---|---|---|
| Idle | Grade renderizada com os atendimentos carregados | Grade de atendimentos populada |
| Loading | Buscando atendimentos via API | Spinner de carregamento padrão PO-UI |
| Error | Falha ao consultar a API REST | Alerta PO-UI exibindo a mensagem do servidor `{{error_message}}` |
| Success | Confirmação efetuada com sucesso | Toast com mensagem "Atendimento confirmado como Realizado." |

---

## Tela: AgendamentoListFiltros

**Origem**: `antigo/app/control/servicos/AgendamentoList.php:40`
**Modo aplicado**: `modernized`
**Componentes do design-system**: [`po-sidebar`, `po-combo`, `po-datepicker`, `po-button`]
**Pontos de interpolação**: `{{contrato_id}}`, `{{profissional_id}}`, `{{data_de}}`, `{{data_ate}}`
**Transições de saída**: [`SCR-0001` (Listagem)]
**Tela crítica?**: não

### Especificação

```yaml
spec.kind: component-tree
spec.states: [idle]
spec.root:
  component: po-sidebar
  props:
    p-title: "Filtrar Atendimentos"
  children:
    - component: po-combo
      name: contratoId
      label: "Contrato"
      props:
        p-options: $state.contratos
    - component: po-combo
      name: profissionalId
      label: "Profissional"
      props:
        p-options: $state.profissionais
    - component: po-datepicker
      name: dataDe
      label: "De"
    - component: po-datepicker
      name: dataAte
      label: "Até"
    - component: po-button
      props:
        p-label: "Aplicar Filtros"
        p-type: primary
      action: list.applyFilters()
```

---

## Tela: AgendamentoCalendarioFormView

**Origem**: `antigo/app/control/servicos/AgendamentoCalendarioFormView.php:1`
**Modo aplicado**: `modernized`
**Componentes do design-system**: [`po-page-default`, `po-button`, `fullcalendar-component`]
**Pontos de interpolação**: nenhum
**Transições de saída**: [`SCR-0004` (Formulário Lateral)]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: route-component
spec.route: /agendamentos/calendario
spec.layout: AppLayout
spec.states: [idle, loading, error]
spec.component:
  name: AgendamentoCalendarioPage
  children:
    - component: po-page-default
      props:
        p-title: "Calendário de Atendimentos"
      children:
        - component: fullcalendar-angular
          props:
            events: $state.eventosCalendario
            headerToolbar:
              left: "prev,next today"
              center: "title"
              right: "dayGridMonth,timeGridWeek,timeGridDay"
          events:
            dateClick: sidebar.open(SCR-0004, { data: event.date })
            eventClick: sidebar.open(SCR-0004, { agendamentoId: event.id })
```

---

## Tela: AgendamentoCalendarioFormIncluir

**Origem**: `antigo/app/control/servicos/AgendamentoCalendarioForm.php:1`
**Modo aplicado**: `modernized`
**Componentes do design-system**: [`po-sidebar`, `po-input`, `po-combo`, `po-datepicker`, `po-textarea`, `po-button`]
**Pontos de interpolação**: `{{descricao}}`, `{{contrato_id}}`, `{{duracao_minutos}}`
**Transições de saída**: [`SCR-0003` (Calendário)]
**Tela crítica?**: sim

### Especificação

```yaml
spec.kind: component-tree
spec.states: [idle, loading, error, success]
spec.root:
  component: po-sidebar
  props:
    p-title: "Lançamento de Atendimento"
  children:
    - component: po-input
      name: descricao
      label: "Descrição do Atendimento"
      validation:
        required: true
    - component: po-combo
      name: contratoId
      label: "Contrato"
      events:
        change: contrato.onSelectContrato(id) # Herança Ajax (BR-MIGRAR-004)
      validation:
        required: true
    - component: po-combo
      name: profissionalId
      label: "Profissional"
      validation:
        required: true
    - component: po-datepicker
      name: dataAgenda
      label: "Data do Apontamento"
      validation:
        required: true
    - component: FormRow
      children:
        - component: po-input
          name: horaInicio
          label: "Hora Início"
          mask: "99:99"
          validation:
            required: true
        - component: po-input
          name: horaFim
          label: "Hora Fim"
          mask: "99:99"
          events:
            blur: time.calculateDuration() # Cálculo de tempo líquido
          validation:
            required: true
    - component: FormRow
      children:
        - component: po-input
          name: horaIntervaloInicial
          label: "Intervalo Início"
          mask: "99:99"
          events:
            blur: time.calculateDuration()
        - component: po-input
          name: horaIntervaloFinal
          label: "Intervalo Fim"
          mask: "99:99"
          events:
            blur: time.calculateDuration()
    - component: po-input
      name: duracaoExibicao
      label: "Tempo Líquido (Total)"
      props:
        p-disabled: true
        p-value: "{{duracao_minutos | minutesToHours}}"
    - component: po-combo
      name: local
      label: "Modalidade"
      props:
        p-options:
          - { label: "Presencial", value: "P" }
          - { label: "Remoto", value: "R" }
          - { label: "Falta", value: "F" }
    - component: po-textarea
      name: observacao
      label: "Observações"
    - component: ButtonRow
      children:
        - component: po-button
          props:
            p-label: "Salvar"
            p-type: primary
          action: form.submit()
        - component: po-button
          props:
            p-label: "Confirmar Atendimento"
            p-type: link
          action: agendamento.confirmar()
          visible: "tipo === 'A'"
        - component: po-button
          props:
            p-label: "OS (Ordem de Serviço)"
            p-disabled: true
            p-icon: "po-icon-doc"
          action: os.showPlaceholder()
          deviation: DEV-001
```

### Pontos de divergência aceitos
- **DEV-001**: Botão de OS desativado (placeholder).
- **DEV-002**: Formulário abre em painel lateral reativo (Drawer/Sidebar PO-UI) em vez de janela de diálogo central do Adianti.

### Estados

| Estado | Descrição | Conteúdo / mensagem |
|---|---|---|
| Idle | Formulário aberto aguardando preenchimento ou edição | Campos de formulário limpos ou carregados |
| Loading | Enviando os dados de agendamento para a API | Bloqueio de formulário com loader ativo |
| Error | Falha de validação ou erro de gravação do banco | Alerta exibindo `{{error_message}}` |
| Success | Registro gravado com sucesso no banco | Toast informando "Agendamento gravado com sucesso." e fecha a sidebar. |

---

## Apêndice: rastreabilidade ao inventário

| Tela do `target_screens.md` | Origem em `_reversa_sdd/ui/inventory.md` | Origem em `_reversa_sdd/screens/inventory.json` |
|---|---|---|
| `AgendamentoList` | [Linha 5](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/ui/inventory.md#L5) | `SCR-0001` |
| `AgendamentoListFiltros` | [Linha 6](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/ui/inventory.md#L6) | `SCR-0002` |
| `AgendamentoCalendarioFormView` | [Linha 7](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/ui/inventory.md#L7) | `SCR-0003` |
| `AgendamentoCalendarioFormIncluir` | [Linha 8](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/ui/inventory.md#L8) | `SCR-0004` |
