# Requirements: Scaffold do Repositório e Workspace MVP

> Identificador: `001-scaffold-repositorio`
> Data: `2026-06-17`
> Pasta da extração reversa: `_reversa_sdd/`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA / DÚVIDA

## 1. Resumo executivo

Entrega a infraestrutura básica e a estrutura de diretórios do repositório moderno para o MVP, inicializando o backend (NestJS com Prisma ORM) e o frontend (Angular com PO-UI) conforme as especificações de topologia moderna acordadas. Isso resolve a ausência de um workspace produtivo para receber o código da migração das lógicas e telas do sistema legado de atendimento.

## 2. Contexto a partir do legado

As definições de arquitetura e topologia modernas que embasam o scaffold do workspace estão documentadas nas especificações da migração.

| Fonte | Trecho relevante | Confidência |
|-------|------------------|-------------|
| `_reversa_sdd/migration/target_architecture.md#Componentes` | Mapeia os componentes do sistema novo: Angular SPA e NestJS API. | 🟢 |
| `_reversa_sdd/migration/topology_decision.md#Topologia moderna proposta` | Define a organização de diretórios por Domínio (Bounded Contexts) e Feature. | 🟢 |
| `_reversa_sdd/migration/target_data_model.md#Schema (schema.prisma)` | Define o uso do Prisma ORM e PostgreSQL como base de dados. | 🟢 |

## 3. Personas e cenários de uso

| Persona | Objetivo | Cenário-chave |
|---------|----------|---------------|
| Desenvolvedor | Configurar o ambiente local de forma automatizada | Clonar o repositório, instalar dependências e inicializar os servidores de desenvolvimento com um único comando. |

## 4. Regras de negócio novas ou alteradas

*Não se aplica diretamente a regras de negócio operacionais, por se tratar de uma feature estritamente técnica de infraestrutura do workspace (scaffold).*

## 5. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confidência |
|----|-----------|------------|--------------------|-------------|
| RF-01 | Inicializar o Backend NestJS | Must | Criar a pasta `/backend` contendo o scaffold padrão NestJS com TypeScript e ESLint estruturados. | 🟢 |
| RF-02 | Inicializar o Frontend Angular | Must | Criar a pasta `/frontend` contendo o scaffold padrão Angular com rotas habilitadas. | 🟢 |
| RF-03 | Instalar biblioteca PO-UI | Must | Adicionar e configurar os pacotes PO-UI (`@po-ui/ng-components`) e dependências de estilo CSS no frontend. | 🟢 |
| RF-04 | Integrar Prisma ORM | Must | Configurar o Prisma no backend, gerando o arquivo inicial `schema.prisma` mapeando para PostgreSQL. | 🟢 |
| RF-05 | Configurar Variáveis de Ambiente | Must | Disponibilizar arquivo `.env.example` contendo chaves para URL de banco de dados e segredo JWT. | 🟢 |
| RF-06 | Script de Inicialização Rápida | Should | Configurar scripts no `package.json` raiz do workspace para rodar o backend e o frontend concorrentemente. | 🟡 |

## 6. Requisitos Não Funcionais

| Tipo | Requisito | Evidência ou justificativa | Confidência |
|------|-----------|----------------------------|-------------|
| Segurança | Ocultar dados sensíveis | Arquivos de ambiente `.env` e pastas temporárias de pacotes (`node_modules`, `.prisma`) devem ser inclusos no `.gitignore`. | 🟢 |
| Portabilidade | Compatibilidade multiplataforma | A inicialização do workspace deve rodar e compilar perfeitamente no ambiente Windows do desenvolvedor e ser compatível com containers Docker. | 🟢 |

## 7. Critérios de Aceitação

```gherkin
Cenário: Inicialização concorrente bem-sucedida do workspace
  Dado que o desenvolvedor configurou o arquivo .env a partir do .env.example
  Quando executa o comando de desenvolvimento "npm run dev" no diretório raiz
  Então o sistema inicializa concorrentemente o NestJS na porta 3000 e o Angular na porta 4200
  E ambos os servidores sobem sem erros de compilação

Cenário: Geração do cliente Prisma ORM
  Dado que o schema.prisma foi definido no backend
  Quando o desenvolvedor roda o comando "npx prisma generate"
  Então o Prisma Client é gerado com sucesso para conexão com a base PostgreSQL
```

## 8. Prioridade MoSCoW

| Item | MoSCoW | Justificativa |
|------|--------|---------------|
| RF-01, RF-02, RF-03 | Must | Fundamentos da stack alvo declarada para o MVP. |
| RF-04, RF-05 | Must | Essenciais para permitir a persistência de dados. |
| RF-06 | Should | Conveniência para facilitar o onboarding e workflow do desenvolvedor. |

## 9. Esclarecimentos

### Sessão 2026-06-17

- **Q:** Qual a versão do Angular e PO-UI que devemos utilizar no scaffold para assegurar paridade e compatibilidade estrita com a documentação e referências locais?
  **R:** Angular v21 (e versões de compatibilidade PO-UI correspondentes).
- **Q:** Devemos configurar o monorepo utilizando alguma ferramenta de workspace ou apenas pastas soltas coordenadas por scripts no package.json raiz?
  **R:** Pastas independentes `/backend` e `/frontend` coordenadas por scripts no `package.json` raiz do workspace (mais simples de manter).

## 10. Lacunas

*Nenhuma lacuna ou dúvida pendente nesta feature.*

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-06-17 | Versão inicial gerada por `/reversa-requirements` | reversa |
| 2026-06-17 | Resolução de dúvidas de scaffold integrada via `/reversa-clarify` | reversa |
