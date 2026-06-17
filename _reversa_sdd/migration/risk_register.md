---
schemaVersion: 1
generatedAt: 2026-06-17T15:19:00Z
reversa:
  version: "1.2.43"
kind: risk_register
producedBy: strategist
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde5"
---

# Risk Register — atendimento

> Registro de riscos da migração do sistema de atendimento com probabilidade, impacto, mitigação e responsável.

## Riscos

### RISK-001: Quebra de Interface por Cores Hexadecimais Nulas/Inválidas no Backup
- **Descrição**: O banco legado possui contratos cadastrados com cores nulas ou vazias. Se importados diretamente, podem corromper a renderização visual do calendário moderno (PO-UI/FullCalendar) ou gerar erros de validação no frontend.
- **Categoria**: técnico / de dados
- **Probabilidade**: alta
- **Impacto**: médio
- **Severidade combinada**: Alta
- **Trigger / sinal de alerta**: Exibição de eventos sem cor no calendário ou console do navegador exibindo erros de propriedades de estilo de cores CSS.
- **Mitigação**: Executar a sanitização de cores (aplicar `#333333` padrão) no script de migração ETL (`TM-01`).
- **Plano de contingência**: Adicionar uma regra de fallback no frontend Angular para que qualquer evento com cor inválida seja pintado automaticamente com a cor padrão cinza.
- **Owner**: Desenvolvedor Backend / Frontend
- **Status**: mitigando

### RISK-002: Inconsistência no Fechamento Financeiro de Horas (Diferenças Centesimais)
- **Descrição**: A mudança da tipagem de tempo de string textual (`hh:ii`) para minutos inteiros ou decimais no banco de dados moderno pode gerar arredondamentos centesimais divergentes do sistema legado nos relatórios de faturamento.
- **Categoria**: financeiro / operacional
- **Probabilidade**: média
- **Impacto**: alto
- **Severidade combinada**: Alta
- **Trigger / sinal de alerta**: O total de horas fechadas em um contrato no novo sistema diverge do fechamento gerado pelo portal antigo para o mesmo período e profissional.
- **Mitigação**: Desenhar a especificação Gherkin de paridade matemática (`parity_specs.md`) cobrindo múltiplos cenários de horas brutas e intervalos, garantindo equivalência exata dos minutos totais.
- **Plano de contingência**: Manter um validador/conversor utilitário temporário no backend NestJS para exportar fechamentos em ambos os formatos para validação cruzada.
- **Owner**: Product Owner (Ricardo) / Desenvolvedor Backend
- **Status**: aberto

### RISK-003: Indisponibilidade Operacional Durante a Janela de Virada (Downtime no Big Bang)
- **Descrição**: O desligamento do módulo legado e a execução da importação final de dados pode exceder a janela de tempo prevista, impedindo os profissionais de realizarem seus apontamentos diários de horas.
- **Categoria**: operacional
- **Probabilidade**: baixa
- **Impacto**: médio
- **Severidade combinada**: Média
- **Trigger / sinal de alerta**: O processo de importação final dos dados excede o limite estabelecido na janela de manutenção (ex: 4 horas).
- **Mitigação**: Realizar simulações completas de migração de dados (Dry Run) com o backup de produção em ambiente de homologação, medindo os tempos de processamento.
- **Plano de contingência**: Rollback imediato no roteamento do portal, reativando a escrita no módulo de atendimentos PHP legado até a correção do script.
- **Owner**: Desenvolvedor Backend / DevOps
- **Status**: aberto

### RISK-004: Incompatibilidade de Lógica Operacional Devido à Mudança de Paradigma
- **Descrição**: As regras de cálculo de horas e imutabilidade de status rodavam na UI do PHP/Adianti síncrono. Erros na implementação do desacoplamento da API NestJS / Frontend Angular podem permitir a quebra de regras de negócio (ex: edições de registros concluídos).
- **Categoria**: técnico
- **Probabilidade**: baixa
- **Impacto**: alto
- **Severidade combinada**: Média
- **Trigger / sinal de alerta**: A API NestJS aceita requisições de alteração/salvamento para registros cujo status não seja `A` (Agendado).
- **Mitigação**: Implementação estrita das validações e testes unitários na camada de controllers e DTOs no NestJS, e criação de testes de integração com Gherkin/Cucumber.
- **Plano de contingência**: Bloqueio temporário via trigger direta de validação no banco PostgreSQL se o NestJS falhar na camada lógica.
- **Owner**: Desenvolvedor Backend
- **Status**: aberto

---

## Resumo por severidade

| Severidade | Quantidade | IDs |
|---|---|---|
| Crítica | 0 | |
| Alta | 2 | RISK-001, RISK-002 |
| Média | 2 | RISK-003, RISK-004 |
| Baixa | 0 | |

---

## Riscos relacionados ao paradigma alvo

> Subseção dedicada quando há mudança de paradigma. Listar apenas riscos cuja origem direta é o gap registrado em `paradigm_decision.md`.

- **RISK-002: Inconsistência no Fechamento Financeiro de Horas (Diferenças Centesimais)**: Derivado diretamente da migração de tipo de dado ("Tipagem de Tempo") onde trocaremos strings textuais `hh:ii` por armazenamento tipado numérico.
- **RISK-004: Incompatibilidade de Lógica Operacional Devido à Mudança de Paradigma**: Derivado diretamente do desacoplamento da lógica do Adianti UI ("Desacoplamento de Lógica" e "Persistência Desacoplada" via Prisma).
