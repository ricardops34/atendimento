---
schemaVersion: 1
generatedAt: 2026-06-17T15:22:00Z
reversa:
  version: "1.2.43"
kind: screen_modernization_decision
producedBy: screen-translator
decidedBy: Ricardo
decidedAt: 2026-06-17T15:23:55Z
mode: modernized
sourcePlatform: php-server-rendered
targetPlatform: web-spa
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde3"
---

# Decisão de Modernização de Telas — atendimento

> Decisão consciente sobre como traduzir as telas do sistema legado: paridade observável byte-a-byte, redesign idiomático para a plataforma alvo, ou combinação tela-a-tela.
> Este artefato é leitura obrigatória do próprio Screen Translator (para gerar `target_screens.md`), do Inspector (para construir parity tests adequados ao modo) e do agente de codificação.

## Contexto

- **Plataforma origem detectada**: `php-server-rendered` (Adianti Framework com HTML e chamadas Ajax síncronas de postback)
- **Confiança**: 🟢 CONFIRMADO
- **Plataforma alvo**: `web-spa` (Angular + biblioteca de componentes PO-UI)
- **Telas inventariadas**: 4
- **Origem do inventário**: `_reversa_sdd/screens/inventory.json` + `_reversa_sdd/ui/inventory.md`
- **Adapter aplicado**: `adapters/php-server-rendered__web-spa`

## Modos avaliados

### Modo: literal
- **Definição**: Reprodução visual e comportamental aproximada das telas legadas do Adianti (layouts planos, tabelas tradicionais e comportamentos síncronos simulados em Angular).
- **Trade-offs**:
  - Custo de implementação: alto (exigiria customizações no PO-UI para forçar layouts desatualizados).
  - Fidelidade visual: baixa (perde as diretrizes premium e de design system moderno do PO-UI).
  - Viabilidade de parity tests construtivos: parcial (comparação visual direta com screenshots legadas).
  - Aceitação esperada do usuário final: baixa (o usuário não sentirá o impacto da modernização da interface).
  - Débito técnico futuro: alto.
- **Recomendado**: não
- **Justificativa**: Simular o Adianti em Angular cria um "monstro" técnico que vai contra as boas práticas de desenvolvimento moderno do ecossistema Angular.

### Modo: modernizado
- **Definição**: Redesign completo da interface para o padrão premium do PO-UI, utilizando componentes reativos nativos de alto nível (PO-Calendar reativo, PO-Table responsiva com filtros flutuantes, e PO-Modal/Sidebar para lançamentos laterais rápidos).
- **Trade-offs**:
  - Custo de implementação: baixo (usa os componentes PO-UI diretamente "out of the box").
  - Fidelidade visual: alta (premium, com visual limpo e interativo).
  - Viabilidade de parity tests construtivos: sim (focados no contrato semântico de entrada, saída, eventos e transições de tela).
  - Aceitação esperada do usuário final: altíssima (impacto visual premium "WOW").
  - Débito técnico futuro: baixo (facilidade de manutenção e evolução do framework).
- **Recomendado**: **sim**
- **Justificativa**: Aproveita todo o potencial do PO-UI para entregar um visual moderno e fluido (wow factor), mantendo a integridade dos dados e o fluxo de operação do agendamento idêntico ao original.

### Modo: híbrido
- **Definição**: Algumas telas em literal (ex: mantendo a listagem clássica) e outras modernizadas (ex: o calendário).
- **Trade-offs**:
  - Custo de implementação: médio.
  - Fidelidade visual mista: inconsistência visual ao navegar entre telas literais e modernizadas.
  - Viabilidade de parity tests: complexidade mista por tela.
  - Custo de manutenção da separação: alto.
- **Recomendado**: não
- **Justificativa**: O volume de telas do MVP é muito pequeno (apenas 4), não justificando a inconsistência de experiência do usuário decorrente do modo híbrido.

---

## Decisão

- **Modo escolhido**: modernized (modernizado)
- **Justificativa do humano**: Escolha da opção 2 (modernizado) para adotar componentes PO-UI nativos reativos de alto nível, reduzindo o débito técnico e aprimorando a usabilidade.
- **Alternativas descartadas**: Literal e híbrido, por manterem inconsistências ou forçarem layouts antigos desatualizados em uma stack moderna.
- **Decidido em**: 2026-06-17T15:23:55Z
- **Decidido por**: Ricardo

---

## Implicações pendentes para a Fase 2

| Etapa | Implicação | Como honrar |
|---|---|---|
| Geração de `target_screens.md` | Descrever árvores de componentes PO-UI | Mapear cada elemento da tela legada para a hierarquia reativa do PO-UI (ex: inputs textuais para `po-input`). |
| Captura de golden files | Visualização de paridade semântica | Focar na validação lógica dos inputs e outputs da API. |
| Tokens do design-system | Uso estrito de tokens de cores | Usar cores da paleta padrão PO-UI. |
| Conteúdo textual | Preservação textual | Copiar rótulos, mensagens de erro e descrições do legado literalmente no formulário novo. |

## Implicações para o Inspector

- **Estratégia de paridade**:
  - Modo modernizado → Validação de contrato semântico (eventos, transições, conteúdo textual e os 4 estados básicos: idle, loading, error, success).
- **Deviations conhecidas a propagar**: Placeholder de OS desativado no frontend.
