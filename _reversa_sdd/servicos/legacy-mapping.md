# Legacy Mapping — Módulo servicos

Mapeamento de arquivos físicos e estruturas do código fonte legado (PHP/Adianti) que compõem a lógica de serviços e agendamentos.

---

## 📂 Arquivos de Controle (Controladores/Telas)

| Caminho do Arquivo | Tipo | Descrição |
| :--- | :---: | :--- |
| [AgendamentoCalendarioForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php) | Classe | Formulário lateral (Right Panel) para criação, edição, exclusão, confirmação e geração de OS para um agendamento. |
| [AgendamentoCalendarioFormView.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioFormView.php) | Classe | Tela principal com o calendário FullCalendar. Aciona o formulário lateral. |
| [AgendamentoList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoList.php) | Classe | Grid de listagem de agendamentos com filtros laterais (Contrato, Profissional, Período), totalizadores e exportação. |
| [ConfirmarApontamento.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/ConfirmarApontamento.php) | Classe | Ação auxiliar para alteração de status/tipo do apontamento. |
| [ContratoForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/ContratoForm.php) | Classe | Formulário de criação/edição de contratos. |
| [ContratoList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/ContratoList.php) | Classe | Listagem de contratos. |
| [GerarApontamento.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/GerarApontamento.php) | Classe | Processamento automático de geração de lançamentos de apontamentos. |
| [RealizadoForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/RealizadoForm.php) | Classe | Formulário de controle de atendimentos já realizados. |
| [RealizadoList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/RealizadoList.php) | Classe | Listagem de atividades realizadas. |

---

## 🗄️ Arquivos de Modelo (Active Record)

| Caminho do Arquivo | Tabela Banco | Descrição |
| :--- | :---: | :--- |
| [Agendamento.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Agendamento.php) | `agendamento` | Modelo que representa o lançamento de agendamento. Contém os relacionamentos `belongsTo` com `Contrato` e `Profissional`. |
| [Contrato.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Contrato.php) | `contrato` | Modelo representativo dos contratos. Contém cor padrão e descrição padrão herdados pelos agendamentos. |
| [ContratoItem.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/ContratoItem.php) | `contrato_item` | Itens e cláusulas vinculadas aos contratos. |
| [ContratoProfissional.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/ContratoProfissional.php) | `contrato_profissional` | Tabela de relacionamento entre Contratos e Profissionais autorizados. |
| [Realizado.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Realizado.php) | `realizado` | Modelo de banco de dados para a consolidação de horas realizadas. |

---

## ⚡ Regras de Negócio e Linhas de Código Relevantes

### 1. Derivação de Datas (horario_inicial / horario_final)
* **Arquivo:** [AgendamentoCalendarioForm.php:271-278](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L271-L278)
* **Lógica:** Concatenação de `$data_agenda` + `$hora_inicio` (e `$hora_fim`) antes de salvar no banco de dados.

### 2. Cálculo da Hora Total
* **Arquivo:** [AgendamentoCalendarioForm.php:187-189](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L187-L189) (no `onExitHoraFim`) e [linhas 285-288](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L285-L288) (no `onSave`).
* **Lógica:** `$totalMinutos = (hora_fim - hora_inicio) - (hora_intervalo_final - hora_intervalo_inicial)`.

### 3. Restrição de Confirmação
* **Arquivo:** [AgendamentoCalendarioForm.php:385-390](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L385-L390) (no `onConfirmar`).
* **Lógica:** Impede a confirmação ou alteração se o tipo (status) atual for diferente de `'A'` (Agendada).

### 4. Cópia de Parâmetros do Contrato (Cor / Descrição)
* **Arquivo:** [AgendamentoCalendarioForm.php:228-235](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L228-L235) (no `OnChangeContrato`).
* **Lógica:** Ao selecionar um contrato, a tela puxa via Ajax/ActiveRecord a cor hexadecimal e a descrição padrão daquele contrato e injeta nos campos correspondentes do agendamento.
