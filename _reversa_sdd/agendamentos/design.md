# Agendamentos, Design Técnico

## Interface

Esta unit é composta pelas seguintes interfaces e rotinas do sistema legado:

### Modelos ActiveRecord (Persistência)

| Símbolo | Classe Base | Tabela Associada | Observação |
|---------|-------------|------------------|------------|
| `Agendamento` | `TRecord` | `agendamento` | Representa o lançamento de atendimento na agenda. |

### Controladores e Telas

| Símbolo | Assinatura / Gatilho | Retorno / Saída | Observação |
|---------|---------------------|-----------------|------------|
| `AgendamentoCalendarioFormView` | Entrada principal Web | Renderiza calendário | Utiliza o componente `TFullCalendar` do Adianti. |
| `AgendamentoCalendarioForm` | Aberto no painel lateral | Formulário lateral | Cadastro, edição e ações do agendamento. |
| `AgendamentoList` | Menu principal Web | Tabela com filtros | Grade de busca com paginação e exportação. |

### Métodos e Lógica Core

| Símbolo | Assinatura | Retorno / Saída | Observação |
|---------|-----------|-----------------|------------|
| `AgendamentoCalendarioForm.onSave` | `onSave($param)` | Salva registro no banco | Valida obrigatórios, calcula duração e concatena datetimes. |
| `AgendamentoCalendarioForm.onConfirmar` | `onConfirmar($param)` | Muda status para `R` | Valida se status atual é igual a `A` antes de mudar para `R`. |
| `AgendamentoCalendarioForm.onDelete` | `onDelete($param)` | Exclui fisicamente | Apresenta caixa de pergunta `TQuestion` antes de excluir. |
| `AgendamentoCalendarioForm.OnChangeContrato` | `OnChangeContrato($param)` | Dados Ajax de Contrato | Retorna JSON de cor e descrição do Contrato. |
| `AgendamentoCalendarioForm.onExitHoraFim` | `onExitHoraFim($param)` | Dados Ajax de Duração | Calcula duração total líquida e exibe no campo calculated. |

---

## Fluxo Principal 1: Salvamento Manual de Agendamento (`onSave`)

1.  **Validação de Entrada:** O formulário valida a presença obrigatória dos campos `descricao`, `hora_inicio` e `hora_fim` ([AgendamentoCalendarioForm.php:60-62](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L60-L62)).
2.  **Concatenação de Data e Horários:**
    *   `horario_inicial` recebe `$data_agenda + hora_inicio` formatado em `Y-m-d H:i:s`.
    *   `horario_final` recebe `$data_agenda + hora_fim` formatado em `Y-m-d H:i:s`.
3.  **Cálculo da Duração Líquida Textual (`hora_total`):**
    *   $\text{Duração Total (Segundos)} = \text{strtotime}(hora\_fim) - \text{strtotime}(hora\_inicio)$
    *   $\text{Intervalo (Segundos)} = \text{strtotime}(hora\_intervalo\_final) - \text{strtotime}(hora\_intervalo\_inicial)$
    *   $\text{Tempo Líquido} = \text{Duração Total} - \text{Intervalo}$
    *   Grava o tempo líquido formatado em string `H:i` no campo `hora_total` ([linhas 280-288](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L280-L288)).
4.  **Status Default:** Se o status (`tipo`) estiver vazio, atribui por padrão o valor `'A'` (Agendada).
5.  **Gravação e Recarga:** Salva o objeto no banco (`$object->store()`), dispara comando JS para recarregar o calendário (`AgendamentoCalendarioFormView::onReload`) e fecha a janela lateral ([linhas 298-312](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L298-L312)).

---

## Fluxo Principal 2: Confirmação de Agendamento (`onConfirmar`)

1.  **Validação de Status em Banco:** O sistema recupera os dados digitados e valida se o status atual (`tipo`) do agendamento é igual a `'A'` (Agendada). Se for diferente de `'A'`, reverte a transação e impede a gravação, lançando mensagem de erro ([linhas 385-390](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L385-L390)).
2.  **Cálculo e Concatenação:** Executa a mesma lógica de concatenação de datas e cálculo de duração líquida do fluxo de salvamento.
3.  **Atualização de Status:** Altera o campo `tipo` para `'R'` (Realizada).
4.  **Gravação e Recarga:** Grava no banco de dados e dispara comando de atualização da interface do calendário.

---

## Dependências

*   **TFullCalendar Library (Adianti Integration):** Utilizada no calendário para exibição em grade e captura de eventos de clique e arrastar.
*   **Contrato, Profissional, Empresa (Cadastros de Apoio):** Fornecem os dados estruturais e parâmetros (como cores Hex e chaves estrangeiras) para o agendamento.
*   **OrdemServicoDocument:** Página/classe chamada via `TApplication::loadPage` para renderizar os detalhes do agendamento em padrão de Ordem de Serviço PDF.

---

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| **Bloqueio de Edição Pós-Confirmação:** Agendamentos que não tenham status igual a `'A'` têm gravação e modificação rejeitadas, garantindo a integridade dos dados históricos faturados. | `AgendamentoCalendarioForm.php:385` | 🟢 |
| **Derivação de Datetimes para o Calendário:** As datas técnicas (`horario_inicial`/`horario_final`) são concatenações formatadas para atender aos requisitos de faixa de eventos exigidos pelo FullCalendar, mantendo campos separados de data e hora para facilidade de digitação do usuário. | `AgendamentoCalendarioForm.php:271-278` | 🟢 |
| **Gatilho de Interface OnExitHoraFim:** O cálculo do tempo de trabalho na tela lateral é disparado de forma dinâmica quando o usuário sai do campo `hora_fim` (Ajax `onExitHoraFim`), proporcionando feedback imediato na tela. | `AgendamentoCalendarioForm.php:58` | 🟢 |

---

## Estado Interno (Tabelas de Banco)

### Tabela: `agendamento`
Mapeia os lançamentos individuais de agenda:
*   `id`: `INTEGER` (Chave Primária, Autoincremento)
*   `contrato_id`: `INTEGER` (FK para `contrato.id`, Opcional)
*   `profissional_id`: `INTEGER` (FK para `profissional.id`, Opcional)
*   `descricao`: `VARCHAR` (Obrigatório)
*   `data_agenda`: `DATE` (Obrigatório)
*   `hora_inicio`: `VARCHAR` (hh:ii, Obrigatório)
*   `hora_fim`: `VARCHAR` (hh:ii, Obrigatório)
*   `hora_intervalo_inicial`: `VARCHAR` (hh:ii, default: `00:00`)
*   `hora_intervalo_final`: `VARCHAR` (hh:ii, default: `00:00`)
*   `hora_total`: `VARCHAR` (hh:ii, calculada)
*   `horario_inicial`: `DATETIME` (yyyy-mm-dd hh:ii, derivado)
*   `horario_final`: `DATETIME` (yyyy-mm-dd hh:ii, derivado)
*   `local`: `VARCHAR` (P = Presencial, R = Remoto, F = Falta, default: P)
*   `tipo`: `VARCHAR` (A = Agendada, R = Realizada, C = Cancelada, F = Feriado, default: A)
*   `cor`: `VARCHAR` (Código Hex de identificação)
*   `observacao`: `TEXT` (Observações em formato HTML/Rich Text)

---

## Observabilidade

*   **Logs SQL de Lançamento:** A tabela `agendamento` registra históricos de inserção/update na tabela de auditoria `bjsoft18_log.sql` por transação do usuário, capturando o IP e a classe chamadora (ex: `AgendaCalendarForm` ou `AgendamentoCalendarioForm`).

---

## Riscos e Lacunas

*   🔴 **Integração com Ordem de Serviço:** O redirecionamento estático do botão de OS invoca `OrdemServicoDocument`. Esta classe e a tabela associada ao documento de OS estão fora do escopo do MVP acordado. Portanto, na nova stack, o botão de OS no calendário/listagem servirá apenas como um *placeholder* (ex: exibindo popover com aviso "Módulo em migração") até que o módulo de faturamento de OS seja implementado.
*   🟡 **Falta de Validação de Choque de Horários:** O código legado não valida se um profissional já possui outro atendimento agendado no mesmo intervalo de horário, permitindo sobreposição de agendas (choque de horários). Isso foi considerado um comportamento aceito (ou ignorado) no legado, mas é um ponto de atenção para melhoria na stack moderna.
