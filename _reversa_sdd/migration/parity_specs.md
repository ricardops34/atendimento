---
schemaVersion: 1
generatedAt: 2026-06-17T15:24:00Z
reversa:
  version: "1.2.43"
kind: parity_specs
producedBy: inspector
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde6"
---

# Parity Specs — atendimento

> Estratégia de validação de equivalência comportamental entre legado e sistema novo, adaptada ao paradigma Híbrido e PO-UI.

## Estratégia geral
- **Modos de validação aplicáveis**:
  - [X] Characterization tests (suíte derivada do comportamento e regras curadas do legado)
  - [X] Contract tests (interfaces de API REST e hierarquia visual de telas PO-UI)
  - [X] Data parity (reconciliação de checksums de horas faturadas históricas)

## Critérios de "paridade aceita"
- **Métrica primária**: Índice de divergência matemática de tempo de faturamento líquido = 0,00% nos cenários de testes Gherkin de integração.
- **Janela de observação**: Execução automatizada de toda a suíte de testes de integração na pipeline de CI antes de qualquer deploy em produção.
- **Critério de bloqueio**: Qualquer falha nas regras críticas de negócio (cálculo de tempo líquido, imutabilidade baseada em status e herança de propriedades de contrato) bloqueia sumariamente a virada (cutover) para produção.

---

## Cobertura adaptada ao paradigma

### Transição: OO Clássico / Active Record ➔ OO com Injeção de Dependências e Data Mapper (Prisma)
- **Comportamento equivalente sem dependência de Active Record**: Os testes devem provar que a lógica operacional de cálculo de tempo líquido e alteração de status funciona de forma independente no NestJS via controllers, simulando o banco de dados via mocks de repositório Prisma.
- **Validação de DTOs e Contratos API**: Validar que as requisições HTTP REST enviadas pelo frontend Angular respeitam as tipagens numéricas (minutos inteiros) no backend, e que os status HTTP adequados (ex: 200 OK, 201 Created, 400 Bad Request) são emitidos conforme as validações.

### Paridade de Interface (Modo Modernizado - PO-UI)
Como o modo escolhido pelo PO foi o **modernizado**, aplica-se o **contract test de tela**:
- Os testes não validarão correspondência visual de layout pixel-a-pixel.
- Provaremos que a nova SPA em Angular + PO-UI respeita a hierarquia de componentes definida em `target_screens.md`, escuta os eventos reativos configurados (ex: `blur` de horário para recalcular, `change` do combo de contrato para aplicar cor) e implementa de forma visível os 4 estados da interface (idle, loading, error, success).

---

## Exceções de Paridade (Screen Deviations Aprovados)

- **DEV-001 (Placeholder de OS)**: O botão de Ordem de Serviço na listagem e na sidebar é um mero placeholder inativo que exibe um popover de aviso de migração. O teste de paridade deve ignorar a geração física de PDFs.
- **DEV-002 (Sidebar Reativa)**: O formulário de lançamentos abre em formato de Sidebar lateral PO-UI aberta dinamicamente, divergindo do popup dialog clássico do Adianti. Os testes validam apenas os dados transmitidos no envio do formulário.
- **DEV-003 (Fallback de Cores no ETL)**: Contratos legados com cores nulas ou vazias renderizarão na nova UI com a cor `#333333` padrão, higienizada durante a migração de dados.

---

## Tipos de teste a aplicar
- **Funcionais (Integração e Aceitação)**: Escritos em Gherkin e executados no frontend/backend usando Cucumber / Jest para provar o ciclo de vida do agendamento.
- **Contrato de API**: Testes de endpoints REST da API NestJS validando o formato JSON de resposta e validação de schema Prisma.

---

## Reuso de characterization_specs do time de descoberta
Não foram gerados specs de caracterização física na fase de descoberta (ausência em `_reversa_sdd/characterization_specs/`), portanto, as especificações de teste foram derivadas diretamente a partir do `_reversa_sdd/code-analysis.md`, das regras do `target_business_rules.md` e do `target_screens.md`.

---

## Saídas
- `_reversa_sdd/migration/parity_tests/01-cadastro-apoio.feature`: Especificação do fluxo de contratos e escalas.
- `_reversa_sdd/migration/parity_tests/02-calculo-tempo.feature`: Validação das regras de duração líquida.
- `_reversa_sdd/migration/parity_tests/03-ciclo-vida-imutabilidade.feature`: Testes de transição de status e restrições.
