# Análise de Código Consolidada — atendimento

Este documento consolida as análises técnicas realizadas pelo **Archaeologist** sobre o código legado do módulo de `servicos` e `cadastros_basicos` de forma simplificada e focada, atendendo ao nível de documentação **Essencial**.

---

## 🗺️ Fluxos de Controle das Rotinas (Descritos em Texto)

### 1. Inclusão de Novo Agendamento (`AgendamentoCalendarioForm::onSave`)
1. **Validação:** O formulário valida que a descrição (`descricao`), o horário inicial (`hora_inicio`) e o horário final (`hora_fim`) estejam preenchidos.
2. **Derivação de Datas:** Concatena a data escolhida (`data_agenda`) com os horários de início e fim para montar os campos técnicos `horario_inicial` e `horario_final` no formato `yyyy-mm-dd hh:ii`.
3. **Cálculo da Duração Líquida:**
   * Calcula o período total (`hora_fim` - `hora_inicio`).
   * Calcula o período do intervalo de descanso (`hora_intervalo_final` - `hora_intervalo_inicial`).
   * Subtrai o intervalo do período total para obter a duração líquida e grava no campo `hora_total`.
4. **Valores Padrão:** Se o status (`tipo`) estiver vazio, grava como `'A'` (Agendada). O campo `local` padrão é `'P'` (Presencial).
5. **Persistência:** Salva no banco de dados `consultor` e dispara um script client-side para fechar a cortina lateral e recarregar a visualização da agenda (`TFullCalendar`).

### 2. Confirmação do Atendimento (`AgendamentoCalendarioForm::onConfirmar`)
1. **Validação de Status Original:** Verifica se o agendamento atual possui status (`tipo`) igual a `'A'` (Agendada). Caso contrário, bloqueia a operação emitindo uma mensagem de erro ("Registro não pode ser alterado").
2. **Recálculo de Parâmetros:** Executa a mesma derivação de datas e cálculo de tempo total líquido do fluxo de salvamento.
3. **Alteração de Status:** Altera o status (`tipo`) para `'R'` (Realizada).
4. **Persistência:** Grava as alterações no banco de dados e atualiza a interface.

### 3. Exclusão de Agendamento (`AgendamentoCalendarioForm::onDelete`)
1. **Confirmação Visual:** Apresenta uma caixa de pergunta do Adianti (`TQuestion`) pedindo confirmação de exclusão para o usuário.
2. **Exclusão Física:** Remove fisicamente o registro correspondente à chave primária (`id`) da tabela `agendamento`.
3. **Sincronização:** Recarrega o calendário e fecha a interface lateral.

### 4. Integração com Ordem de Serviço (`AgendamentoCalendarioForm::onOrdem` e `AgendamentoList` OS)
1. **Redirecionamento:** Fecha o painel lateral de agendamento (se acionado de dentro dele) e carrega a tela `OrdemServicoDocument` chamando o método estático `onGenerate`.
2. **Parâmetro de Entrada:** Passa o ID do agendamento sob o parâmetro `key` para que o relatório seja gerado com base naquele apontamento específico.

---

## 🔬 Algoritmos e Regras de Negócio Core

### Algoritmo de Cálculo de Tempo Total Líquido
* **Objetivo:** Computar a quantidade de horas e minutos de trabalho reais, descontando o intervalo de almoço/descanso.
* **Fórmula Implementada:**
  $$\text{Duração Total} = \text{hora\_fim} - \text{hora\_inicio}$$
  $$\text{Duração Intervalo} = \text{hora\_intervalo\_final} - \text{hora\_intervalo\_inicial}$$
  $$\text{Tempo Total Líquido} = \text{Duração Total} - \text{Duração Intervalo}$$
* **Implementação Técnica (PHP):**
  ```php
  $hora   = gmdate('H:i', strtotime($hora_fim) - strtotime($hora_inicio));
  $inter  = gmdate('H:i', strtotime($hora_intervalo_final) - strtotime($hora_intervalo_inicial));
  $total  = gmdate('H:i', strtotime($hora) - strtotime($inter));
  ```

### Herança de Propriedades do Contrato (Ajax OnChange)
* **Objetivo:** Facilitar o preenchimento e manter a consistência visual no calendário de acordo com o contrato corporativo.
* **Lógica:** Ao selecionar ou mudar o combo de `contrato_id` na tela, o sistema faz uma requisição assíncrona ao banco, recupera as propriedades do modelo `Contrato` associado e preenche o formulário:
  * **Cor Hexadecimal:** Herda `$contrato->cor` (para colorir o evento no calendário).
  * **Descrição do Apontamento:** Preenche por padrão com a descrição do contrato `$contrato->descricao`.

---

## 🗄️ Dicionário de Dados Resumido (Tabelas do Core)

Abaixo estão os esquemas das tabelas do banco de dados `consultor` relevantes para as rotinas de agendamento (extraídos das classes ActiveRecord em `model/` e DDLs):

### Tabela: `agendamento`
Mapeia os lançamentos de atendimentos e compromissos na agenda.

| Coluna | Tipo Legado | Requerido | Descrição |
| :--- | :--- | :---: | :--- |
| `id` | `INTEGER` | Sim | Chave primária autoincremento (Serial). |
| `contrato_id` | `INTEGER` | Não | FK para a tabela de contratos (`contrato.id`). |
| `profissional_id` | `INTEGER` | Não | FK para o profissional executor (`profissional.id`). |
| `descricao` | `VARCHAR` | Sim | Texto livre resumindo o escopo do atendimento. |
| `horario_inicial` | `DATETIME` | Sim | Data e hora de início combinado (derivado). |
| `horario_final` | `DATETIME` | Sim | Data e hora de término combinado (derivado). |
| `cor` | `VARCHAR` | Não | Código hexadecimal de cor para exibição no calendário. |
| `observacao` | `TEXT` | Não | Descrição rica em formato HTML contendo o andamento/notas. |
| `tipo` | `VARCHAR` | Sim | Status da atividade: `A` (Agendada), `R` (Realizada), `C` (Cancelada), `F` (Feriado). |
| `data_agenda` | `DATE` | Sim | Data-base do agendamento. |
| `hora_inicio` | `VARCHAR` | Sim | Horário de início informado pelo usuário (`hh:ii`). |
| `hora_fim` | `VARCHAR` | Sim | Horário de término informado pelo usuário (`hh:ii`). |
| `hora_intervalo_inicial`| `VARCHAR`| Não | Início do intervalo de almoço/descanso (`hh:ii`, default: `00:00`). |
| `hora_intervalo_final`| `VARCHAR` | Não | Término do intervalo de almoço/descanso (`hh:ii`, default: `00:00`). |
| `hora_total` | `VARCHAR` | Não | Tempo líquido de atendimento (`hh:ii`, calculado). |
| `local` | `VARCHAR` | Sim | Localidade: `P` (Presencial), `R` (Remoto), `F` (Falta). |

### Tabela: `contrato`
Mapeia as regras e parâmetros comerciais acordados com os clientes (empresas).

| Coluna | Tipo Legado | Requerido | Descrição |
| :--- | :--- | :---: | :--- |
| `id` | `INTEGER` | Sim | Chave primária. |
| `empresa_id` | `INTEGER` | Sim | FK para a tabela de empresas (`empresa.id`). |
| `descricao` | `VARCHAR` | Sim | Descrição curta de identificação do contrato. |
| `cor` | `VARCHAR` | Não | Código hexadecimal que identifica o contrato visualmente. |

### Tabela: `profissional`
Cadastro de prestadores de serviços de atendimento.

| Coluna | Tipo Legado | Requerido | Descrição |
| :--- | :--- | :---: | :--- |
| `id` | `INTEGER` | Sim | Chave primária. |
| `nome` | `VARCHAR` | Sim | Nome completo do profissional. |

### Tabela: `empresa`
Cadastro de empresas (clientes corporativos) atendidas.

| Coluna | Tipo Legado | Requerido | Descrição |
| :--- | :--- | :---: | :--- |
| `id` | `INTEGER` | Sim | Chave primária. |
| `nome` | `VARCHAR` | Sim | Nome fantasia ou razão social da empresa. |

---

## 🟢 Escala de Confiança das Regras Analisadas

* **Cálculo do tempo líquido total:** 🟢 **CONFIRMADO** — extraído diretamente da lógica matemática do PHP em `AgendamentoCalendarioForm.php`.
* **Regra de bloqueio da confirmação:** 🟢 **CONFIRMADO** — verificado explicitamente no condicional `$object->tipo <> 'A'` em `onConfirmar`.
* **Origem da cor hexadecimal e descrição:** 🟢 **CONFIRMADO** — extraído da consulta em `OnChangeContrato`.
* **Mapeamento de banco de dados:** 🟢 **CONFIRMADO** — extraído diretamente das definições de Active Record (`TRecord`) do Adianti.
* **Ausência do modelo de permissões antigo:** 🟢 **CONFIRMADO** — o usuário explicitamente deliberou que a parte de permissão antiga baseada em `system_*` será descartada no MVP em favor do modelo unificado por tenant/perfil/módulo.
