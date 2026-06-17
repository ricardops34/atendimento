# Agendamentos, Tarefas de Implementação

## Pré-requisitos
- [ ] Módulo de Cadastros de Apoio (Empresa, Profissional, Contrato) concluído e disponível.
- [ ] Schema de banco PostgreSQL atualizado.
- [ ] Biblioteca de calendário integrada ao Angular configurada no frontend.

## Tarefas

### Modelagem de Dados
*   [ ] **T-01: Modelagem da Entidade Appointment**
    *   **Descrição:** Criar o modelo `Appointment` (Agendamento) no arquivo `schema.prisma` mapeando chaves estrangeiras com `Contract` e `Professional`, indexando campos de data e adicionando o campo `tenantId`.
    *   **Origem no legado:**
        *   [Agendamento.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Agendamento.php)
    *   **Critério de pronto:** Modelo mapeado no Prisma e migration executada com sucesso.
    *   **Confiança:** 🟢 CONFIRMADO

### Backend (APIs e Regras)
*   [ ] **T-02: API de Eventos do Calendário**
    *   **Descrição:** Criar endpoint `GET /appointments/events` que aceita os query params `start` e `end` (datas) e retorna os agendamentos no período em formato JSON simplificado para renderização no calendário.
    *   **Origem no legado:**
        *   [AgendamentoCalendarioFormView.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioFormView.php) (método `getEvents()`)
    *   **Critério de pronto:** Endpoint retorna a listagem filtrada por data e isolada pelo `tenantId` da sessão.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-03: API de Criação e Atualização de Agendamento**
    *   **Descrição:** Criar endpoints REST `POST /appointments` e `PUT /appointments/:id` para agendamentos. No backend, calcular automaticamente a duração líquida formatada como string `H:i` (excluindo os intervalos) e derivar os datetimes técnicos (`startDateTime` e `endDateTime`).
    *   **Origem no legado:**
        *   [AgendamentoCalendarioForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php) (`onSave`)
    *   **Critério de pronto:** Ao salvar, os datetimes de banco e o campo `totalTime` (duração líquida) são gerados no backend, e novos registros recebem `activityStatus = 'A'` (Agendada) por padrão.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-04: API para Confirmação de Atendimento**
    *   **Descrição:** Criar endpoint `PATCH /appointments/:id/confirm` que altera o status do agendamento para `R` (Realizada).
    *   **Origem no legado:**
        *   [AgendamentoCalendarioForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php) (`onConfirmar`)
    *   **Critério de pronto:** O endpoint deve buscar o registro atual no banco e validar se o status em banco é igual a `A` (Agendada). Se for diferente de `A` (como cancelado ou feriado), rejeita a operação com erro HTTP `400 Bad Request` ou `422 Unprocessable Entity`.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-05: API de Listagem de Agendamentos (Grid)**
    *   **Descrição:** Criar endpoint `GET /appointments` que retorna uma lista paginada de agendamentos, suportando filtros opcionais por `contractId`, `professionalId`, `dateFrom` e `dateTo`.
    *   **Origem no legado:**
        *   [AgendamentoList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoList.php)
    *   **Critério de pronto:** Retorno paginado, isolando dados por tenant.
    *   **Confiança:** 🟢 CONFIRMADO

### Frontend (Telas PO-UI)
*   [ ] **T-06: Tela de Calendário Interativo**
    *   **Descrição:** Criar a página de calendário semanal/mensal utilizando um componente de calendário Angular embutido no layout principal do PO-UI.
    *   **Critério de pronto:** Tela carrega os eventos da API coloridos de acordo com o contrato e reage a cliques em dias e eventos.
    *   **Confiança:** 🟡 INFERIDO

*   [ ] **T-07: Formulário Lateral de Lançamento**
    *   **Descrição:** Criar o painel lateral deslizante (`po-page-slide`) para inclusão, edição, exclusão e confirmação de agendamentos. Incluir um editor rich text (`po-rich-text`) para o campo `Observações`.
    *   **Critério de pronto:** Formulário integrado com as APIs de persistência e confirmação, atualizando o calendário após salvar.
    *   **Confiança:** 🟡 INFERIDO

*   [ ] **T-08: Grade de Listagem de Agendamentos**
    *   **Descrição:** Criar a tela de listagem tabular (`po-page-list` e `po-table`) exibindo colunas de data, modalidade, duração líquida e observações.
    *   **Critério de pronto:** Exibe tabela paginada com ações por linha (como botão placeholder de OS) e um painel lateral de busca avançada filtrando por profissional e período.
    *   **Confiança:** 🟡 INFERIDO

---

## Tarefas de Teste

*   [ ] **TT-01: Teste Unitário de Cálculo de Tempo Líquido**
    *   **Critério de pronto:** Teste unitário do backend fornecendo datas e intervalos e validando o resultado líquido:
        *   Início 08:00, Fim 17:00, Intervalo 11:30 a 13:00 ➔ Retorno esperado: `07:30` (Líquido).
        *   Início 09:00, Fim 12:00, Sem Intervalo (00:00) ➔ Retorno esperado: `03:00`.
*   [ ] **TT-02: Teste de Validação de Confirmação**
    *   **Critério de pronto:** Teste de integração chamando a rota `/confirm` em um agendamento com status `R` e validando o bloqueio com código HTTP `400`.
*   [ ] **TT-03: Teste de Filtro de Período**
    *   **Critério de pronto:** Consultar a API de listagem enviando intervalo de datas que não contém registros e validar retorno de lista vazia.

---

## Tarefas de Migração de Dados

*   [ ] **TM-01: Importação Histórica de Agendamentos**
    *   **Descrição:** Script para importar os agendamentos cadastrados na tabela `agendamento` do dump [bjsoft18_portal.sql](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/backup/bjsoft18_portal.sql) para a tabela PostgreSQL, remapeando chaves estrangeiras de contrato e profissional e definindo o tenant padrão.
    *   **Critério de pronto:** Carga concluída sem falhas de integridade referencial.

---

## Ordem Sugerida
1.  **T-01 (Prisma Model):** Mapeamento do banco.
2.  **T-02, T-03, T-04, T-05 (Backend APIs):** Desenvolvimento de regras e endpoints (com cobertura de testes unitários).
3.  **TM-01 (Migração):** Carga dos dados de teste históricos.
4.  **T-06, T-07, T-08 (Frontend):** Desenvolvimento das páginas em Angular com PO-UI integrando com as rotas REST do backend.

---

## Lacunas Pendentes (🔴)
*   🔴 **Placeholder de Emissão de OS:** Como o faturamento e visualização da OS original não constam no escopo do MVP, a ação de emissão de OS na linha da listagem e no formulário lateral será implementada como um link desativado ou exibindo uma caixa de diálogo (`po-dialog-service`) indicando que o faturamento de OS ainda será migrado em fases futuras.
