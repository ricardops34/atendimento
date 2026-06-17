---
schemaVersion: 1
generatedAt: 2026-06-17T15:11:00Z
reversa:
  version: "1.2.43"
kind: migration_brief
producedBy: orchestrator
hash: "sha256:0d588523c945b67e2a969f68e2f89c4456ea789cd123456789abcdef01234567"
---

# Migration Brief — atendimento

> Documento de critério de migração coletado em entrevista no início do `/reversa-migrate`.
> Consumido pelos seis agentes do Time de Migração.

## Objetivo da migração
A migração visa modernizar a gestão de atendimentos do portal, permitindo que os profissionais realizem o apontamento de atendimentos operacionais vinculados a contratos e clientes específicos de forma fluida e segura, bem como gerem relatórios consolidados de atividades realizadas para fins de faturamento e auditoria de horas.

## Métricas de sucesso
- **Paridade Funcional:** Equivalência operacional das telas de agendamento (calendário e formulário) e relatórios de atividades realizadas no novo sistema.
- **Integridade de Dados:** Carga histórica completa dos atendimentos, contratos, profissionais e empresas a partir do backup SQL existente sem perda de relacionamentos.
- **Isolamento de Dados:** Garantia de isolamento estrito entre diferentes tenants nos endpoints de CRUD e relatórios.

## Restrições
- **Técnicas:** Obrigatoriedade do uso de Angular com a biblioteca PO-UI no frontend, e NestJS (TypeScript) com PostgreSQL e Prisma ORM no backend.
- **Escopo de OS:** O gerador de ordens de serviço (`OrdemServicoDocument`) está fora do MVP; deve ser tratado como um *placeholder* visual.

## Fatores de risco conhecidos
- **Cores Hex nulas no backup:** Registros de contrato com cores nulas ou inválidas que podem quebrar o layout do calendário.
- **Acoplamento de regras no legado:** Desafio de extrair e desacoplar as regras de cálculo e imutabilidade que hoje rodam na UI do PHP legado para o novo backend.

## Stakeholders
| Nome / papel | Responsabilidade na migração |
|---|---|
| Ricardo | Product Owner / Validador e aprovador técnico |
| Consultores / Profissionais | Usuários finais que efetuam os apontamentos de horas |
| Administradores | Usuários que consultam relatórios de atividades |

## Stack alvo
- **Linguagem**: TypeScript (Node.js / Angular)
- **Framework**: NestJS (Backend) e Angular + PO-UI (Frontend)
- **Banco**: PostgreSQL com Prisma ORM
- **Infra**: Docker / Local

## Escopo declarado
- **Incluído**:
  *   `AgendamentoCalendarioForm` (Calendário interativo e formulário de apontamento lateral).
  *   `AgendamentoList` (Listagem geral e filtros de apontamento).
  *   `RealizadoList` / `RealizadoForm` (Relatórios e controle de atividades realizadas).
  *   Cadastros de Apoio: `Contrato` (com escalas semanais), `Profissional` e `Empresa` (Clientes).
- **Excluído**:
  *   Módulos de Colaboradores, Cargos/Funções e Cidades/Estados.
  *   Geração física do PDF de Ordem de Serviço (OS).
