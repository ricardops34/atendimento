---
schemaVersion: 1
generatedAt: 2026-06-17T15:15:00Z
reversa:
  version: "1.2.43"
kind: target_business_rules
producedBy: curator
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcdef"
---

# Target Business Rules — atendimento

> Catálogo das regras de negócio do legado com decisão de migração: MIGRAR, DESCARTAR ou DECISÃO HUMANA.
> Cada item rastreia para a origem em `_reversa_sdd/` e respeita o `paradigm_decision.md`.

## Resumo
- Total de regras analisadas: 13
- MIGRAR: 8
- DESCARTAR: 2 (detalhe em `discard_log.md`)
- DECISÃO HUMANA: 3

---

## Regras MIGRAR

### BR-MIGRAR-001: Derivação de Datetimes Técnicos
- **Origem**: `_reversa_sdd/agendamentos/requirements.md` § RN01 e `_reversa_sdd/agendamentos/design.md` § Fluxo Principal 1
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: Os campos de persistência de banco `horario_inicial` e `horario_final` devem ser compostos concatenando a data do atendimento (`data_agenda`) com os horários de início e fim informados pelo usuário.
- **Justificativa de migração**: Regra estrutural de dados necessária para a renderização correta de eventos em faixa de tempo no calendário moderno.
- **Compatibilidade com paradigma alvo**: No backend NestJS, a persistência receberá os objetos Date compostos a partir do DTO ou calculados no controller e salvará em campos do tipo `DateTime` no PostgreSQL via Prisma ORM, evitando concatenações de strings brutas na UI.

### BR-MIGRAR-002: Cálculo de Duração Líquida de Atendimento
- **Origem**: `_reversa_sdd/agendamentos/requirements.md` § RN02 e `_reversa_sdd/domain.md` § RN03
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: A duração líquida de atendimento deve descontar o tempo de intervalo de almoço/descanso.
  $$\text{Duração Líquida} = (\text{hora\_fim} - \text{hora\_inicio}) - (\text{hora\_intervalo\_final} - \text{hora\_intervalo\_inicial})$$
- **Justificativa de migração**: Regra essencial de domínio comercial para auditoria e controle de horas prestadas.
- **Compatibilidade com paradigma alvo**: Centralizado no controller ou utilitário do backend NestJS. O backend calculará a duração líquida e a armazenará em formato numérico (minutos inteiros) para fácil cálculo de relatórios, descartando o formato de string textual pura `hh:ii` no banco.

### BR-MIGRAR-003: Validação de Mudança de Status (Imutabilidade)
- **Origem**: `_reversa_sdd/agendamentos/requirements.md` § RN03, `_reversa_sdd/domain.md` § RN04 e `_reversa_sdd/state-machines.md` § Seção 3
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: Apenas agendamentos com status atual igual a `A` (Agendado) podem sofrer alterações de dados, cancelamento ou confirmação de execução (`R`). Qualquer outra alteração de dados deve ser rejeitada com erro.
- **Justificativa de migração**: Garante a integridade histórica dos dados faturados e fechados.
- **Compatibilidade com paradigma alvo**: Validação implementada na camada de controle do NestJS antes de efetivar operações de atualização no Prisma.

### BR-MIGRAR-004: Herança de Propriedades de Contrato no Agendamento
- **Origem**: `_reversa_sdd/agendamentos/requirements.md` § RN04 e `_reversa_sdd/domain.md` § RN05
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: Ao selecionar um contrato, a cor visual hexadecimal e a descrição padrão do contrato são herdadas e associadas ao agendamento.
- **Justificativa de migração**: Facilita a usabilidade e a padronização visual da agenda operacional.
- **Compatibilidade com paradigma alvo**: O frontend Angular + PO-UI escuta as mudanças do combo de contrato e consulta de forma assíncrona um endpoint NestJS para popular as propriedades reativamente no formulário.

### BR-MIGRAR-005: Parâmetros Padrão de Inicialização
- **Origem**: `_reversa_sdd/agendamentos/requirements.md` § RN05
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: Novos registros de agendamento são inicializados com tipo padrão `A` (Agendada) e local/modalidade padrão `P` (Presencial).
- **Justificativa de migração**: Simplifica a criação de novos agendamentos definindo o fluxo mais comum.
- **Compatibilidade com paradigma alvo**: Definido através de valores default no schema do Prisma e inicialização no DTO do backend.

### BR-MIGRAR-006: Vinculação Obrigatória de Empresa em Contrato
- **Origem**: `_reversa_sdd/cadastros-apoio/requirements.md` § RN01
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: Todo contrato deve possuir obrigatoriamente um vínculo com uma empresa/cliente válida (`empresa_id`).
- **Justificativa de migração**: Regra relacional básica de faturamento.
- **Compatibilidade com paradigma alvo**: Implementado via restrição de chave estrangeira (FK) no PostgreSQL/Prisma e validação de DTO no NestJS.

### BR-MIGRAR-007: Validação de Dados Obrigatórios de Cadastro
- **Origem**: `_reversa_sdd/cadastros-apoio/requirements.md` § RN03
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: Validações obrigatórias de presença de campos em cadastros de apoio: `nome` para Empresa e Profissional; `descricao` e `empresa_id` para Contratos.
- **Justificativa de migração**: Garante a consistência dos dados de base.
- **Compatibilidade com paradigma alvo**: Validado no NestJS via decorators do `class-validator` nos DTOs de entrada e feedback visual reativo no PO-UI.

### BR-MIGRAR-008: Fechamento de Apontamentos em Lote (Realizados)
- **Origem**: `_reversa_sdd/domain.md` § RN02 e `_reversa_sdd/state-machines.md` § Seção 2
- **Confiança original**: 🟢 CONFIRMADO
- **Descrição**: A ação de fechamento processa uma lista de agendamentos pendentes do tipo `A` dentro de um intervalo de datas, mudando seu status para `R` (Realizada), calculando o tempo decimal líquido de cada um e inserindo os respectivos dados de faturamento na tabela `Realizado`.
- **Justificativa de migração**: Automação crítica de processos para fechamento de horas do faturamento mensal.
- **Compatibilidade com paradigma alvo**: Disponibilizado como um endpoint POST atômico no NestJS executado dentro de uma transação Prisma (`prisma.$transaction`).

---

## Regras DESCARTAR (resumo)

| ID | Origem | Motivo curto | Vínculo a paradigma? |
|---|---|---|---|
| BR-DESCARTAR-001 | `_reversa_sdd/agendamentos/design.md` § pág 107 | Emissão de PDF de OS física está fora do MVP. | não |
| BR-DESCARTAR-002 | `_reversa_sdd/agendamentos/requirements.md` § RN02 | Gravação de duração líquida como string `hh:ii` no banco. | sim |

> Detalhe completo em `discard_log.md`.

---

## Regras DECISÃO HUMANA

### BR-HUMANA-001: Validação de Choque de Horários de Profissionais
- **Origem**: `_reversa_sdd/agendamentos/design.md` § pág 108
- **Tipo de ambiguidade**: 🔴 GAP (Comportamento legado tolerante)
- **Descrição**: O sistema legado não possui validação de conflito de agenda, permitindo o agendamento de múltiplos atendimentos concomitantes para o mesmo profissional na mesma faixa de horário.
- **Opções**:
  1. **Manter paridade absoluta**: Não validar colisões, permitindo sobreposições livremente.
  2. **Bloqueio rígido**: Impedir o salvamento se houver sobreposição horária para o profissional.
  3. **Aviso (Soft Warning)**: Permitir a gravação, mas enviar uma mensagem de aviso no frontend alertando sobre o conflito.
- **Recomendação do Curator**: **Opção 3 (Aviso)**. Manter a flexibilidade exigida pelo negócio (que o legado permitia), mas agregando valor com um feedback visual moderno de conflito de horários.
- **Status**: RESOLVIDA (Opção 1: Manter paridade absoluta sem bloqueio ou aviso / Ricardo / 2026-06-17)

### BR-HUMANA-002: Sanitização e Validação de Cores Hexadecimais no Backup
- **Origem**: `_reversa_sdd/migration/migration_brief.md` § pág 29 e `_reversa_sdd/questions.md` § pág 18
- **Tipo de ambiguidade**: 🔴 GAP (Dados legados corrompidos)
- **Descrição**: O banco legado possui contratos cadastrados com cores nulas ou strings de cor inválidas. Se mantido, isso quebra o calendário moderno do frontend.
- **Opções**:
  1. Aplicar um fallback de cor (`#333333` ou similar) in loco no frontend caso a cor de banco seja inválida.
  2. Sanitizar os dados durante o script de migração (`TM-01`), atualizando valores inválidos ou nulos para `#333333` diretamente na base de dados PostgreSQL.
- **Recomendação do Curator**: **Opção 2**. Modificar a cor no banco de dados na fase de ETL garante a integridade dos dados na base e simplifica a renderização no frontend.
- **Status**: RESOLVIDA (Opção 2: Sanitizar no banco aplicando #333333 / Ricardo / 2026-06-17)

### BR-HUMANA-003: Contrato de Sistema e Cores para Feriados (Configuração Hardcoded)
- **Origem**: `_reversa_sdd/state-machines.md` § pág 40 e `_reversa_sdd/domain.md` § pág 43
- **Tipo de ambiguidade**: ⚠️ AMBÍGUA
- **Descrição**: O processo de geração em lote do legado possui o ID do contrato de feriado (`contrato_id = 4`) e a cor vermelha (`#f42b06`) definidos diretamente em código de forma fixa.
- **Opções**:
  1. Manter o ID e cor estáticos no código backend NestJS.
  2. Criar uma tabela de parâmetros globais no banco ou expor como variáveis de ambiente para definir qual Contrato e Cor representam os feriados.
- **Recomendação do Curator**: **Opção 2**. Hardcode de IDs de banco é um antipadrão. Criar uma propriedade de configuração ou flag no cadastro de contratos para identificar o contrato de feriado é muito mais seguro e flexível.
- **Status**: RESOLVIDA (Opção 2: Configurar dinamicamente / Ricardo / 2026-06-17)

---

## Notas
- Todos os itens classificados sob **DECISÃO HUMANA** foram registrados em `_reversa_sdd/migration/ambiguity_log.md` para acompanhamento e aprovação do Product Owner (Ricardo) antes da fase de design técnico e codificação.
