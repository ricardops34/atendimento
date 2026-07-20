# Requirements: Acesso do Cliente aos Atendimentos

> Identificador: `003-acesso-cliente-atendimentos`
> Data: `2026-07-20`
> Pasta da extração reversa: `_reversa_sdd/`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA / DÚVIDA

## 1. Resumo executivo

Criar um acesso próprio para o Cliente (a empresa contratante do serviço) consultar, de forma somente leitura, os atendimentos lançados em seu nome. O acesso exige um novo perfil "Cliente" com menu restrito, usuário vinculado ao cadastro de Cliente (não a um Profissional), telas de consulta (Calendário e Lista de Atendimentos) escopadas apenas aos dados do próprio cliente, e relatórios de atendimentos. O sistema legado não possuía portal de autoatendimento para o cliente 🔴; esta é uma capacidade nova sobre a base já migrada de usuários/perfis/menus e agendamentos.

## 2. Contexto a partir do legado

| Fonte | Trecho relevante | Confidência |
|-------|------------------|-------------|
| `_reversa_sdd/architecture.md#🗺️-diagrama-de-contexto-de-sistema-nível-1` | O ator "Usuário do Sistema" do legado é sempre interno (profissional/administrador); não há ator "Cliente" com acesso próprio ao sistema. | 🟢 |
| `_reversa_sdd/inventory.md#📂-árvore-de-diretórios-antigo` | Existe uma pasta `app/control/public/` descrita como "Telas de visualização pública (não autenticadas)", mas fora do escopo analisado pela extração reversa — não há evidência de que ela implementasse consulta de atendimentos por cliente. | 🔴 |
| `_reversa_sdd/domain.md#1-agendamento` | Define os status (`A`, `R`, `C`, `F`) e modalidades (`P`, `R`, `F`) do Agendamento que precisam ser exibidos (ou filtrados) na consulta do cliente. | 🟢 |
| `_reversa_sdd/agendamentos/requirements.md#requisitos-funcionais` | RF-01 (Calendário Interativo) e RF-05/RF-06 (Listagem com filtros) já especificam as telas internas de Calendário e Lista que servem de base funcional para as versões somente-leitura do cliente. | 🟢 |
| Código do sistema atual (já migrado): `backend/src/auth/`, `backend/src/users/`, `backend/src/profiles/`, `backend/src/menus/`, `backend/prisma/schema.prisma` | O novo sistema já implementa Perfil → Menu → MenuItem → Rotina → Módulo, `MenuGuard` (checa rotina liberada no perfil) e `EmpresaGuard` (isola por `empresaId` no JWT). O modelo `User` hoje só linka opcionalmente a `Profissional` (`Profissional.userId`), não existe vínculo `User` → `Cliente`. | 🟢 |

## 3. Personas e cenários de uso

| Persona | Objetivo | Cenário-chave |
|---------|----------|---------------|
| Cliente (contato da empresa contratante) | Consultar os atendimentos já lançados/realizados para conferência e acompanhamento | Faz login no portal e visualiza, em um calendário ou lista, somente os atendimentos vinculados aos seus próprios contratos |
| Cliente (contato administrativo/financeiro) | Extrair um relatório do período para conferência de horas/faturamento | Acessa a tela de relatórios do portal e exporta os atendimentos de um intervalo de datas |
| Administrador do backoffice | Conceder e revogar o acesso de um cliente | Cadastra um usuário vinculado ao Cliente, associa o perfil "Cliente" e o menu restrito correspondente |

## 4. Regras de negócio novas ou alteradas

1. **RN-01 — Escopo de dados por Cliente:** Um usuário com perfil "Cliente" só pode visualizar agendamentos cujo `Contrato.clienteId` corresponda ao cliente ao qual o usuário está vinculado, dentro da(s) empresa(s) às quais o usuário tem acesso. 🟢
   - Origem no legado: não existe (`_reversa_sdd/domain.md` não define este escopo, pois o legado não tinha ator Cliente). Regra nova.
   - Tipo: nova
2. **RN-02 — Perfil Cliente é somente leitura:** Um usuário com perfil "Cliente" não pode criar, editar, confirmar, cancelar atendimentos nem acessar cadastros administrativos (Empresas, Clientes, Contratos, Profissionais, Perfis, Menus, Usuários). Pode apenas consultar e exportar relatórios. 🟢
   - Origem no legado: reforça, para o novo ator, a mesma imutabilidade descrita em `_reversa_sdd/domain.md#rn04--imutabilidade-de-atendimentos-concluídos`, mas aplicada de forma absoluta (nem atendimentos "Agendados" podem ser alterados pelo cliente).
   - Tipo: nova
3. **RN-03 — Vínculo Usuário-Cliente (1:1):** Um usuário de portal deve estar associado a exatamente um Cliente, e cada Cliente pode ter no máximo um usuário de portal vinculado. 🟢
   - Origem no legado: não aplicável (não existe conceito equivalente no legado).
   - Tipo: nova
4. **RN-04 — Visibilidade completa de status ao Cliente:** O usuário-cliente enxerga atendimentos em qualquer status (`A` Agendada, `R` Realizada, `C` Cancelada, `F` Feriado), sempre em modo somente leitura, sem poder alterar nenhum deles (reforça RN-02). 🟢
   - Origem no legado: `_reversa_sdd/domain.md#1-agendamento` (define os quatro status), aplicado aqui como regra de visibilidade nova para o ator Cliente.
   - Tipo: nova
5. **RN-05 — Visibilidade completa de campos ao Cliente:** Dentro do escopo do próprio cliente (RN-01), nenhum campo é ocultado: valores do contrato (`valorHora`, `valorFixo`) e observações do atendimento (`observacao`) aparecem normalmente nas telas de consulta e no extrato em PDF. 🟢
   - Origem no legado: não aplicável (não existe conceito equivalente no legado).
   - Tipo: nova

## 5. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confidência |
|----|-----------|------------|--------------------|-------------|
| RF-01 | Perfil "Cliente" dedicado | Must | Existe um perfil cadastrado (via tela de Perfis já existente) que pode ser atribuído a usuários do tipo cliente, distinto dos perfis internos. | 🟢 |
| RF-02 | Campo "Usuário" no cadastro de Cliente (vínculo 1:1) | Must | O cadastro de Cliente (tela já existente) ganha um campo "Usuário" que vincula o Cliente a um usuário já cadastrado na tela de Usuários (existente, sem alteração); cada usuário pode estar vinculado a no máximo um Cliente; usuários sem esse vínculo não conseguem acessar as telas de consulta do cliente. A criação do usuário (e-mail, senha, perfil) continua sendo feita normalmente na tela de Usuários. | 🟢 |
| RF-03 | Módulo e menu exclusivos do perfil Cliente | Must | Existe um novo Módulo "Clientes" contendo rotinas próprias (não reaproveitadas do módulo interno de Agendamentos); o menu atribuído ao perfil "Cliente" contém apenas essas rotinas novas (Calendário, Lista de Atendimentos e Relatórios); nenhuma rotina de cadastro/administração nem rotina do módulo interno aparece para esse perfil. | 🟢 |
| RF-04 | Calendário de atendimentos do cliente | Must | Nova rotina de calendário, em modo somente leitura, dentro do módulo "Clientes", exibindo os atendimentos dos contratos do cliente logado em qualquer status (`A`, `R`, `C`, `F`, conforme RN-04), com todos os campos (inclusive valores e observações, conforme RN-05) e as mesmas informações visuais de cor/contrato do calendário interno, sem alterar a rotina/módulo de calendário já usada pelo backoffice. | 🟢 |
| RF-05 | Lista de atendimentos do cliente | Must | Nova rotina de listagem, em modo somente leitura, dentro do módulo "Clientes", com os mesmos filtros de período e contrato do RF-06 de `_reversa_sdd/agendamentos/requirements.md`, exibindo todos os status e campos (RN-04/RN-05) e restrita aos atendimentos do cliente logado, sem alterar a rotina/módulo de listagem já usada pelo backoffice. | 🟢 |
| RF-06 | Isolamento de dados entre clientes | Must | Requisições de um usuário-cliente para atendimentos de outro cliente (mesmo dentro da mesma empresa) retornam vazio ou acesso negado, nunca dados de terceiros. | 🟢 |
| RF-07 | Bloqueio de ações administrativas | Must | Tentativas de criar, editar, confirmar ou cancelar atendimento, ou de acessar rotas de cadastro, feitas por um usuário com perfil "Cliente" são recusadas pelo backend independentemente do que a interface exibir. | 🟢 |
| RF-08 | Extrato em PDF dos atendimentos do cliente | Should | O cliente consegue gerar um extrato em PDF, com layout dedicado e simplificado (não o mesmo grid de exportação interna), contendo todos os campos (inclusive valores e observações, RN-05) dos atendimentos do seu próprio Cliente filtrados por período, a partir de uma rotina nova do módulo "Clientes". | 🟢 |
| RF-09 | Não alteração das rotinas internas existentes | Must | Nenhuma Routine, MenuItem, Menu ou Module hoje usado pelo backoffice (ex.: Agendamentos) é modificado, renomeado ou reaproveitado por esta feature; toda a superfície nova do cliente vive em Routines e um Module próprios. | 🟢 |

## 6. Requisitos Não Funcionais

| Tipo | Requisito | Evidência ou justificativa | Confidência |
|------|-----------|----------------------------|-------------|
| Segurança | Toda checagem de escopo (perfil, empresa, cliente) deve ocorrer no backend, nunca apenas ocultando itens de menu no frontend | Já existe o padrão `MenuGuard`/`EmpresaGuard` no backend atual (`backend/src/auth/guards/`) que aplica essa checagem para os perfis internos; o novo escopo por cliente deve seguir o mesmo padrão | 🟢 |
| Privacidade | Dados de outros clientes (nome, contrato, valores, observações) nunca devem trafegar para a sessão de um usuário-cliente, mesmo em respostas de erro | Consequência direta de RN-01 e RF-06 | 🟡 |
| Auditoria | Login e ações do portal do cliente devem ser identificáveis como originados do perfil "Cliente" nos registros de acesso existentes | Mantém consistência com o restante do sistema, que já audita por usuário/empresa | 🟡 |

## 7. Critérios de Aceitação

```gherkin
Cenário: Cliente visualiza apenas seus próprios atendimentos na lista
  Dado que o usuário "contato@clienteA.com" está vinculado ao Cliente "Cliente A" e possui perfil "Cliente"
  E existem atendimentos cadastrados para os contratos do "Cliente A" e também para o "Cliente B"
  Quando o usuário faz login e abre a tela de Lista de Atendimentos
  Então a grade exibe somente os atendimentos vinculados a contratos do "Cliente A"
  E nenhum atendimento do "Cliente B" aparece na listagem, no calendário ou no relatório exportado

Cenário: Cliente tenta acessar uma rotina administrativa diretamente pela URL/API
  Dado que o usuário "contato@clienteA.com" possui perfil "Cliente"
  Quando o usuário tenta acessar a rotina de cadastro de Contratos ou confirmar um agendamento via API
  Então o sistema recusa a operação com um erro de acesso negado
  E nenhuma alteração é persistida no banco de dados
```

## 8. Prioridade MoSCoW

| Item | MoSCoW | Justificativa |
|------|--------|---------------|
| RF-01, RF-02, RF-03 (perfil, vínculo e menu do cliente) | Must | Sem essa base de acesso, nenhuma tela de consulta pode ser exposta com segurança. |
| RF-04, RF-05 (Calendário e Lista somente leitura) | Must | São as duas telas de consulta explicitamente pedidas pelo usuário. |
| RF-06, RF-07 (isolamento e bloqueio de escrita) | Must | Requisito de segurança inegociável para expor dados a um ator externo à empresa. |
| RF-08 (Extrato em PDF) | Should | Também pedido explicitamente; formato definido como extrato em PDF dedicado (ver Esclarecimentos). |

## 9. Esclarecimentos

### Sessão 2026-07-20

- **Q:** Como as rotinas de consulta do cliente devem se relacionar com o módulo/rotinas internos de Agendamentos já existentes?
  **R:** Criar um Módulo novo "Clientes", com Routines novas e próprias (Calendário, Lista de Atendimentos, Relatórios), sem alterar o Module/Routines/MenuItems de Agendamentos usados hoje pelo backoffice. Refletido em RF-03, RF-04, RF-05 e no novo RF-09.
- **Q:** O vínculo Usuário-Cliente é 1:N ou 1:1? Quem cadastra o usuário do cliente?
  **R:** 1:1 — um usuário de portal por Cliente, e um Cliente tem no máximo um usuário de portal. Refletido em RN-03 e RF-02.
- **Q:** Quais status de atendimento o cliente deve enxergar nas telas de consulta?
  **R:** Todos os status (`Agendada`, `Realizada`, `Cancelada`, `Feriado`), sempre em modo somente consulta. Refletido na nova RN-04 e em RF-04/RF-05.
- **Q:** Qual o formato do relatório do cliente?
  **R:** Extrato em PDF, com layout dedicado e mais simples, contendo apenas as informações do próprio cliente. Refletido em RF-08.
- **Q:** Campos internos (observação do atendimento, valorHora/valorFixo do contrato) devem ficar ocultos, visíveis ou parcialmente visíveis para o próprio cliente?
  **R:** Exibir tudo, inclusive valores do contrato e observações do atendimento — desde que sejam dados do próprio cliente. Refletido na nova RN-05 e em RF-04/RF-05/RF-08.

## 10. Lacunas

Nenhuma lacuna aberta no momento. Todas as dúvidas iniciais foram resolvidas nas sessões de `/reversa-clarify` de 2026-07-20.

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-07-20 | Versão inicial gerada por `/reversa-requirements` | reversa |
| 2026-07-20 | Registrada decisão de módulo "Clientes" com rotinas próprias (RF-03/04/05/09) via `/reversa-clarify` | reversa |
| 2026-07-20 | Resolvidas dúvidas de vínculo 1:1 (RN-03/RF-02), visibilidade de todos os status (RN-04) e formato de extrato em PDF (RF-08) via `/reversa-clarify` | reversa |
| 2026-07-20 | Resolvida última dúvida: visibilidade total de campos (valores e observações) ao próprio cliente (RN-05); documento sem lacunas abertas | reversa |
| 2026-07-20 | RF-02 ajustado no `/reversa-plan`: vínculo gerido pelo cadastro de Cliente, cadastro de Usuários permanece intocado | reversa |
| 2026-07-20 | RF-02 reajustado durante `/reversa-coding`: o vínculo é um campo "Usuário" simples no cadastro de Cliente que aponta para um usuário já existente (a FK vive em `Cliente.usuarioId`, não em `User`); a criação do usuário continua 100% na tela de Usuários, sem criação embutida no cadastro de Cliente | reversa |
