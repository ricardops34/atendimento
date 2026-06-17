# Plano de Exploração — atendimento

> Criado pelo Reversa em 2026-06-17
> Marque cada tarefa com ✅ quando concluída.
> Você pode editar este plano antes de iniciar: adicione, remova ou reordene tarefas conforme necessário.

---

## Fase 1: Reconhecimento 🔍

- [x] **Scout** — Mapeamento de estrutura de pastas e tecnologias
- [x] **Scout** — Análise de dependências e gerenciadores de pacotes
- [x] **Scout** — Identificação de entry points, CI/CD e configurações

## Decisão de organização das specs 🗂️

> Entre o Scout e o Arqueólogo, o Reversa pergunta como você quer organizar as specs (por módulo, caso de uso, endpoint, híbrida, por features ou customizada). A escolha fica persistida em `.reversa/config.toml` na seção `[specs]` e não será reperguntada em execuções futuras. Para reapresentar o menu, remova manualmente a seção.

## Fase 2: Escavação 🏗️

- [x] **Arqueólogo** — Análise do módulo `servicos`
- [x] **Arqueólogo** — Análise do módulo `cadastros_basicos`

## Fase 3: Interpretação 🧠

- [x] **Detetive** — Arqueologia Git e ADRs retroativos
- [x] **Detetive** — Regras de negócio implícitas e máquinas de estado
- [x] **Detetive** — Matriz de permissões (RBAC/ACL)
- [x] **Arquiteto** — Diagramas C4 (Contexto, Containers, Componentes)
- [x] **Arquiteto** — ERD completo e integrações externas
- [x] **Arquiteto** — Spec Impact Matrix

## Fase 4: Geração 📝

- [x] **Redator** — Specs da Unit `cadastros-apoio` (Contrato, Profissional, Empresa)
- [x] **Redator** — Specs da Unit `agendamentos` (AgendamentoList, AgendamentoCalendarioForm)

## Fase 5: Revisão ✅

- [x] **Revisor** — Revisão cruzada das specs (cadastros-apoio e agendamentos)
- [x] **Revisor** — Resolução de lacunas com o usuário
- [x] **Revisor** — Relatório de confiança final

---

## Escopo do MVP (Anotado) 📌

> Apenas as rotinas e cadastros selecionados abaixo serão portados e documentados. Os demais foram removidos do escopo ativo.

*   **AgendamentoList** (Listagem/Grid de agendamentos com filtros e exportação)
*   **AgendamentoCalendarioForm** (Formulário de inclusão, edição, exclusão e confirmação de agendamento)
*   **Contrato** (Cadastro de contratos e regras comerciais)
*   **Profissional** (Cadastro de profissionais executores)
*   **Empresa** (Cadastro de empresas parceiras/clientes)

---

## Agentes Independentes (Fora do Escopo) 🚫

- [x] **Visor** — (Pulado/Integrado nas specs visuais via prints de telas)
- [x] **Data Master** — (Pulado/Integrado no mapeamento do banco em architecture.md)
- [x] **Design System** — (Descartado)
- [x] **Tracer** — (Descartado)

---

## Próximo passo

Após o Time de Descoberta concluir e o `_reversa_sdd/` estar populado, você pode disparar um dos fluxos seguintes:

- `/reversa-migrate`: orquestrador do **Time de Migração** (Paradigm Advisor → Curator → Strategist → Designer → Screen Translator → Inspector). Gera as specs do sistema novo. Saída em `_reversa_sdd/migration/` e `_reversa_sdd/screens/`.
- `/reversa-reconstructor`: gera plano bottom-up para reimplementar o software a partir das specs do legado (uma tarefa por sessão).
