# Actions: Scaffold do Repositório e Workspace MVP

> Identificador: `001-scaffold-repositorio`
> Data: `2026-06-17`
> Roadmap: `_reversa_forward/001-scaffold-repositorio/roadmap.md`

## Resumo

| Métrica | Valor |
|---------|-------|
| Total de ações | 10 |
| Paralelizáveis (`[//]`) | 2 |
| Maior cadeia de dependência | 4 |

---

## Fase 1, Preparação

<!-- Setup, scaffolding, migrações iniciais, configuração de infraestrutura local. -->

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T001 | Criar o arquivo `package.json` na raiz do workspace contendo os scripts unificados de orquestração de inicialização e build, adicionando o pacote `concurrently`. | - | `[//]` | `package.json` | 🟢 | `[X]` |
| T002 | Criar o arquivo `.gitignore` e `.env.example` na raiz mapeando variáveis básicas de conexão (`DATABASE_URL`, `JWT_SECRET`) e exclusões recomendadas de pastas de dependências. | - | `[//]` | `.gitignore` | 🟢 | `[X]` |

---

## Fase 2, Testes

<!-- Testes que precisam existir antes ou logo após o núcleo. -->

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T003 | Configurar testes de fumaça iniciais (unit/integrados) padrão do NestJS no backend (`app.controller.spec.ts`). | T005 | - | `backend/src/app.controller.spec.ts` | 🟢 | `[X]` |
| T004 | Configurar testes de fumaça iniciais (unit) padrão do Angular no frontend (`app.component.spec.ts`). | T006 | - | `frontend/src/app/app.component.spec.ts` | 🟢 | `[X]` |

---

## Fase 3, Núcleo

<!-- Lógica central da feature. -->

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T005 | Inicializar a estrutura base da API com NestJS na subpasta `/backend` (skip install para gerenciar pacotes na raiz). | T001 | - | `backend/package.json` | 🟢 | `[X]` |
| T006 | Inicializar a aplicação frontend SPA com Angular v21 na subpasta `/frontend` com suporte a rotas habilitado. | T001 | - | `frontend/package.json` | 🟢 | `[X]` |
| T007 | Instalar os pacotes e dependências visuais do PO-UI (`@po-ui/ng-components` e `@po-ui/ng-templates`) no frontend Angular, configurando as importações em `app.module.ts` e importação de estilos CSS. | T006 | - | `frontend/src/app/app.module.ts` | 🟢 | `[X]` |
| T008 | Instalar a dependência do Prisma CLI no backend, inicializar o schema do Prisma e configurar o datasource para banco PostgreSQL no `schema.prisma`. | T005 | - | `backend/prisma/schema.prisma` | 🟢 | `[X]` |

---

## Fase 4, Integração

<!-- Cola com outras partes do sistema, contratos externos, ganchos. -->

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T009 | Criar arquivo de variáveis de ambiente `backend/.env` baseado no exemplo, configurar credenciais locais de banco de dados e testar a geração do cliente Prisma via `npx prisma generate`. | T002, T008 | - | `backend/package.json` | 🟢 | `[X]` |

---

## Fase 5, Polimento

<!-- Logs, telemetria, mensagens de erro, documentação curta. -->

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T010 | Executar `npm install` no diretório raiz para obter o concurrently, instalar dependências de todas as pastas com o script de suporte `install:all` e testar a execução simultânea via `npm run dev`. | T005, T006, T009 | - | `package.json` | 🟢 | `[X]` |

---

## Notas de execução

*Nenhuma nota registrada até o início da execução das tarefas.*

---

## Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-06-17 | Versão inicial gerada por `/reversa-to-do` | reversa |
