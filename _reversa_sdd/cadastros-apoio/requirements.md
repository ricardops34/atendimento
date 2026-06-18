# Cadastros de Apoio (Empresa, Profissional e Contrato)

## Visão Geral
Esta unit gerencia os cadastros estruturais básicos do sistema: Empresas (Clientes), Profissionais (Prestadores de Serviço) e Contratos Comerciais. Esses dados servem como base obrigatória para a criação e parametrização dos agendamentos no calendário.

## Responsabilidades
*   Manter o cadastro de Empresas parceiras com endereço e cor de identificação na agenda. 🟢
*   Manter o cadastro de Profissionais habilitados, cada um vinculado a um usuário do sistema. 🟢
*   Manter o cadastro de Contratos vinculados às empresas, com vigência, tipo de faturamento, profissionais habilitados e escala semanal. 🟢

## Regras de Negócio

*   **RN01 — Vinculação Obrigatória de Empresa em Contrato:** Todo contrato deve ser obrigatoriamente associado a uma empresa cliente (`empresa_id`). 🟢
*   **RN02 — Identificação Visual de Contrato (Cor):** O cadastro de Contrato permite associar uma cor hexadecimal (`cor`). Essa cor é herdada e usada para pintar os agendamentos vinculados a esse contrato no calendário. Default `#333333`. 🟢
*   **RN03 — Validação de Campos Obrigatórios:**
    *   Empresa exige: `nome`. 🟢
    *   Profissional exige: `nome`, `user_id` (usuário do sistema). 🟢
    *   Contrato exige: `descricao`, `empresa_id`, `dt_inicio`, `dt_fim`, `tipo`. 🟢
*   **RN04 — Tipo de Contrato:** O campo `tipo` aceita apenas `F` (Fixo) ou `H` (Hora). Quando `tipo = F`, `valor_fixo` é relevante; quando `tipo = H`, `valor_hora` é relevante. 🟢
*   **RN05 — Profissionais Habilitados no Contrato:** Um contrato pode ter múltiplos profissionais habilitados (many-to-many via `contrato_profissional`). O conjunto define quem pode ser agendado nesse contrato. 🟢
*   **RN06 — Escala Semanal (ContratoItem):** Um contrato possui uma escala de itens por dia da semana (0=Domingo a 6=Sábado), com profissional, hora inicial, intervalo e hora final. Ao selecionar o dia, o sistema preenche automaticamente os horários padrão (08:30 / 11:30 / 13:00 / 18:00). 🟢
*   **RN07 — Cor da Empresa na Agenda:** O cadastro de Empresa possui campo `cor` (hex) opcional, que pode servir como cor alternativa de identificação visual quando o contrato não tiver cor definida. 🟢
*   **RN08 — Bloqueio de Exclusão em Cascata:** A exclusão de uma empresa é bloqueada se houver contratos vinculados (FK ON DELETE RESTRICT). 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|-----------|-------------------|
| RF-01 | Cadastro de Empresas | Must | Incluir, editar, listar e excluir empresas. Campos: `nome` (obrigatório), `razao`, `cor`, `endereco`, `cidade`, `estado`. Exclusão bloqueada se possuir contratos. |
| RF-02 | Cadastro de Profissionais | Must | Incluir, editar, listar e excluir profissionais. Campos: `nome` (obrigatório), `user_id` (obrigatório — vínculo com usuário do sistema). |
| RF-03 | Cadastro de Contratos | Must | Incluir, editar, listar e excluir contratos. Campos: `empresa_id`, `descricao`, `cor`, `dt_inicio`, `dt_fim`, `tipo`, `valor_hora`, `valor_fixo`. Multi-select de profissionais habilitados. Escala semanal (master-detail de ContratoItem). |
| RF-04 | Escala semanal (ContratoItem) | Must | Adicionar, editar e remover linhas de escala por dia da semana dentro do formulário de Contrato. Ao selecionar o dia, preencher automaticamente horários padrão. |
| RF-05 | Filtros na listagem de Contratos | Must | Filtrar por empresa, tipo de contrato, data de início e data de fim. |
| RF-06 | Filtros na listagem de Empresas | Must | Filtrar por id e nome. Exportar CSV. |

## Requisitos Não Funcionais

| Tipo | Requisito | Evidência | Confiança |
|------|-----------|-----------|-----------|
| Segurança | Autenticação obrigatória e isolamento de dados por Tenant | `EmpresaForm.php`, `ContratoForm.php` | 🟡 |
| Integridade | Bloqueio de exclusão em cascata (FK Constraints) | DDL SQL das tabelas `contrato` e `agendamento` | 🟢 |
| Validação | Sanitizar cor hexadecimal antes de salvar (regex `/^#[0-9A-F]{6}$/i`) | `confidence-report.md` | 🟢 |

## Critérios de Aceitação

```gherkin
Cenário: Cadastro de Contrato válido com escala
  Dado que o usuário está autenticado e no formulário de Contrato
  Quando preenche empresa, descrição "Contrato TI", cor "#4CAF50", dt_inicio "01/01/2026", dt_fim "31/12/2026", tipo "Fixo", valor_fixo 5000
  E adiciona 2 profissionais habilitados no multi-select
  E adiciona 1 item de escala (Segunda-feira, 08:30–18:00)
  E clica em Salvar
  Então o sistema persiste o contrato com ID gerado, os vínculos de profissionais e os itens de escala

Cenário: Tentativa de cadastro de Contrato sem Empresa
  Dado que o usuário está no formulário de Contrato
  Quando preenche descrição mas deixa Empresa em branco e clica em Salvar
  Então o sistema bloqueia e exibe mensagem de validação obrigatória

Cenário: Tentativa de cadastro de Contrato sem datas
  Dado que o usuário está no formulário de Contrato
  Quando preenche empresa e descrição mas não preenche dt_inicio ou dt_fim e clica em Salvar
  Então o sistema bloqueia e exibe mensagem de validação obrigatória

Cenário: Cadastro de Profissional com vínculo de usuário
  Dado que o usuário está no formulário de Profissional
  Quando preenche nome e seleciona um usuário do sistema no combo
  E clica em Salvar
  Então o sistema persiste o profissional com o vínculo de usuário

Cenário: Auto-preenchimento de horário ao selecionar dia da semana
  Dado que o usuário está na seção de escala do formulário de Contrato
  Quando seleciona "Segunda-Feira" no combo de Dia da Semana
  Então os campos hora_inicio, intervalo_ini, intervalo_fim, hora_final são preenchidos automaticamente com 08:30, 11:30, 13:00, 18:00
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Cadastro de Empresas | Must | Requisito obrigatório para criação de Contratos. |
| Cadastro de Contratos | Must | Requisito obrigatório para agendamentos e calendário. |
| Cadastro de Profissionais | Must | Requisito obrigatório para alocação de agenda. |
| Escala semanal (ContratoItem) | Must | Base para sugestão de horários no agendamento. |
| Filtros nas listagens | Must | Paridade funcional com o legado. |

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `antigo/app/control/cadastros_basicos/EmpresaForm.php` | `EmpresaForm` | 🟢 |
| `antigo/app/control/cadastros_basicos/EmpresaList.php` | `EmpresaList` | 🟢 |
| `antigo/app/control/cadastros_basicos/ProfissionalForm.php` | `ProfissionalForm` | 🟢 |
| `antigo/app/control/cadastros_basicos/ProfissionalList.php` | `ProfissionalList` | 🟢 |
| `antigo/app/control/servicos/ContratoForm.php` | `ContratoForm` | 🟢 |
| `antigo/app/control/servicos/ContratoList.php` | `ContratoList` | 🟢 |
| `antigo/app/model/Empresa.php` | `Empresa` | 🟢 |
| `antigo/app/model/Profissional.php` | `Profissional` | 🟢 |
| `antigo/app/model/Contrato.php` | `Contrato` | 🟢 |
