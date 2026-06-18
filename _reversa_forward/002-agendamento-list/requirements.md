# Requirements: Listagem de Atendimentos

> Identificador: `002-agendamento-list`
> Data: `2026-06-17`
> Pasta da extração reversa: `_reversa_sdd/`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA / DÚVIDA

## 1. Resumo executivo

Implementar a tela de listagem de atendimentos no sistema novo, permitindo que o usuário consulte e filtre atendimentos em formato de tabela com paginação. A tela substitui a grade legada `AgendamentoList` (PHP/Adianti) e é a principal interface de consulta consolidada da operação. Os filtros restringem por contrato, profissional e período de data. A ação de confirmar por linha converte o status do atendimento de Agendado (`A`) para Realizado (`R`), respeitando a regra de imutabilidade do domínio. O botão de Ordem de Serviço (OS) é incluído como placeholder inativo, pois o módulo de faturamento está fora do escopo do MVP.

## 2. Contexto a partir do legado

| Fonte | Trecho relevante | Confidência |
|-------|------------------|-------------|
| `_reversa_sdd/agendamentos/requirements.md#RF-05` | Grade em tabela com colunas Observações, Tipo, Data e Duração Total | 🟢 |
| `_reversa_sdd/agendamentos/requirements.md#RF-06` | Painel lateral de filtros: Contrato, Profissional, período de data | 🟢 |
| `_reversa_sdd/agendamentos/requirements.md#RF-07` | Botão de OS por linha — redirecionamento para `OrdemServicoDocument` | 🟢 |
| `_reversa_sdd/agendamentos/requirements.md#RF-08` | Exportação da grade em CSV, XLS, PDF e XML (prioridade Should) | 🟢 |
| `_reversa_sdd/agendamento/screens.md#AgendamentoList` | Spec de tela: colunas visíveis, painel de filtros, comportamento confirmado pelo código | 🟢 |
| `_reversa_sdd/migration/target_screens.md#AgendamentoList` | Tela modernizada: rota `/agendamentos/lista`, colunas ampliadas, API `GET /api/agendamentos` | 🟢 |
| `_reversa_sdd/domain.md#RN04` | Imutabilidade: somente `tipo = A` (Agendado) pode ser confirmado ou editado | 🟢 |
| `_reversa_sdd/migration/target_business_rules.md#BR-MIGRAR-003` | Validação de mudança de status centralizada no backend, não na UI | 🟢 |
| `_reversa_sdd/migration/target_business_rules.md#BR-HUMANA-002` | Cor fallback `#333333` para contratos com cor nula ou inválida | 🟢 |
| `_reversa_sdd/architecture.md#ERD` | Tabela `agendamento` com FK para `contrato` e `profissional`; campo `tipo` define status | 🟢 |

## 3. Personas e cenários de uso

| Persona | Objetivo | Cenário-chave |
|---------|----------|---------------|
| Administrador | Consultar e auditar todos os atendimentos do período | Filtra por contrato e intervalo de datas, visualiza a grade e confirma atendimentos realizados individualmente |
| Profissional | Verificar seus próprios atendimentos pendentes | Filtra pelo próprio nome no campo Profissional, confere as datas e confirma os atendimentos que executou |

## 4. Regras de negócio novas ou alteradas

1. **RN-01 — Imutabilidade de atendimentos: botão de confirmação condicional** 🟢
   - A ação de confirmar está disponível apenas para linhas com `tipo = 'A'` (Agendado). Para qualquer outro status (`R` Realizado, `C` Cancelado, `F` Feriado) o botão não é exibido na linha.
   - Origem no legado: `_reversa_sdd/domain.md#RN04`; regra de migração: `_reversa_sdd/migration/target_business_rules.md#BR-MIGRAR-003`
   - Tipo: alterada — a validação migra da camada de UI/PHP para o backend

2. **RN-02 — Duração total exibida em hh:mm, armazenada em minutos inteiros no banco** 🟢
   - O campo "Duração Total" exibe a duração líquida do atendimento em formato `hh:mm`. O valor persistido no banco é um inteiro de minutos; a formatação é feita pelo frontend.
   - Origem no legado: `_reversa_sdd/domain.md#RN03`; regra de migração: `_reversa_sdd/migration/target_business_rules.md#BR-MIGRAR-002`
   - Tipo: alterada — no legado era string `VARCHAR hh:ii`; no novo sistema é `INTEGER` de minutos

3. **RN-03 — Cor fallback para contratos sem cor válida** 🟢
   - Atendimentos vinculados a contratos com cor nula ou hexadecimal inválido devem exibir a cor padrão `#333333` na linha da tabela.
   - Origem: `_reversa_sdd/migration/target_business_rules.md#BR-HUMANA-002`
   - Tipo: nova — gap do legado resolvido na fase de migração de dados

## 5. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confidência |
|----|-----------|------------|--------------------|-------------|
| RF-01 | Exibir listagem de atendimentos em tabela com colunas: Data, Contrato, Profissional, Modalidade e Duração Total | Must | A tabela carrega e renderiza registros com todas as colunas preenchidas; linhas sem contrato exibem a célula de Contrato vazia sem erro | 🟢 |
| RF-02 | Filtrar atendimentos por Contrato, Profissional, Data Inicial e Data Final via painel lateral | Must | Ao aplicar filtros, a tabela recarrega exibindo apenas os registros que satisfazem todos os critérios informados; limpar filtros restaura a listagem sem filtros | 🟢 |
| RF-03 | Confirmar atendimento individual por linha, alterando status de Agendado (`A`) para Realizado (`R`) | Must | O botão de confirmação aparece somente em linhas com `tipo = 'A'`; após confirmação, a linha atualiza o status visualmente para Realizado sem recarregar a página inteira; o botão desaparece da linha confirmada | 🟢 |
| RF-04 | Exibir botão de Ordem de Serviço (OS) por linha como placeholder inativo | Should | O botão OS está presente em cada linha mas desabilitado; ao posicionar o cursor sobre ele exibe a mensagem "Módulo em migração" | 🟢 |
| RF-05 | Exportar a listagem filtrada nos formatos CSV, XLS, PDF e XML via botão/dropdown "Exportar" na barra de ações da tela | Should | O dropdown "Exportar" oferece as opções CSV, XLS, PDF e XML; ao selecionar um formato, o arquivo com os registros da listagem filtrada é gerado e baixado | 🟢 |

## 6. Requisitos Não Funcionais

| Tipo | Requisito | Evidência ou justificativa | Confidência |
|------|-----------|----------------------------|-------------|
| Segurança | Somente usuários autenticados com o módulo `appointments-list` liberado no perfil do tenant (unidade/cliente de isolamento de dados) podem acessar a rota de listagem e o endpoint de consulta | `_reversa_sdd/agendamento/screens.md#Acesso-e-permissoes` | 🟢 |
| Desempenho | A listagem sem filtros deve retornar e renderizar os resultados em menos de 2 segundos para volumes de até 1.000 registros; a paginação clássica com opções de 10, 20 e 50 registros por página é obrigatória | `_reversa_sdd/agendamentos/requirements.md#RNF-Performance` (inferido do requisito de renderização assíncrona) | 🟡 |
| Observabilidade | Falhas na consulta à API (4xx/5xx) devem ser capturadas e exibidas como mensagem de erro visível ao usuário, com o texto retornado pelo servidor | `_reversa_sdd/migration/target_screens.md#AgendamentoList` (estado Error) | 🟢 |

## 7. Critérios de Aceitação

```gherkin
Cenário: Listagem carregada sem filtros
  Dado que o usuário autenticado possui o módulo "appointments-list" liberado no perfil
  Quando acessa a tela de listagem de atendimentos
  Então a tabela exibe atendimentos do período corrente
  E cada linha contém as colunas Data, Contrato, Profissional, Modalidade e Duração Total

Cenário: Listagem vazia
  Dado que não existem atendimentos cadastrados no período corrente
  Quando o usuário acessa a tela de listagem
  Então a tabela é exibida sem linhas
  E uma mensagem de "Nenhum atendimento encontrado" é apresentada ao usuário

Cenário: Filtro por Profissional e período de data
  Dado que a listagem está carregada
  Quando o usuário abre o painel de filtros
  E seleciona um profissional e define uma Data Inicial e uma Data Final
  E aplica os filtros
  Então a tabela recarrega exibindo somente atendimentos do profissional selecionado dentro do período informado

Cenário: Confirmação de atendimento agendado
  Dado que a listagem exibe um atendimento com status Agendado (A)
  Quando o usuário clica no botão de confirmar da linha
  Então o sistema envia a solicitação de confirmação para a API
  E a linha atualiza o status visualmente para Realizado
  E o botão de confirmar desaparece da linha confirmada

Cenário: Botão confirmar ausente para atendimento já realizado
  Dado que a listagem exibe um atendimento com status Realizado (R)
  Então o botão de confirmação não está visível na linha

Cenário: Falha na confirmação por status inválido
  Dado que o frontend tenta confirmar um atendimento que não está com status Agendado
  Quando a API retorna erro de negócio
  Então o frontend exibe uma mensagem de erro com o motivo retornado pelo servidor
  E o status da linha não é alterado

Cenário: Botão OS exibido como placeholder inativo
  Dado que a listagem exibe atendimentos
  Quando o usuário posiciona o cursor sobre o botão de OS de qualquer linha
  Então um aviso "Módulo em migração" é exibido
  E o clique no botão não executa nenhuma ação

Cenário: Acesso negado sem módulo liberado
  Dado que o usuário autenticado não possui o módulo "appointments-list" no perfil
  Quando tenta acessar a tela de listagem
  Então é redirecionado para a tela de acesso negado
  E o endpoint de consulta de atendimentos retorna HTTP 403
```

## 8. Prioridade MoSCoW

| Item | MoSCoW | Justificativa |
|------|--------|---------------|
| RF-01 — Tabela de atendimentos | Must | Tela principal de consulta da operação diária |
| RF-02 — Filtros por contrato, profissional e datas | Must | Sem filtros a listagem é inutilizável em volumes reais de dados |
| RF-03 — Confirmar atendimento por linha | Must | Fluxo essencial para fechamento individual de atendimentos |
| RF-04 — Botão OS como placeholder | Should | Necessário para não regredir a UX do legado; funcionalidade completa é de outra feature |
| RF-05 — Exportação CSV/XLS/PDF/XML | Should | Útil para extração administrativa; confirmado no escopo desta feature |
| Segurança — controle de acesso por módulo/tenant | Must | Requisito de isolamento de dados por tenant |
| Desempenho — resposta < 2s para 1.000 registros | Should | Necessário para uso operacional fluido |

## 9. Esclarecimentos

### Sessão 2026-06-17

- **Q:** A exportação de dados (CSV, XLS, PDF, XML) deve ser incluída nesta feature, postergada ou entregue parcialmente?
  **R:** Incluir nesta feature — exporta a listagem filtrada nos mesmos formatos do legado (CSV, XLS, PDF, XML).

- **Q:** Qual comportamento de paginação a tabela deve usar?
  **R:** Paginação clássica — botões de página com opções de 10, 20 e 50 registros por página, escolha do usuário.

## 10. Lacunas

Nenhuma lacuna em aberto. Todos os pontos foram resolvidos na sessão de 2026-06-17.

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-06-17 | Versão inicial gerada por `/reversa-requirements` | reversa |
| 2026-06-17 | Dúvidas resolvidas por `/reversa-clarify`: exportação incluída no escopo, paginação clássica definida | reversa |
