# Cadastros de Apoio (Empresa, Profissional e Contrato)

## Visão Geral
Esta unit gerencia os cadastros estruturais básicos do sistema: Empresas (Clientes), Profissionais (Prestadores de Serviço) e Contratos Comerciais. Esses dados servem como base obrigatória para a criação e parametrização dos agendamentos no calendário.

## Responsabilidades
*   Manter o cadastro de Empresas parceiras. 🟢
*   Manter o cadastro de Profissionais habilitados a prestar atendimentos. 🟢
*   Manter o cadastro de Contratos vinculados às empresas, definindo as regras de identificação visual (cores Hex). 🟢

## Regras de Negócio
*   **RN01 — Vinculação Obrigatória de Empresa em Contrato:** Todo contrato cadastrado deve ser obrigatoriamente associado a uma empresa cliente (`empresa_id`). 🟢
*   **RN02 — Identificação Visual de Contrato (Cor):** O cadastro de Contrato permite opcionalmente associar uma cor hexadecimal (`cor`). Essa cor deve ser herdada e usada para pintar os agendamentos vinculados a esse contrato no calendário de atendimentos. 🟢
*   **RN03 — Validação de Campos Obrigatórios:**
    *   Empresa exige o preenchimento de `nome` (Razão Social/Fantasia). 🟢
    *   Profissional exige o preenchimento de `nome`. 🟢
    *   Contrato exige o preenchimento de `descricao` e `empresa_id`. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|-----------|-------------------|
| RF-01 | Cadastro de Empresas | Must | Permitir incluir, editar, listar e excluir empresas parceiras. A exclusão deve ser bloqueada se a empresa possuir contratos vinculados. |
| RF-02 | Cadastro de Profissionais | Must | Permitir incluir, editar, listar e excluir profissionais que realizam atendimentos. |
| RF-03 | Cadastro de Contratos | Must | Permitir incluir, editar, listar e excluir contratos vinculados a empresas, permitindo configurar a cor hexadecimal e a descrição padrão. |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Segurança | Autenticação obrigatória e isolamento de dados por Tenant | `EmpresaForm.php`, `ContratoForm.php` (Modelos de Active Record integrados sob transação) | 🟡 |
| Integridade | Bloqueio de exclusão em cascata (FK Constraints) | DDL SQL de criação das tabelas `contrato` e `agendamento` | 🟢 |

## Critérios de Aceitação

```gherkin
Cenário: Cadastro de Contrato válido
  Dado que o usuário está autenticado e na tela de formulário de Contrato
  Quando preenche a descrição "Contrato de Atendimento Técnico", seleciona a empresa "Empresa Exemplo" e define a cor "#4CAF50"
  E clica em Salvar
  Então o sistema persiste o contrato com sucesso e gera um ID único

Cenário: Tentativa de cadastro de Contrato sem Empresa
  Dado que o usuário está na tela de formulário de Contrato
  Quando preenche a descrição "Contrato Inválido" mas deixa o campo Empresa em branco
  E clica em Salvar
  Então o sistema bloqueia o salvamento e exibe um alerta de validação obrigatória
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Cadastro de Empresas | Must | Requisito obrigatório para criação de Contratos. |
| Cadastro de Contratos | Must | Requisito obrigatório para criação e exibição de Agendamentos. |
| Cadastro de Profissionais | Must | Requisito obrigatório para alocação da agenda de atendimento. |

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
