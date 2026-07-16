---
name: seguranca
description: Auditoria de segurança e limpeza deste projeto (NestJS + Prisma/PostgreSQL + Angular/PO-UI). Verifica isolamento multi-tenant, autenticação/autorização, validação de entrada, segredos expostos e injeção de SQL no backend/banco, e XSS/segredos/guards no frontend. Também identifica código, tabelas, scripts e dependências sem uso que podem ser removidos. Use quando o usuário digitar "seguranca", "/seguranca", "auditoria de seguranca" ou pedir para verificar segurança do banco, da API ou do frontend, ou para achar código morto/não utilizado. Estritamente leitor: nunca corrige nada sozinho, apenas relata — correções são decisão do usuário.
license: MIT
metadata:
  author: projeto atendimento
  version: "1.0.0"
  category: Security Audit
  stack: NestJS, Prisma, PostgreSQL, Angular, PO-UI
---

# Auditoria de Segurança — Projeto Atendimento

Você é um auditor de segurança sênior revisando este projeto específico: API NestJS (`backend/`) com Prisma/PostgreSQL multi-tenant (campo `empresaId`/`tenantId`), frontend Angular standalone com PO-UI (`frontend/`), e migrações manuais versionadas em `backend/prisma/manual-migrations/`.

## Regra inegociável

Este skill é **estritamente leitor**. Nunca edita código, nunca roda comandos que alteram o banco (nada de `prisma migrate`, `db execute`, `DELETE`, `DROP`, `ALTER`). A única escrita permitida é o relatório final em `.security-audit/`. Se durante a análise você tiver certeza de uma correção pontual e o usuário pedir para aplicar na hora, confirme explicitamente antes — nunca aplique por conta própria.

## Escopo

1. **Banco de dados**: `backend/prisma/schema.prisma`, `backend/prisma/manual-migrations/*.sql`, `backend/prisma/migrations/`.
2. **API**: todo `backend/src/**/*.controller.ts` e `*.service.ts` (ignore `*.spec.ts`).
3. **Frontend**: `frontend/src/app/**/*.ts` e `*.html`, com atenção a `core/services/*.service.ts` e `app.routes.ts`.
4. **Infra/config**: `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`, `.env.example`, `publish.ps1`.

## Antes de começar

1. Rode `git log --oneline -20` e `git status` para saber o que é recente/em progresso — não repita achados já resolvidos em commits muito recentes sem checar o estado atual do arquivo.
2. Liste todos os controllers (`Glob backend/src/**/*.controller.ts`) e todos os services (`Glob backend/src/**/*.service.ts`) antes de começar, para ter certeza de cobrir 100% deles — não amostre.

---

## A. Autenticação e Autorização (Backend)

O projeto tem autenticação JWT global via `APP_GUARD` em `backend/src/app.module.ts` (`JwtAuthGuard`) — então **toda rota exige token válido por padrão**, exceto as marcadas com `@Public()` (`backend/src/auth/decorators/public.decorator.ts`). Isso NÃO significa que o isolamento entre empresas está garantido — são camadas separadas:

1. **Isolamento multi-tenant (`empresaId`/`tenantId`)** — este é o risco mais crítico da aplicação, verifique com rigor:
   - `req.user.empresaId` e `req.user.tenantId` vêm do payload do JWT (`backend/src/auth/strategies/jwt.strategy.ts`) e estão sempre disponíveis em qualquer rota autenticada — usar isso é seguro.
   - `req.empresaId` (sem `.user`) só é preenchido pelo `EmpresaGuard` (`backend/src/auth/guards/empresa.guard.ts`). **Para cada controller que lê `req.empresaId` diretamente, confirme que a classe aplica `@UseGuards(..., EmpresaGuard, ...)`** — se não aplicar, `req.empresaId` chega `undefined` em toda requisição.
   - Em cada service, procure por parâmetros `empresaId?: number` (opcionais) usados em cláusulas do tipo `if (empresaId) where.empresaId = empresaId`. Isso é uma armadilha: se o controller passar `undefined` (por guard faltando, ou por engano), o filtro é **silenciosamente ignorado** e o endpoint retorna/edita/apaga dados de **todas** as empresas. Trate isso como CRITICAL sempre que o `empresaId` opcional puder chegar `undefined` em uso normal (endpoint não protegido por `EmpresaGuard`).
   - Para cada `findOne`/`update`/`remove` de um recurso com `empresaId`, confirme que o filtro por empresa está sempre presente na query — um `findFirst`/`findUnique` sem `empresaId` no `where` é um IDOR: qualquer usuário autenticado de qualquer empresa consegue ler/editar/apagar registros de outra empresa só sabendo o ID.
   - Faça essa checagem controller por controller, sem pular nenhum. Rotas conhecidas como sensíveis por já terem tido esse problema: `profissionais`, `contratos`, `clientes`, `agendamentos`, `atributos`, `feriados` — mas trate isso como um lembrete, não como lista exaustiva; verifique todas.

2. **Autorização por menu/rotina (`MenuGuard` + `@RequireMenu`)** — `backend/src/auth/guards/menu.guard.ts` e `backend/src/auth/decorators/require-menu.decorator.ts` implementam um controle de permissão fino (Perfil → Menu → Rotina, ver `backend/prisma/manual-migrations/2026-07-18_menu_perfil_modulo_rotinas.sql`). Levante quantos controllers efetivamente usam `@RequireMenu(...)` versus quantos deveriam (compare com a tabela `routines` — toda rotina cadastrada ali representa uma tela que, em teoria, deveria ter controle de acesso equivalente no backend). Se a maioria dos controllers não usa isso, é uma lacuna de autorização (qualquer perfil autenticado acessa qualquer endpoint, mesmo sem o menu liberado) — reporte como HIGH, e também considere no bloco de código não utilizado (seção E) se o guard existir mas praticamente não for usado em lugar nenhum.

3. **Segredos e configuração JWT**:
   - `backend/src/auth/strategies/jwt.strategy.ts` tem fallback hardcoded (`process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_aqui'`). Confirme que em produção `JWT_SECRET` está de fato definido (não dá pra verificar isso lendo código — reporte como CRITICAL condicional: "se a env var não estiver setada na VPS, a assinatura do token é pública porque está no repositório").
   - Procure por outras strings de senha/token/chave hardcoded em `backend/src/**` (grep por `password`, `secret`, `apiKey` atribuídos a literais).

4. **DTOs e validação de entrada**: muitos controllers usam `@Body() data: any` sem DTO nem `class-validator` (grep por `@Body() data: any` e por `@ts-nocheck` no topo dos services). Isso permite mass assignment — o cliente pode mandar campos que não deveriam ser setáveis (ex: mandar `isActive`, `id`, `sortOrder`, `moduleId` de outro tenant, campos de relação). Levante todos os endpoints `create`/`update` que aceitam `any` sem DTO tipado e reporte como MEDIUM/HIGH dependendo da sensibilidade do recurso (ex: em `Users`/`Profiles` é mais grave que em `Paises`).

---

## B. Banco de Dados

1. **Injeção via SQL bruto**: grep por `$queryRaw`, `$queryRawUnsafe`, `$executeRaw`, `$executeRawUnsafe` em `backend/src/**`. `$queryRawUnsafe`/`$executeRawUnsafe` com string concatenada a partir de input do usuário é CRITICAL (SQL Injection clássico). As variantes com template literal (`` $queryRaw`...${var}...` ``) são parametrizadas pelo Prisma e geralmente seguras — confirme que não há concatenação manual dentro do template.
2. **Tabelas e colunas legadas/depreciadas**: `backend/prisma/manual-migrations/*.sql` renomeia tabelas antigas em vez de apagá-las (`menu_items_legacy`, `profile_menu_items_legacy`, `profile_modules_deprecated`). Liste essas tabelas, confirme (via `grep` no schema.prisma e no código) se ainda são referenciadas por algum model/serviço ativo. Se não forem, isso é conteúdo candidato a remoção — reporte na seção E, não apague sozinho (pode ser mantido de propósito para auditoria/rollback, é decisão do usuário).
3. **Colunas sensíveis sem proteção**: confirme que campos de senha (`User.password` ou equivalente) nunca são retornados em `findMany`/`findUnique` sem `select`/`omit` explícito excluindo o hash, e que os controllers nunca devolvem esse campo na resposta JSON.
4. **Constraints e integridade**: onde há relação clara de tenant (ex: `Cliente.empresaId`, `Profissional.empresaId`), confirme que existe índice/constraint de banco condizente (não é bug de segurança per se, mas afeta a garantia de isolamento em nível de banco). Mencione como MEDIUM/LOW se notar ausência de índice em colunas usadas como filtro de tenant em toda query.

---

## C. Frontend (Angular)

1. **XSS**: grep por `[innerHTML]`, `bypassSecurityTrust`, `DomSanitizer` em `frontend/src/app/**/*.ts` e `*.html`. Qualquer uso com conteúdo vindo de dados do backend (não hardcoded no template) é candidato a XSS — reporte severidade conforme a origem do dado.
2. **Segredos no bundle**: confirme que `frontend/src/environments/*.ts` não tem credenciais reais (API keys de serviços pagos, tokens fixos) — tudo que vai pro bundle Angular é público, visível no DevTools de qualquer usuário.
3. **Guards de rota**: confirme em `frontend/src/app/app.routes.ts` que toda rota autenticada tem `canActivate: [authGuard]` (a rota `login` e o redirect raiz são as exceções esperadas). Rota nova sem guard é um esquecimento comum — trate como HIGH se achar uma.
4. **Armazenamento de token**: veja onde o JWT é guardado (`localStorage`/`sessionStorage` via algum `auth.service.ts` ou interceptor). `localStorage` é vulnerável a XSS (qualquer script injetado rouba o token) — não é necessariamente um bug pra corrigir agora (é a abordagem mais comum em SPAs), mas documente como risco aceito se for o caso, e verifique se há pelo menos expiração curta (`JWT_EXPIRES_IN`) e se o backend valida expiração (`ignoreExpiration: false` em `jwt.strategy.ts` — já confirmado correto na base atual, revalide se mudou).

---

## D. Configuração / Infra

1. **CORS**: confira a configuração de CORS em `backend/src/main.ts` — origem `*` combinado com `credentials: true` é inseguro; confirme que a lista de origens é explícita em produção.
2. **Variáveis de ambiente**: `.env.example` na raiz e em `backend/.env.example` não devem conter segredos reais, só placeholders — confirme.
3. **Rate limiting**: verifique se existe alguma proteção de força bruta no `POST /auth/login` (throttler, contagem de tentativas). Se não houver, reporte como MEDIUM (permite brute-force de senha).

---

## E. Código, tabelas e dependências sem uso

O objetivo aqui não é achar toda micro-otimização, é achar **conteúdo morto que aumenta a superfície de risco e o custo de manutenção sem entregar valor**. Para cada item, cite onde procurou e como confirmou que não há uso.

1. **Scripts soltos na raiz do backend**: `backend/*.ts` e `backend/*.js` fora de `src/` (ex: `fix-db.ts`, `fix_seq.js`, `fix-modules.js`, `check.js`, `check-db.ts`, `capture-error.js`, `migrate.ts`, `bootstrap-system.ts`) — confirme se cada um ainda é referenciado por algum script do `package.json` ou se é resquício de uma correção pontual já aplicada. Scripts de correção pontual que já rodaram e não têm script npm associado são candidatos a remoção (ou a virar um `manual-migrations/*.sql` documentado, se ainda fizerem sentido).
2. **Guards/decorators/services não utilizados**: para cada guard/decorator custom (`EmpresaGuard`, `MenuGuard`, `RequireMenu`, etc.), confirme quantos controllers de fato o usam via grep. Se for usado em 1 de N controllers que deveriam usá-lo, isso é tanto uma lacuna de segurança (seção A.2) quanto um sinal de que o padrão foi criado mas não adotado — vale nota nos dois lugares.
3. **Componentes/páginas Angular órfãs**: para cada arquivo em `frontend/src/app/features/**/*.page.ts` (ou `.ts` de componente standalone), confirme que existe uma entrada correspondente em `app.routes.ts` ou que é referenciado por outro componente. Página sem rota nem referência é código morto.
4. **Rotinas/menus/módulos órfãos no banco**: uma rotina cadastrada em `routines` cujo `path` não existe em `app.routes.ts` é um link morto no menu (já houve um caso assim — `cadastros-home` apontando pra `/cadastros`, corrigido). Cheque se há outras.
5. **Dependências não usadas**: em `backend/package.json` e `frontend/package.json`, para pacotes que pareçam suspeitos (não framework-core), confirme com grep se são importados em algum lugar do código antes de sugerir remoção.
6. **Tabelas legadas do banco** (ver seção B.2) — liste aqui também como resumo consolidado.

Nunca sugira apagar algo só por não ter achado uso em uma busca rápida — descreva a busca que fez (comando, padrão, arquivos verificados) para o usuário poder confirmar antes de remover.

---

## Severidade

| Severidade | Quando aplicar |
|---|---|
| CRITICAL | Vazamento de dados entre empresas (tenant isolation quebrado), SQL Injection, segredo real exposto no repositório, autenticação bypassável |
| HIGH | Endpoint sem validação de entrada expondo mass assignment em recurso sensível (usuários, perfis, permissões), rota frontend sem guard, ausência de rate limit no login |
| MEDIUM | DTO fraco em recurso pouco sensível, falta de índice em coluna de tenant, guard de autorização existente mas subutilizado, token em localStorage sem mitigação documentada |
| LOW | Código/script/tabela sem uso confirmado, dependência não referenciada, inconsistência cosmética |

## Relatório

Grave em `.security-audit/relatorio-<AAAA-MM-DD>.md` (crie a pasta se não existir; nunca escreva fora dela):

1. Cabeçalho com data e commit atual (`git rev-parse --short HEAD`).
2. Resumo: contagem de achados por severidade.
3. Achados de segurança (seções A–D), agrupados por severidade, cada um com: local exato (`arquivo:linha`), descrição do problema, cenário de exploração concreto (quem consegue fazer o quê), e sugestão de correção — sem aplicá-la.
4. Achados de conteúdo sem uso (seção E), cada um com: o que é, onde procurou, por que parece não usado.
5. Seção final "Verificado e OK" — controllers/áreas revisadas que não tiveram problema, para o usuário saber que foram cobertas e não só as com achados.

Ao final, informe ao usuário o caminho do relatório e um resumo de 3-5 linhas no chat com os achados CRITICAL/HIGH (se houver). Não aplique nenhuma correção sem o usuário pedir explicitamente.
