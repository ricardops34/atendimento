---
schemaVersion: 1
generatedAt: 2026-06-17T15:13:00Z
reversa:
  version: "1.2.43"
kind: paradigm_decision
producedBy: paradigm_advisor
hash: "sha256:0d588523c945b67e2a969f68e2f89c4456ea789cd123456789abcdef01234567"
---

# Paradigm Decision — atendimento

> Decisão consciente sobre como tratar a mudança de paradigma entre o legado e a stack alvo.
> Este artefato é de leitura obrigatória para os agentes subsequentes e o desenvolvedor do novo sistema.

## Paradigma do Legado Detectado
- **Paradigma principal**: OO Clássico / Event-Driven UI (acoplamento de regras na camada de apresentação / controladores do Adianti).
- **Confiança**: 🟢 CONFIRMADO
- **Evidências**:
  *   Lógica matemática de horas líquidas e validação de status rodando dentro das classes de formulário PHP ([AgendamentoCalendarioForm.php:280-292](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/AgendamentoCalendarioForm.php#L280-L292)).
  *   Uso de Active Record herdado de `TRecord` ([Agendamento.php:3](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Agendamento.php#L3)) com salvamento autônomo.

## Stack Alvo Declarada
- **Linguagem**: TypeScript / Node.js
- **Framework**: NestJS & Angular com PO-UI
- **Banco**: PostgreSQL com Prisma ORM

## Paradigma Natural Inferido
- **Paradigma**: OO com Injeção de Dependências (DI) e Data Mapper.
- **Justificativa**: NestJS utiliza arquitetura baseada em DI para desacoplamento de camadas, e o Prisma ORM isola a persistência em um cliente independente (Data Mapper).
- **Alternativas viáveis**: Híbrido, mantendo a divisão de API/UI, mas simplificando a separação de serviços no NestJS.

## Gap Identificado
- **Severidade**: Médio
- **Implicações concretas**:
  *   **Persistência Desacoplada:** Substituir `$object->store()` por chamadas ao cliente Prisma na API.
  *   **Desacoplamento de Lógica:** Migrar o cálculo de horas líquidas e as validações de status da tela Adianti para a API REST no NestJS.
  *   **Triggers Reativos (Angular):** Migrar eventos de PostBack Ajax do Adianti (`OnChangeContrato`) para requisições HTTP do Angular no frontend chamando endpoints REST.
  *   **Tipagem de Tempo:** Migrar o formato de string textual de horas para cálculos tipados (segundos ou decimais) no backend.

## Opções Apresentadas ao Usuário
1.  **Adotar paradigma natural da stack (Transformacional):** Reescrever dividindo rigidamente em controllers, services e repositories com DI.
2.  **Forçar paradigma similar ao legado (Conservador):** Acoplar regras de banco no controller ou simular Active Record na stack moderna.
3.  **Híbrido (Equilibrado):** Manter o desacoplamento clássico de API REST e UI Angular, mas centralizar a validação e lógica operacional no Controller/Módulo NestJS, sem criar camadas complexas de Services ou Repositories.

## Decisão do Usuário
- **Escolha**: 3 (Híbrido)
- **Justificativa do usuário**: Escolha da opção 3 (Híbrido) no menu interativo, optando por balancear o desacoplamento de API/UI sem inflar o backend com excesso de camadas de serviço para este MVP.
- **Decidido em**: 2026-06-17T15:13:00Z

## Apetite Derivado
- `derived_appetite`: `balanced`

## Implicações Pendentes para Próximos Agentes

| Agente | Implicação | Como honrar |
|---|---|---|
| **Curator** | Escopo simplificado | Mapear as rotinas e regras de persistência de forma direta, focando apenas nos endpoints de API exigidos para o MVP. |
| **Strategist** | Estratégia equilibrada | Focar o cutover na importação de dados e testes diretos de endpoints de API REST. |
| **Designer** | Arquitetura Híbrida | Desenhar o `target_architecture.md` e o modelo de dados Prisma prevendo a validação e regras operacionais contidas na camada de controladores de rotas da API, mantendo o frontend Angular independente. |
| **Inspector** | Especificações de Teste | Desenhar os testes Gherkin com foco em validar as entradas e saídas de dados diretamente nos endpoints de API. |
