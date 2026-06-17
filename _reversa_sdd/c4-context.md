# C4 Context Diagram — atendimento

Este documento apresenta o diagrama C4 de Contexto (Nível 1) para o sistema de atendimento, representando os usuários, limites do sistema e suas dependências externas sob o escopo das rotinas selecionadas.

```mermaid
C4Context
    title Diagrama de Contexto de Sistema (Nível 1) — Sistema de Atendimento

    Person(usuario, "Usuário do Sistema", "Profissional ou Administrador que gerencia agendas e atendimentos.")
    System(sistema_atendimento, "Sistema de Atendimento", "Portal de agendamento de atendimentos operacionais e controle de cadastros de apoio.")

    SystemDb(banco_dados, "Banco de Dados (consultor)", "Banco de dados relacional MySQL (ou SQLite local) contendo os cadastros e os apontamentos de agenda.")
    System(sistema_os, "Gerador de OS (OrdemServicoDocument)", "Mecanismo legado de geração e exportação de Ordens de Serviço.")

    Rel(usuario, sistema_atendimento, "Visualiza calendário, gerencia agendamentos, contratos e profissionais", "HTTP/Web")
    Rel(sistema_atendimento, banco_dados, "Lê e grava dados de Empresas, Profissionais, Contratos e Agendamentos", "SQL")
    Rel(sistema_atendimento, sistema_os, "Redireciona para geração do documento PDF da OS", "PHP / HTTP GET")
```

---

## 🟢 Escala de Confiança do Contexto Mapeado
*   **Atores e Papéis:** 🟢 **CONFIRMADO** — Extraído dos arquivos de visualização e controle da agenda.
*   **Integração com Banco de Dados:** 🟢 **CONFIRMADO** — Conexões explícitas com o banco `consultor` usando as ActiveRecords `Agendamento`, `Contrato`, `Profissional` e `Empresa`.
*   **Integração com Emissor de OS:** 🟢 **CONFIRMADO** — Chamadas para a classe `OrdemServicoDocument` passando o ID do agendamento sob o parâmetro `key`.
