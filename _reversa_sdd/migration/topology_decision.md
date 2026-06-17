---
schemaVersion: 1
generatedAt: 2026-06-17T15:20:00Z
reversa:
  version: "1.2.43"
kind: topology_decision
producedBy: designer
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde7"
---

# Topology Decision — atendimento

> Decisão consciente sobre como organizar o sistema novo: preservar a topologia do legado, adotar uma topologia moderna ou aplicar um híbrido.
> Este artefato é leitura obrigatória do próprio Designer (para decompor bounded contexts) e do agente de codificação (para criar a árvore de pastas).

## Topologia do legado detectada
- **Padrão organizacional**: Monolito estruturado por tipo de arquivo do framework (package-by-technical-role / MVC clássico).
- **Confiança**: 🟢 CONFIRMADO
- **Evidências**:
  - Organização do código dividida rigidamente entre a pasta `model/` (com arquivos ActiveRecord legados) e a pasta `control/` (com subpastas de controladores visuais `servicos/` e `cadastros_basicos/`), conforme registrado em [inventory.md:28-57](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/inventory.md#L28-L57).
- **Mapa da árvore legada** (resumido):
  ```text
  antigo/app/
  ├── config/
  │   └── consultor.php
  ├── control/
  │   ├── cadastros_basicos/
  │   │   ├── EmpresaForm.php
  │   │   └── ProfissionalForm.php
  │   └── servicos/
  │       ├── AgendamentoCalendarioForm.php
  │       ├── AgendamentoList.php
  │       └── ContratoForm.php
  └── model/
      ├── Agendamento.php
      ├── Contrato.php
      ├── Empresa.php
      └── Profissional.php
  ```

## Diagnóstico estrutural
- **Acoplamento**: Alto. A lógica de negócios, regras matemáticas e validações estão codificadas diretamente dentro das classes de interface visual (Control/View do Adianti), dificultando testes isolados e criando dependência do ciclo de vida HTTP do framework legado.
- **Coesão por módulo**: Média. Embora exista uma divisão física entre `cadastros_basicos` e `servicos`, cada arquivo de controle de tela mistura persistência com validações e formatações de apresentação.
- **Módulos órfãos / mortos**: Nenhum no escopo do MVP.
- **Camadas redundantes**: Nenhuma.
- **Violações de fronteira**: Escritas no banco e cálculos de intervalos são acionados concorrentemente com eventos Ajax de desfocagem de campos da UI.
- **Mistura de paradigmas/estilos**: Mistura de programação procedural para cálculos de tempo e Orientação a Objetos clássica do framework.
- **Avaliação geral**: **Parcialmente problemática**. O forte acoplamento de persistência e tela é o maior débito técnico do legado.

## Topologia moderna proposta
- **Padrão**: **Modularização por Domínio / Bounded Contexts (Backend NestJS) e Modularização por Feature (Frontend Angular)**.
- **Justificativa**: A stack alvo (NestJS + Angular) possui ferramentas nativas poderosas para isolamento modular. Organizar por domínio/bounded context no NestJS agrupa o Controller, o DTO e a lógica de banco (Prisma) da mesma funcionalidade de forma coesa, facilitando manutenções e honrando a arquitetura híbrida decidida (validações e controle centralizados no Controller/Módulo). No Angular, a estrutura orientada a módulos de funcionalidade (feature modules) simplifica o carregamento tardio (lazy loading) e isola o comportamento da interface.
- **Ganhos concretos esperados**:
  - Testabilidade independente e desacoplamento de persistência/rotas.
  - Facilidade de onboarding: um desenvolvedor pode trabalhar no módulo de agendamentos sem precisar navegar por pastas separadas de controle global ou persistência.
  - Alinhamento às boas práticas da stack moderna NestJS e Angular.
- **Custo / risco**:
  - Curva de aprendizado mínima para quem está acostumado com MVC clássico modularizado.
  - Leve esforço inicial para configurar o roteamento modularizado no Angular.
- **Esboço da árvore proposta**:
  ```text
  # BACKEND (NestJS)
  src/
  ├── prisma/                    # Conectores de banco (Prisma Service)
  ├── common/                    # Filtros de erro, guards, etc.
  ├── cadastros-apoio/           # Bounded Context: Apoio (Empresa, Profissional, Contrato)
  │   ├── cadastros-apoio.module.ts
  │   ├── controllers/
  │   │   ├── empresa.controller.ts
  │   │   ├── profissional.controller.ts
  │   │   └── contrato.controller.ts
  │   └── dtos/
  └── agendamentos/              # Bounded Context: Agenda e Relatórios
      ├── agendamentos.module.ts
      ├── controllers/
      │   ├── agendamento.controller.ts
      │   └── relatorio.controller.ts
      └── dtos/

  # FRONTEND (Angular + PO-UI)
  src/app/
  ├── core/                      # Serviços singleton globais (HTTP client, Auth)
  ├── shared/                    # Layouts e componentes reusáveis PO-UI
  ├── cadastros-apoio/           # Feature: Cadastros de Apoio
  │   ├── cadastros-apoio.module.ts
  │   ├── cadastros-apoio-routing.module.ts
  │   └── pages/
  │       ├── empresa/
  │       ├── profissional/
  │       └── contrato/
  └── agendamentos/              # Feature: Agendamento e Relatórios
      ├── agendamentos.module.ts
      ├── agendamentos-routing.module.ts
      └── pages/
          ├── calendario/
          ├── listagem/
          └── relatorio-concluidos/
  ```

## Opções apresentadas ao usuário
1. **Preservar topologia legada** (conservador)
   - Consequências: Organizar o backend NestJS com pastas gerais globais (`/controllers`, `/models`), imitando a estrutura simples do Adianti. Mantém o modelo mental do monolito sem segmentação por contexto de negócio.
2. **Adotar topologia moderna proposta** (transformacional)
   - Consequências: Divide as aplicações (NestJS e Angular) por módulos funcionais de domínio/bounded context (Agendamentos e Cadastros de Apoio), aplicando alta coesão e isolamento arquitetural.
3. **Híbrido** (equilibrado)
   - Consequências: Adotar modularização de domínios apenas no backend NestJS (para manter os endpoints REST organizados), mas manter uma estrutura mais plana de diretórios no frontend Angular para simplificar a criação de componentes e telas de apoio.

## Decisão do usuário
- **Escolha**: 2 (Adotar topologia moderna proposta)
- **Justificativa do usuário**: Escolha da opção 2 no chat, optando por modularizar por domínio (NestJS) e feature (Angular) para melhor manutenção e testabilidade.
- **Decidido em**: 2026-06-17T15:20:15Z

## Mapeamento legado → novo
| Módulo / pasta legada | Bounded context novo | Tipo | Observações |
|---|---|---|---|
| `app/control/cadastros_basicos/` | `cadastros-apoio` | fundido | Reúne os cadastros de Empresas e Profissionais na mesma unidade lógica. |
| `app/control/servicos/ContratoForm.php` | `cadastros-apoio` | dividido | O Contrato move-se para o contexto de Apoio, enquanto os Agendamentos ficam no seu próprio módulo. |
| `app/control/servicos/Agendamento*` | `agendamentos` | fundido | Consolida calendário de agendamento e listagem geral na nova feature. |
| `app/control/servicos/ConfirmarApontamento.php` | `agendamentos` | fundido | Ação de fechamento de realizados integrada no controller de agendamentos. |
| (Novo) | `agendamentos` | novo | Relatórios analíticos de atividades concluídas integrados diretamente no mesmo bounded context de agendamentos. |

## Implicações pendentes para próximos passos do Designer
| Etapa do Designer | Implicação | Como honrar |
|---|---|---|
| Bounded contexts | Definir os escopos de dados | Mapear DTOs isolados para cadastros-apoio e agendamentos. |
| target_architecture | Desenhar a comunicação de rotas | Criar diagramas descrevendo o fluxo da SPA consumindo endpoints da API NestJS de forma modular. |
| target_domain_model | Modelo de domínio | Centralizar lógicas operacionais de minutos no agendamento. |
| target_data_model | Estrutura de banco Prisma | Gerar o arquivo schema.prisma mapeando as relações e indices. |

## Notas
- A escolha da topologia definirá a estrutura física de arquivos que o programador criará no código final da aplicação.
