# Agendamentos (Calendário e Listagem)

## Visão Geral
Esta unit é responsável pela gestão e visualização operacional dos atendimentos. Ela compreende duas visualizações principais: uma grade de calendário interativo (semanal/mensal) com um formulário de inclusão lateral, e uma grade de listagem geral com filtros avançados de busca e exportação de relatórios.

## Responsabilidades
*   Visualizar atendimentos em grade de calendário interativa (diária, semanal, mensal e formato de agenda). 🟢
*   Lançar agendamentos individuais vinculados a um Profissional e a um Contrato. 🟢
*   Calcular de forma automática a duração de trabalho líquida, excluindo o intervalo de almoço/descanso. 🟢
*   Herdar dinamicamente os parâmetros visuais e descritivos do Contrato ao criar um agendamento. 🟢
*   Controlar a imutabilidade do ciclo de vida do atendimento (apenas status `Agendada` pode ser editado/confirmado). 🟢
*   Listar agendamentos em formato de tabela pesquisável com filtros e exportação. 🟢
*   Disparar o fluxo para geração/impressão de Ordens de Serviço (OS). 🟢

## Regras de Negócio
*   **RN01 — Derivação de Datetimes Técnicos:** Os campos técnicos de banco `horario_inicial` e `horario_final` devem ser compostos concatenando a data do atendimento (`data_agenda`) com os horários informados pelo usuário (`hora_inicio` e `hora_fim`). 🟢
*   **RN02 — Cálculo de Duração Líquida Textual:**
    *   $\text{Duração Bruta} = \text{hora\_fim} - \text{hora\_inicio}$
    *   $\text{Tempo de Descanso} = \text{hora\_intervalo\_final} - \text{hora\_intervalo\_inicial}$
    *   $\text{Duração Líquida} = \text{Duração Bruta} - \text{Tempo de Descanso}$ (gravada como texto no formato `hh:ii`). 🟢
*   **RN03 — Validação de Mudança de Status (Imutabilidade):**
    *   A confirmação individual do atendimento altera o status (`tipo`) para `R` (Realizada).
    *   Esta operação e qualquer alteração de dados só podem ser realizadas se o status atual do banco for `A` (Agendada). 🟢
*   **RN04 — Cópia de Propriedades do Contrato (Ajax):** Ao alterar o combo de seleção de contrato no formulário, a tela deve buscar assincronamente a cor hexadecimal e a descrição padrão do contrato e atribuí-las automaticamente aos respectivos campos do agendamento. 🟢
*   **RN05 — Parâmetros Padrão:** O tipo de atividade (`tipo`) padrão de novos agendamentos é `A` (Agendada) e a modalidade (`local`) padrão é `P` (Presencial). 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|-----------|-------------------|
| RF-01 | Calendário Interativo | Must | Exibir grade horária semanal de atendimentos com cores correspondentes a cada contrato. Permitir abrir o formulário lateral ao clicar no calendário. |
| RF-02 | Formulário Lateral de Lançamento | Must | Permitir preencher Contrato, Profissional, Modalidade, Descrição, Data, Horário Inicial, Horário Final e Horários de Intervalo. |
| RF-03 | Cálculo Automático de Tempo | Must | Calcular e exibir o campo `Total` assim que o Horário Final e de Intervalos forem preenchidos ou modificados. |
| RF-04 | Confirmação de Agendamento | Must | Botão para confirmar o agendamento individual, aplicando status `Realizada` (R) caso o status original seja `Agendada` (A). |
| RF-05 | Listagem de Atendimentos | Must | Exibir grade em formato de tabela com colunas de Observações, Tipo (Modalidade), Data e Duração Total. |
| RF-06 | Filtros na Listagem | Must | Painel lateral de filtros para restringir a listagem por Contrato, Profissional e período de data. |
| RF-07 | Emissão de Ordem de Serviço | Should | Botão por linha da grade de listagem ou no formulário lateral que redireciona para a geração da OS (`OrdemServicoDocument`). |
| RF-08 | Exportação da Grade | Should | Permitir exportar a listagem filtrada para os formatos CSV, XLS, PDF e XML. |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Renderização assíncrona de eventos na janela visível do calendário (FullCalendar API) | `AgendamentoCalendarioFormView.php` | 🟢 |
| Integridade | Bloqueio de gravação concorrente através de transações atômicas de banco | `AgendamentoCalendarioForm.php:onSave` | 🟢 |

## Critérios de Aceitação

```gherkin
Cenário: Inclusão bem-sucedida de agendamento com cálculo de intervalo
  Dado que o usuário está no calendário semanal
  Quando clica no dia 17/06/2026 às 08:30
  E preenche a descrição como "Atendimento Reinf", contrato "FUNLEC" (cor verde #4CAF50) e profissional "Ricardo"
  E preenche hora de início "08:30", hora de fim "17:30", intervalo inicial "11:30" e intervalo final "13:00"
  E clica em Salvar
  Então o sistema calcula a duração total líquida como "07:30"
  E persiste o agendamento no banco de dados com tipo "A" (Agendada) e cor "#4CAF50"
  E fecha o painel lateral recarregando o calendário com o evento verde ativo

Cenário: Tentativa de confirmação de agendamento já realizado
  Dado que o usuário abriu um agendamento com status "R" (Realizada)
  Quando clica no botão Confirmar
  Então o sistema bloqueia a alteração, desfaz a transação e exibe uma mensagem de erro "Registro não pode ser alterado"
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Calendário Interativo | Must | Tela principal de controle diário das rotinas de atendimento. |
| Formulário de Lançamento | Must | Fluxo essencial para criar e alimentar a agenda. |
| Cálculo de Tempo Líquido | Must | Regra matemática de domínio indispensável para precificação de horas. |
| Filtros e Grid de Listagem | Must | Necessário para consulta consolidada e auditoria de atendimentos. |
| Emissão de OS | Should | Importante para os profissionais levarem a ordem de serviço impressa no cliente. |
| Exportação da Grade | Should | Útil para extração rápida de dados administrativos. |

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `antigo/app/control/servicos/AgendamentoCalendarioFormView.php` | `AgendamentoCalendarioFormView` | 🟢 |
| `antigo/app/control/servicos/AgendamentoCalendarioForm.php` | `AgendamentoCalendarioForm` | 🟢 |
| `antigo/app/control/servicos/AgendamentoList.php` | `AgendamentoList` | 🟢 |
| `antigo/app/model/Agendamento.php` | `Agendamento` | 🟢 |
