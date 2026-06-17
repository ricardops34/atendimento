---
schemaVersion: 1
generatedAt: 2026-06-17T15:15:00Z
reversa:
  version: "1.2.43"
kind: discard_log
producedBy: curator
hash: "sha256:4d70df882c5f11075677d206f68a789cd123456789abcdef0123456789abcde2"
---

# Discard Log — atendimento

> Registro completo do que foi descartado da migração e por quê. Cada item tem rastreabilidade para a origem no legado.

## Itens descartados

### BR-DESCARTAR-001: Redirecionamento e Geração Física de PDF de OS
- **Origem**: `_reversa_sdd/agendamentos/requirements.md` § RF-07 e `_reversa_sdd/agendamentos/design.md` § pág 107
- **Descrição**: O redirecionamento de link e a rotina PHP de geração física e impressão de PDF do documento de Ordem de Serviço (`OrdemServicoDocument`).
- **Justificativa**: Conforme explicitado nas exclusões de escopo do `migration_brief.md`, a geração de PDF de OS está fora do escopo do MVP acordado. Portanto, a regra e sua infraestrutura legada associada serão descartadas nesta etapa de migração.
- **Vinculado a paradigma**: não
- **Reposição no sistema novo**: No frontend Angular com PO-UI, o botão de emissão de OS será mantido visualmente como um *placeholder* desativado ou exibirá um popover indicando que a funcionalidade está em migração.
- **Risco de descartar**: Baixo. Os usuários ainda poderão realizar os lançamentos na agenda e extrair os relatórios de atividades para fins de auditoria e faturamento, sem impedimento operacional crítico.

### BR-DESCARTAR-002: Armazenamento de Duração Líquida como Texto `hh:ii` no Banco
- **Origem**: `_reversa_sdd/agendamentos/requirements.md` § RN02 e `_reversa_sdd/agendamentos/design.md` § pág 43
- **Descrição**: Gravação direta do cálculo de tempo líquido no formato textual string `hh:ii` (ex: `"07:30"`) na coluna `hora_total` da tabela `agendamento`.
- **Justificativa**: A gravação de durações em formato string dificulta a soma de horas para relatórios no banco de dados e filtros de intervalo. Conforme a recomendação no `paradigm_decision.md` ("Tipagem de Tempo"), devemos descartar o tipo textual em banco.
- **Vinculado a paradigma**: sim
  - **Paradigma Legado**: Tipagem fraca e manipulação textual síncrona na UI do PHP legado.
  - **Paradigma Alvo**: PostgreSQL com Prisma ORM. O banco representará durações como valores numéricos inteiros (representando minutos) ou decimais (horas decimais), e o frontend PO-UI cuidará da formatação amigável para o usuário.
- **Reposição no sistema novo**: Substituído por uma coluna `duracao_minutos` do tipo `INTEGER` no modelo de dados Prisma, onde o cálculo no backend salva o inteiro (ex: `450` minutos para 7.5 horas).
- **Risco de descartar**: Baixo (aumenta o desempenho de relatórios agregados e reduz a complexidade de manipulação de data/hora).

### BR-DESCARTAR-003: Persistência Baseada no Padrão Active Record (TRecord)
- **Origem**: `_reversa_sdd/cadastros-apoio/design.md` § pág 56 e `_reversa_sdd/agendamentos/design.md` § pág 11
- **Descrição**: Gravação e carregamento de entidades do banco diretamente através de chamadas internas dos modelos que herdam de `TRecord` (Active Record do Adianti), ex: `$object->store()`, `$object->delete()`.
- **Justificativa**: O padrão Active Record mistura a lógica de negócio com a persistência de banco e não se adequa à stack alvo NestJS + Prisma ORM.
- **Vinculado a paradigma**: sim
  - **Paradigma Legado**: Padrão Active Record clássico do Adianti Framework.
  - **Paradigma Alvo**: NestJS com Injeção de Dependências e Data Mapper/Repository do Prisma Client, isolando a persistência da camada de rotas e lógica.
- **Reposição no sistema novo**: Substituído por controllers do NestJS que injetam um PrismaService para persistir objetos DTO mapeados no banco.
- **Risco de descartar**: Nenhum.

### BR-DESCARTAR-004: Gerenciamento Manual de Transações do Adianti (`TTransaction`)
- **Origem**: `_reversa_sdd/cadastros-apoio/design.md` § pág 29
- **Descrição**: Gerenciamento manual do ciclo de vida das transações com o banco através de chamadas estáticas `TTransaction::open()`, `TTransaction::close()` e `TTransaction::rollback()`.
- **Justificativa**: A stack alvo gerencia transações de forma diferente. No NestJS + Prisma, as transações são tratadas implicitamente pelo Prisma ou através de métodos de transação isolados (`prisma.$transaction`).
- **Vinculado a paradigma**: sim
  - **Paradigma Legado**: Controle de transação manual global síncrono.
  - **Paradigma Alvo**: NestJS com Prisma Client integrado de forma assíncrona.
- **Reposição no sistema novo**: Substituído por chamadas de transações implícitas do Prisma ou controle assíncrono via `prisma.$transaction`.
- **Risco de descartar**: Nenhum.

### BR-DESCARTAR-005: Handlers AJAX Síncronos Embutidos na UI PHP
- **Origem**: `_reversa_sdd/agendamentos/design.md` § pág 72
- **Descrição**: Uso de triggers embutidos na interface do Adianti (como `OnChangeContrato` ou `onExitHoraFim`) que realizavam chamadas Ajax síncronas de postback e injetavam JavaScript diretamente para atualizar elementos de tela.
- **Justificativa**: O frontend moderno em Angular + PO-UI utiliza componentes reativos e se comunica de forma assíncrona desacoplada via chamadas HTTP REST, sem injeção de script dinâmico do servidor.
- **Vinculado a paradigma**: sim
  - **Paradigma Legado**: Acoplamento rígido de renderização de interface e lógica no backend PHP.
  - **Paradigma Alvo**: Arquitetura desacoplada (SPA Angular + API REST NestJS).
- **Reposição no sistema novo**: Substituído por escuta de eventos nativa do Angular Reactive Forms e requisições HTTP assíncronas direcionadas a endpoints da API NestJS.
- **Risco de descartar**: Nenhum.

---

## Itens descartados por mudança de paradigma (subseção dedicada)

> Lista apenas dos itens cujo `Vinculado a paradigma = sim`. Auditoria explícita para o agente de codificação.

| ID | Origem | Paradigma legado | Substituto no paradigma alvo |
|---|---|---|---|
| BR-DESCARTAR-002 | `_reversa_sdd/agendamentos/requirements.md` § RN02 | Gravação de duração textual `hh:ii` no banco | Coluna numérica `INTEGER` (representando minutos) manipulada pelo Prisma |
| BR-DESCARTAR-003 | `_reversa_sdd/cadastros-apoio/design.md` § pág 56 | Active Record (`TRecord->$object->store()`) | Injeção de dependência do `PrismaService` no NestJS |
| BR-DESCARTAR-004 | `_reversa_sdd/cadastros-apoio/design.md` § pág 29 | Controle manual de transação (`TTransaction`) | Transações atômicas gerenciadas pelo `prisma.$transaction` |
| BR-DESCARTAR-005 | `_reversa_sdd/agendamentos/design.md` § pág 72 | Handlers Ajax embutidos que injetam código JS | Eventos de formulários reativos Angular consumindo API REST |

---

## Notas
- O descarte dos itens baseados em paradigma visa limpar a arquitetura do novo sistema, garantindo um código fonte moderno, legível e em total conformidade com as boas práticas de desenvolvimento NestJS e Angular, sem arrastar restrições técnicas do PHP/Adianti legado.
