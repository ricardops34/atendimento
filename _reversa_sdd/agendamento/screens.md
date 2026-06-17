# Screens - Agendamento

## Unit

- Unit: `agendamento`
- Fonte visual: `antigo/telas`
- Fonte de dados: `antigo/backup/bjsoft18_portal.sql`
- Acesso: sistema autenticado por usuario.
- Rotinas cobertas:
  - `AgendamentoList`
  - `AgendamentoCalendarioFormView`
  - `AgendamentoCalendarioForm`

## Acesso e permissoes

- O acesso ao sistema ocorre por usuario autenticado.
- A tela mostra usuario logado no canto superior direito e no menu lateral.
- O MVP nao reutilizara o modelo de permissoes legado baseado em `system_*`.
- O novo modelo de acesso sera baseado em:
  - `tenant`: unidade/cliente/ambiente de isolamento dos dados.
  - `usuario`: identidade autenticada.
  - `perfil`: conjunto de permissoes atribuido ao usuario dentro de um tenant.
  - `modulo`: item funcional exibido no menu e protegido no backend.
- O menu sera dinamico: o frontend deve exibir apenas os modulos liberados para o perfil ativo do usuario no tenant ativo.
- Modulos minimos para esta unit:
  - `appointments-calendar`: calendario de agendamentos.
  - `appointments-list`: listagem e filtros de agendamentos.
  - `appointments-form`: inclusao, edicao, exclusao e confirmacao de lancamentos.
- Impacto funcional: usuario sem modulo liberado nao deve ver o item de menu nem acessar diretamente a rota/API correspondente.

## Tela: AgendamentoList

- Screenshot: `screenshots/AgendamentoList.png`
- Screenshot complementar: `screenshots/AgendamentoList Filtros.png`
- Rota observada: `index.php?class=AgendamentoList&method=onShow&adianti_open_tab=1&adianti_tab_name=Agendamentos`
- Proposito: consultar agendamentos em formato de listagem, filtrar registros, exportar dados e emitir ordem de servico por linha.
- Estado: preenchido, com registros carregados.
- Entrada: menu lateral `Servicos > Agendamentos`.

### Navegacao e layout

- Sidebar fixa com usuario logado e menu principal.
- Aba superior `Agendamentos` aberta ao lado de `Calendario`.
- Breadcrumb `Servicos > Agendamentos`.
- Painel principal com titulo `Agendamentos`.

### Componentes visiveis

- Botao `Filtros`, com contador visual de filtros ativos.
- Botao/dropdown `Exportar`.
- Grid de resultados.
- Acao por linha com icone de impressao, associada a OS.

### Painel de filtros

- Estado documentado: painel lateral aberto.
- Titulo: `Agendamentos`.
- Acao de fechamento: botao `Fechar`.
- Campos:
  - `Contrato`: combo pesquisavel com placeholder `Selecionar`.
  - `Profissional`: combo pesquisavel com placeholder `Selecionar`.
  - `Data de`: campo de data com icone de calendario.
  - `Data Ate`: campo de data com icone de calendario.
- Acao principal: botao `Buscar`.
- Comportamento confirmado pelo codigo: os valores filtram `contrato_id`, `profissional_id` e intervalo de `data_agenda`.

### Colunas visiveis

- `Observacoes`
- `Tipo`
- `Data`
- `Total`

### Comportamento confirmado pelo codigo

- Os filtros reais sao `contrato_id`, `profissional_id`, `data_de` e `data_ate`.
- A listagem agrupa por `contrato_id`, exibindo empresa via `{contrato->empresa->nome}`.
- A coluna `Tipo` traduz `local`: `P` para Presencial, `R` para Remoto, `F` para Falta.
- A coluna `Data` renderiza `data_agenda` em `dd/mm/yyyy`.
- A coluna `Total` soma `hora_total` e mostra total decimal.
- A acao de impressao chama `OrdemServicoDocument::onGenerate`.
- Exportacoes suportadas: CSV, XLS, PDF e XML.

## Tela: AgendamentoCalendarioFormView

- Screenshot: `screenshots/AgendamentoCalendarioForm.png`
- Rota observada: `index.php?class=AgendamentoCalendarioFormView&adianti_open_tab=1&adianti_tab_name=Calendario`
- Proposito: visualizar agenda semanal/mensal/diaria e abrir o formulario lateral de agendamento.
- Estado: preenchido, em visao semanal.
- Entrada: menu lateral `Servicos > Calendario`.

### Navegacao e layout

- Sidebar fixa com menu `Servicos` expandido.
- Aba superior `Calendario` ativa.
- Calendario em grade semanal com faixa horaria de `07:00` a `23:00`.
- Botoes de navegacao anterior/proximo e botao `Hoje`.
- Alternancia de visualizacao: `Dia`, `Semana`, `Mes`, `Agenda`.

### Eventos visiveis

- Eventos coloridos por contrato/agendamento.
- Cada bloco mostra intervalo de horario e descricao curta, por exemplo `MSGAS` e `RCG`.
- A coluna do dia atual aparece destacada em amarelo claro.

### Comportamento confirmado pelo codigo

- A tela usa `TFullCalendar`.
- `getEvents()` busca `Agendamento` por interseccao de periodo:
  - `horario_inicial <= fim da janela`
  - `horario_final >= inicio da janela`
- Clique em dia chama `AgendamentoCalendarioForm::onStartEdit`.
- Clique em evento chama `AgendamentoCalendarioForm::onEdit`.
- Atualizacao por arrastar/redimensionar chama `AgendamentoCalendarioForm::onUpdateEvent`.
- Popover mostra contrato, profissional e observacoes.

## Formulario: AgendamentoCalendarioForm

- Screenshot: `screenshots/AgendamentoCalendarioForm Incluir.png`
- Proposito: criar, editar, confirmar, excluir e gerar OS de um agendamento.
- Exibicao esperada: painel lateral direito (`adianti_right_panel`).
- Relacao visual: aberto a partir da tela de calendario.
- Estado documentado: inclusao de novo lancamento a partir do calendario.

### Campos

- `id` oculto
- `contrato_id`
- `profissional_id`
- `cor`
- `local`
- `descricao`
- `data_agenda`
- `hora_inicio`
- `hora_intervalo_inicial`
- `hora_intervalo_final`
- `hora_fim`
- `hora_total`
- `horario_inicial`
- `intervalo_inicial`
- `intervalo_final`
- `horario_final`
- `tipo`
- `observacao`

### Campos visiveis no lancamento

- `Contrato`: combo com placeholder `Selecionar`.
- `Profissional`: combo com placeholder `Selecionar`.
- `Cor`: campo hexadecimal e seletor de cor, iniciado com `#3a87ad`.
- `Tipo`: combo exibindo valor iniciado por `P...`, correspondente a `local = P` no codigo.
- `Descricao`: campo texto obrigatorio, label em vermelho.
- `Data`: campo data, preenchido no print com `17/06/2026`.
- `Horario Inicial`: campo horario obrigatorio, label em vermelho.
- `Intervalo Inicial`: campo horario, default `00:00`.
- `Intervalo Final`: campo horario, default `00:00`.
- `Horario Final`: campo horario obrigatorio, label em vermelho.
- `Total`: campo calculado e nao editavel.
- `Horario inicial`: campo tecnico nao editavel, preenchido com `17/06/2026 08:00`.
- `Intervalo Inicial`: campo tecnico nao editavel.
- `Intervalo Final`: campo tecnico nao editavel.
- `Horario final`: campo tecnico nao editavel, preenchido com `17/06/2026 09:00`.
- `Tipo de Atividade`: combo tecnico nao editavel, iniciado por `A...`, correspondente a `tipo = A`.
- `Observacoes`: editor rich text com toolbar de formatacao.

### Validacoes e defaults

- `descricao` obrigatoria.
- `hora_inicio` obrigatoria.
- `hora_fim` obrigatoria.
- `local` default `P`.
- `tipo` default `A` quando vazio.
- `hora_intervalo_inicial` e `hora_intervalo_final` default `00:00`.
- Campos tecnicos `horario_inicial`, `horario_final`, `intervalo_inicial`, `intervalo_final`, `tipo` e `hora_total` aparecem como nao editaveis.

### Acoes

- `Salvar`: grava ou atualiza `Agendamento`.
- `Excluir`: remove `Agendamento` apos confirmacao.
- `Confirmar`: muda `tipo` para `R`.
- `OS`: chama `OrdemServicoDocument::onGenerate`.
- `Fechar`: fecha o painel lateral.

### Regras de negocio observadas

- `horario_inicial` e `horario_final` sao derivados de `data_agenda + hora_inicio/hora_fim`.
- `hora_total` e calculado como duracao total menos intervalo.
- Confirmacao so prossegue quando o registro esta como `tipo = A`.
- Mudanca de contrato copia `cor` e `descricao` do contrato para o formulario.
- Drag/drop no calendario altera apenas `horario_inicial` e `horario_final`.

## Entidades e banco

- Tabela principal: `agendamento`.
- Chave primaria: `id`.
- Relacoes:
  - `agendamento.contrato_id -> contrato.id`
  - `agendamento.profissional_id -> profissional.id`
- Permissoes:
  - O backup antigo contem programas `AgendamentoList`, `AgendamentoCalendarioForm` e `AgendamentoCalendarioFormView`, mas eles servem apenas como referencia funcional.
  - O MVP usara modulos novos por tenant/perfil/modulo, sem depender das tabelas `system_*`.

## Lacunas

- A tela capturada nao mostra o painel lateral do formulario aberto.
- A tela capturada nao mostra estados de erro, confirmacao de exclusao ou mensagens de sucesso.
