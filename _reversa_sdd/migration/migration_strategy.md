---
schemaVersion: 1
generatedAt: 2026-06-17T15:19:00Z
reversa:
  version: "1.2.43"
kind: migration_strategy
producedBy: strategist
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde4"
---

# Migration Strategy — atendimento

> Estratégias de migração avaliadas com trade-offs explícitos. A estratégia recomendada é a sugestão do Strategist; a decisão final é humana.

## Estratégias avaliadas

### Estratégia A: Strangler Fig (Estrangulamento Incremental de Interface)
- **Descrição**: O novo sistema (Angular + PO-UI / NestJS) roda em paralelo. O link "Agendamentos" e "Atividades Realizadas" no menu do portal legado PHP é redirecionado para a nova SPA. Os demais módulos do legado (como cargos e colaboradores) continuam operacionais no portal antigo.
- **Quando aplica**: Sistemas legados grandes onde a reescrita total imediata é inviável, mas o portal de destino permite redirecionamento/proxy.
- **Custo**: médio (requer infraestrutura de proxy ou links e integração de autenticação/session sharing).
- **Risco**: baixo (isola o impacto apenas nos módulos migrados).
- **Tempo**: médio.
- **Adequação ao apetite derivado** (`balanced`): Alta. Permite a modernização dos módulos prioritários (MVP) mantendo o legado estável.
- **Trade-offs**:
  - **Prós**:
    - Sem impacto nos demais módulos não-migrados do sistema.
    - Liberação antecipada de valor (agendamento PO-UI) sem aguardar a migração total do portal.
  - **Contras**:
    - Requer compartilhar o banco ou implementar sincronizadores de tabelas de apoio (Profissionais, Empresas) se alterados no legado.
    - Exige integração de Single Sign-On (SSO) ou compartilhamento de cookies de sessão para evitar login duplo.

### Estratégia B: Big Bang Localizado (MVP Completo)
- **Descrição**: Desligamento das rotinas de agendamento e relatórios do portal legado em uma janela curta de manutenção. Execução do script final de migração de dados (ETL) e go-live completo do MVP na nova stack Angular/NestJS/PostgreSQL. A partir deste ponto, os apontamentos passam a ocorrer 100% no sistema novo.
- **Quando aplica**: Sistemas ou fatias funcionais de pequeno porte com baixas integrações de terceiros e tolerância a janelas curtas de downtime.
- **Custo**: baixo (infraestrutura simplificada sem necessidade de proxies ou SSO provisórios).
- **Risco**: médio (dependente da precisão e validação prévia da importação de dados históricos).
- **Tempo**: curto (ciclo de migração direto).
- **Adequação ao apetite derivado** (`balanced`): Excelente. Pela simplicidade do escopo do MVP, focar em uma virada atômica de módulo reduz complexidades temporárias de arquitetura híbrida.
- **Trade-offs**:
  - **Prós**:
    - Simplicidade técnica: sem necessidade de sincronização bidirecional ou SSO complexo.
    - Banco de dados PostgreSQL independente e limpo com Prisma.
    - Menor tempo geral de desenvolvimento e custo de infraestrutura.
  - **Contras**:
    - Exige janela de parada operacional curta de faturamento/apontamento para o ETL final.
    - Se houver falha de dados não mitigada, o rollback deve restaurar o módulo legado.

### Estratégia C: Parallel Run (Execução Paralela Temporária)
- **Descrição**: Manter o legado ativo e implantar o sistema novo. Os usuários realizam lançamentos e fechamentos em ambas as plataformas por um período de teste (1 ciclo de fechamento mensal) para comparar se os totais de faturamento e relatórios gerados pelo NestJS conferem centesimalmente com os do Adianti/PHP.
- **Quando aplica**: Lógicas financeiras críticas de alta complexidade ou regulação governamental estrita.
- **Custo**: alto (dupla digitação pelos usuários ou custo de criar integradores automáticos).
- **Risco**: baixíssimo (legado continua sendo a fonte da verdade oficial).
- **Tempo**: médio.
- **Adequação ao apetite derivado** (`balanced`): Média. Mitiga erros matemáticos de tempo líquido, mas acrescenta uma carga de trabalho operacional excessiva para o escopo do projeto.
- **Trade-offs**:
  - **Prós**:
    - Segurança absoluta de paridade de horas e arredondamentos decimais antes do desligamento definitivo.
    - Zero risco de parada operacional por falha técnica do novo software.
  - **Contras**:
    - Alta insatisfação e sobrecarga dos profissionais devido à digitação duplicada de apontamentos.
    - Custo elevado de desenvolvimento para sincronizadores bidirecionais se a digitação única for exigida.

---

## Comparativo

| Critério | Estratégia A (Strangler Fig) | Estratégia B (Big Bang Localizado) | Estratégia C (Parallel Run) |
|---|---|---|---|
| Custo | Médio | **Baixo** | Alto |
| Risco | **Baixo** | Médio | **Baixíssimo** |
| Tempo | Médio | **Curto** | Médio |
| Aderência ao apetite | Alta | **Excelente** | Média |
| Mudança de paradigma | Tratada via Sync/API | **Tratada via ETL direto** | Tratada via Comparativo |

---

## Recomendação do Strategist
- **Estratégia recomendada**: **Estratégia B: Big Bang Localizado (MVP Completo)**
- **Justificativa**: O módulo de atendimento possui baixa complexidade estrutural (tabelas e relacionamentos limitados) e o escopo do MVP é enxuto. O apetite do projeto (`balanced`) visa o desenvolvimento limpo sem criar complexidades de infraestrutura SSO ou proxies que a Estratégia A exigiria. Como o faturamento e os cálculos matemáticos já foram curados (regras de imutabilidade e cálculo numérico em minutos validados no Curator), o risco de cálculo é mitigado via testes automatizados. O Big Bang Localizado reduz custos de desenvolvimento e entrega o MVP mais rapidamente.

## Sinais de alerta específicos
- Como o banco de dados original possui inconsistências de cores nulas/vazias, a migração exige o pré-tratamento e higienização automática dos dados antes do go-live, garantindo que o Big Bang ocorra sem falhas de renderização na interface moderna.

---

## Decisão humana
- **Estratégia escolhida**: <A | B | C>
- **Quem decidiu**: <nome>
- **Quando**: <ISO-8601>
- **Justificativa do decisor**: <texto livre>
