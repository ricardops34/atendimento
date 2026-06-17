---
schemaVersion: 1
generatedAt: 2026-06-17T15:25:00Z
reversa:
  version: "1.2.43"
kind: handoff
producedBy: orchestrator
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde7"
---

# Handoff de Migração — atendimento

> Documento final consolidado de handoff da engenharia reversa e migração do sistema legado para o time de desenvolvimento/codificação.

Este documento encerra o pipeline do **Time de Migração do Reversa** com paridade e integridade garantidas. A partir destas especificações estruturadas sob `_reversa_sdd/migration/`, os programadores ou agentes de IA de codificação podem iniciar a implementação direta do sistema moderno.

---

## 📋 Resumo da Migração
- **Objetivo**: Modernizar as telas e processos de agendamento de atendimentos operacionais e relatórios de concluídos do portal legado PHP/Adianti.
- **Stack Alvo**: Angular + PO-UI (Frontend), NestJS + TypeScript + Prisma ORM (Backend), PostgreSQL (Database).
- **Paradigma Escolhido**: **Híbrido (Equilibrado)**. Separação clara de API e SPA, com lógica e validação operacional concentradas no controller backend do NestJS para evitar excesso de abstração.
- **Topologia Adotada**: **Moderna (Decomposta)**. Estruturação física da base de código organizada por Domínio/Bounded Contexts.

---

## 🛠️ Artefatos Produzidos

### 1. Curadoria e Lógicas
- **[target_business_rules.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/target_business_rules.md)**: Catálogo com 8 regras MIGRAR, 2 resumidas de descarte e 3 decisões de PO formalmente integradas.
- **[discard_log.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/discard_log.md)**: Log de descarte de mecanismos do legado (como Active Record `TRecord` e string textual de duração `hh:ii` em banco).
- **[ambiguity_log.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/ambiguity_log.md)**: Log resolvido contendo as decisões de gap do Product Owner (Ricardo).

### 2. Estratégia de Transição
- **[migration_strategy.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/migration_strategy.md)**: Definição da estratégia de **Big Bang Localizado** (virada direta do MVP após ETL).
- **[risk_register.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/risk_register.md)**: Registro de riscos cobrindo tipagem de tempo, indisponibilidade e quebra de interface.
- **[cutover_plan.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/cutover_plan.md)**: Plano de etapas de transição de final de semana com passos de rollback detalhados.

### 3. Desenho de Arquitetura e Modelagem
- **[topology_decision.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/topology_decision.md)**: Decisão de estrutura base de diretórios aprovada pelo PO.
- **[target_architecture.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/target_architecture.md)**: Desenho do backend NestJS, DTOs, Prisma e SPA Angular com diagrama Mermaid explicativo.
- **[target_domain_model.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/target_domain_model.md)**: Modelo contendo os Aggregates (`Agendamento` e `Contrato`), Entidades e Value Objects.
- **[target_data_model.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/target_data_model.md)**: Mapeamento de tabelas físicas com **schema do Prisma ORM** (`schema.prisma`) completo.
- **[data_migration_plan.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/data_migration_plan.md)**: Plano de ETL contendo as transformações críticas:
  - **T-01**: Sanitização de cores hexadecimais de contratos inválidas para `#333333`.
  - **T-02**: Conversão do cálculo e tipo de tempo líquido textual para minutos inteiros.
  - **T-03**: Concatenação de datetimes técnicos.
  - **T-04**: Geração de faturamento decimal para a tabela `realizado`.

### 4. Interface e Paridade de Telas
- **[screen_modernization_decision.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/screen_modernization_decision.md)**: Decisão pelo modo de tradução **modernizado** para as 4 telas do agendamento.
- **[target_screens.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/target_screens.md)**: Especificação de componentes PO-UI (tabelas, calendário nativo, combos, sidebars) e os 4 estados visuais.
- **[screen_deviation_log.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/screen_deviation_log.md)**: Desvios visuais autorizados (ex: placeholder de OS e Drawer lateral reativo).

### 5. Validação e Testes
- **[parity_specs.md](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/parity_specs.md)**: Estratégia de testes de regressão sem dependência de Active Record e testes de contrato visual.
- **[Cenários Gherkin de Paridade](file:///C:/Patay/Ricardo/VPS/atendimento/_reversa_sdd/migration/parity_tests/)**:
  - `01-cadastro-apoio.feature`: Validações de criação e formatos de contratos/escala.
  - `02-calculo-tempo.feature`: Testes com múltiplos exemplos de cálculo de tempo líquido e conversão decimal.
  - `03-ciclo-vida-imutabilidade.feature`: Testes de restrição e bloqueio de edições em registros fechados.

---

## 🏁 Próximos Passos recomendados ao Programador
1. **Modelagem**: Criar o schema PostgreSQL a partir do `schema.prisma` gerado.
2. **ETL de Dados**: Implementar o script CLI TypeScript (`TM-01`) de carga do dump `bjsoft18_portal.sql` no Postgres aplicando as transformações (T-01 à T-04).
3. **Desenvolvimento do Backend**: Scaffold do NestJS com DTOs `class-validator` estruturando as rotas REST.
4. **Desenvolvimento do Frontend**: Scaffold do app Angular com biblioteca PO-UI, gerando os componentes de Calendário e Sidebar reativos.
5. **Automação de Testes**: Implementar os testes de integração baseados nas especificações Cucumber/Gherkin de `parity_tests/`.
