# Dicionário de Domínio e Regras de Negócio — atendimento

Este documento descreve o modelo de domínio do sistema legado de atendimento, contendo o glossário de termos e as regras de negócio core identificadas durante a engenharia reversa.

---

## 📖 Glossário de Termos

### 1. Agendamento
*   **Definição:** Lançamento de um atendimento ou compromisso alocado na agenda de um profissional. Representa um bloco de tempo em uma data específica.
*   **Status de Atendimento (`tipo`):**
    *   `A` (Agendado): Atendimento reservado na agenda, aguardando execução.
    *   `R` (Realizado): Atendimento já confirmado e concluído.
    *   `C` (Cancelado): Atendimento desmarcado.
    *   `F` (Feriado): Registro automático indicando que o dia possui bloqueio de feriado.
*   **Modalidade (`local`):**
    *   `P` (Presencial): Atendimento físico no local do cliente.
    *   `R` (Remoto): Atendimento à distância.
    *   `F` (Falta): Indica o não comparecimento ou ausência do atendimento na data.

### 2. Contrato
*   **Definição:** Regras comerciais acertadas entre a prestadora de serviços e o cliente (Empresa). Possui vigência definida (`dt_inicio` e `dt_fim`) e parametrização visual (como uma cor hexadecimal específica usada para colorir seus agendamentos correspondentes na tela de calendário).

### 3. Contrato Item (Escala Semanal)
*   **Definição:** Configuração de escala recorrente de atendimento associada a um Contrato. Define em quais dias da semana (`dia_semana`), horários (`hora_inicio` e `hora_final`) e intervalos (`intervalo_ini` e `intervalo_fim`) um profissional específico (`profissional_id`) prestará atendimento.

### 4. Realizado (Atendimento Faturado)
*   **Definição:** Registro gerado após a execução real de um atendimento. Armazena a duração líquida computada em formato numérico decimal (`horas`) e serve como insumo direto para faturamento/cobrança de horas trabalhadas. É sempre vinculado a um `Agendamento` de origem.

### 5. Feriado
*   **Definição:** Datas cadastradas administrativamente que interrompem o agendamento regular do profissional e criam apontamentos automatizados de folga/feriado com cor e contrato padrão de sistema.

---

## ⚙️ Regras de Negócio Core

### RN01 — Geração de Agendamentos em Lote (Escala Contratual)
*   **Descrição:** O sistema automatiza a criação da agenda de atendimentos baseando-se no cruzamento de contratos ativos e na escala semanal de cada profissional (`contrato_item`).
*   **Lógica de Execução:**
    1.  O processo é disparado por um intervalo de datas (`DataDe` até `DataAte`).
    2.  O sistema identifica contratos vigentes no período (`dt_inicio <= DataDe` e `dt_fim >= DataAte`).
    3.  Para cada dia do período selecionado:
        *   Se a data coincidir com um registro na tabela `Feriado`, o sistema ignora a escala contratual daquela data e cria um agendamento do tipo `F` (Feriado), com cor vermelha (`#f42b06`) associado a um Contrato de Sistema padrão (`contrato_id = 4`).
        *   Caso contrário (dia útil/não feriado), o sistema busca itens de escala (`contrato_item`) correspondentes ao dia da semana (0 a 6).
        *   Para cada escala ativa, cria-se um agendamento com `tipo = 'A'` (Agendada), a menos que já exista um registro com os mesmos dados de data, profissional, contrato e horários.
*   **Confiança:** 🟢 **CONFIRMADO** — Extraído da classe [GerarApontamento.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/GerarApontamento.php).

### RN02 — Fechamento/Faturamento de Atendimentos em Lote (Realizados)
*   **Descrição:** O fechamento e faturamento de horas dos atendimentos são executados convertendo agendamentos do tipo `A` (Agendada) em registros definitivos de faturamento na tabela `Realizado`.
*   **Lógica de Execução:**
    1.  O fechamento é executado especificando um período de datas e opcionalmente um profissional.
    2.  Para cada agendamento do tipo `A` (Agendado) compreendido no período:
        *   Muda o status do agendamento original para `R` (Realizada).
        *   Calcula o total de horas líquidas em formato numérico decimal (`horas_totais - horas_intervalo`).
        *   Gera uma entrada correspondente na tabela `Realizado`, gravando o tempo decimal calculado e vinculando-o ao `agendamento_id` original.
*   **Confiança:** 🟢 **CONFIRMADO** — Extraído da lógica operacional da classe [ConfirmarApontamento.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/ConfirmarApontamento.php).

### RN03 — Cálculo de Horas Líquidas
*   **Descrição:** Todo atendimento ou fechamento deve deduzir o tempo de descanso/almoço configurado do tempo de trabalho bruto.
*   **Cálculo Textual (Agendamento):**
    *   $\text{Duração Total} = \text{hora\_fim} - \text{hora\_inicio}$
    *   $\text{Duração Intervalo} = \text{hora\_intervalo\_final} - \text{hora\_intervalo\_inicial}$
    *   $\text{Duração Líquida} = \text{Duração Total} - \text{Duração Intervalo}$ (gravada como texto no formato `hh:ii`).
*   **Cálculo Decimal (Realizado):**
    *   As durações bruta e de intervalo são convertidas para horas decimais usando o timestamp correspondente.
    *   $\text{Horas Decimais} = \text{Duração Bruta (Horas)} - \text{Duração Intervalo (Horas)}$ (arredondado para 2 casas decimais).
*   **Confiança:** 🟢 **CONFIRMADO** — Extraído de [AgendamentoCalendarioForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php) and [ConfirmarApontamento.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/ConfirmarApontamento.php).

### RN04 — Imutabilidade de Atendimentos Concluídos
*   **Descrição:** Uma vez que o agendamento foi alterado para o status `R` (Realizado) ou `C` (Cancelado), qualquer operação de edição, salvamento manual ou re-confirmação é bloqueada.
*   **Validação:** A tela de calendário verifica se `$agendamento->tipo <> 'A'`. Se a condição for verdadeira, rejeita as alterações salvando o estado original e emitindo mensagem de aviso de que o registro não pode ser modificado.
*   **Confiança:** 🟢 **CONFIRMADO** — Extraído das ações de salvamento e confirmação em [AgendamentoCalendarioForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php).

### RN05 — Re-Preenchimento Assíncrono do Agendamento (Herança de Contrato)
*   **Descrição:** Ao vincular um contrato a um agendamento no calendário, a interface busca no banco de dados a cor visual (`cor`) e a descrição cadastrada do contrato (`descricao`) e os atribui automaticamente ao novo registro.
*   **Confiança:** 🟢 **CONFIRMADO** — Extraído do manipulador de eventos `OnChangeContrato` em [AgendamentoCalendarioForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php).
