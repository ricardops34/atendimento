# Relatório de Auditoria de Segurança — Projeto Atendimento

**Data:** 2026-07-15
**Commit analisado:** `10bfa7e` (branch `master`) — com uma alteração local não commitada em `backend/src/profissionais/profissionais.controller.ts` (correção aplicada durante esta mesma sessão, ver achado C-01).
**Escopo:** todos os 20 controllers e 21 services de `backend/src/**`, `backend/prisma/schema.prisma` e `manual-migrations/*.sql`, `backend/src/main.ts`, todo `frontend/src/app/**`, `docker-compose.yml`, `.env.example`.

## Resumo

| Severidade | Qtd |
|---|---|
| CRITICAL | 6 |
| HIGH | 4 |
| MEDIUM | 3 |
| LOW | 4 |

O padrão dominante é **isolamento multi-tenant inconsistente**: o projeto tem os mecanismos certos (`req.user.empresaId` sempre disponível via JWT, `EmpresaGuard` para popular `req.empresaId`), mas vários controllers foram escritos sem aplicar esse padrão — alguns nunca filtram por empresa, e dois usam um campo (`req.tenantId`) que não existe em lugar nenhum do código que o preenche.

---

## Achados CRITICAL

### C-01. `/profissionais` sem isolamento entre empresas — **já corrigido nesta sessão**
- **Local:** `backend/src/profissionais/profissionais.controller.ts` (estado anterior, antes da correção local ainda não commitada)
- **Problema:** controller lia `req.empresaId`, mas não aplicava `EmpresaGuard` (só o `JwtAuthGuard` global). `req.empresaId` chegava sempre `undefined`, e em `profissionais.service.ts` os filtros são condicionais (`if (empresaId) where.empresaId = ...`) — com `undefined` o filtro é ignorado.
- **Exploração:** qualquer usuário autenticado de qualquer empresa listava/via/editava/apagava profissionais de **todas** as empresas via `GET/PATCH/DELETE /profissionais(:id)`.
- **Status:** corrigido durante esta sessão — `@UseGuards(JwtAuthGuard, EmpresaGuard)` adicionado ao controller (mudança local, ainda não commitada). Confirme o commit antes de considerar resolvido em produção.

### C-02. `/users` sem nenhuma restrição de acesso — escalação de privilégio + account takeover
- **Local:** `backend/src/users/users.controller.ts` (todos os métodos) + `backend/src/users/users.service.ts` (`findAll`, `search`, `findOne`, `update`, `remove`)
- **Problema:** o controller não aplica nenhum guard além do `JwtAuthGuard` global, e o service não tem NENHUM conceito de tenant nas queries de listagem/busca/edição/remoção. `update()` aceita `@Body() data: any` sem DTO, incluindo `profileId` e `password`.
- **Exploração concreta:**
  - `GET /users` / `/users/search` — qualquer usuário autenticado vê nome, e-mail, perfil e empresas de **todos os usuários do sistema**, de qualquer empresa.
  - `PATCH /users/:id` — qualquer usuário autenticado pode alterar o `profileId` de **qualquer conta**, inclusive a própria, para o perfil Administrador (escalação de privilégio total), ou trocar a senha de outra pessoa (`data.password`) e assumir a conta dela (account takeover).
  - `DELETE /users/:id` — apaga qualquer usuário de qualquer empresa.
- **Sugestão:** aplicar `EmpresaGuard` para escopo por empresa nas listagens, e — mais importante — restringir `update`/`remove`/mudança de `profileId` a um controle de autorização por perfil (ex.: só Administrador do próprio tenant, nunca alteração do próprio `profileId` pelo próprio usuário). Trocar `@Body() data: any` por um DTO explícito sem o campo `profileId` liberado para o próprio usuário.

### C-03. `/empresas` sem nenhuma restrição — qualquer usuário edita/apaga qualquer tenant
- **Local:** `backend/src/empresas/empresas.controller.ts` (todos os métodos) + `backend/src/empresas/empresas.service.ts`
- **Problema:** nenhum guard além do `JwtAuthGuard` global; nenhuma checagem de quem pode gerenciar empresas. `create`/`update` usam `@Body() data: any`.
- **Exploração:** qualquer usuário autenticado, de qualquer empresa e qualquer perfil, pode `PATCH`/`DELETE /empresas/:id` em **qualquer outra empresa** do sistema — inclusive apagar a empresa de outro cliente, com cascade sobre os dados dela.
- **Sugestão:** restringir esse controller a um perfil de administração de sistema (não apenas Administrador de uma empresa) — hoje não existe esse nível de permissão implementado, precisa ser desenhado.

### C-04. `/realizados` — leitura e manipulação de faturamento sem isolamento
- **Local:** `backend/src/realizados/realizados.controller.ts` + `backend/src/realizados/realizados.service.ts`
- **Problema:** `findAll()` roda `prisma.realizado.findMany({include:{agendamento:true}})` sem `where` nenhum. `fecharLote(dto)` busca agendamentos só por `id: {in: dto.agendamentoIds}` e `tipo: 'A'`, sem checar a empresa dona desses IDs.
- **Exploração:** `GET /realizados` expõe registros de horas/faturamento fechado de **todas as empresas**. `POST /realizados/fechar-lote` permite que um usuário de qualquer empresa "feche"/fature agendamentos que pertencem a **outra empresa**, criando registros de `realizado` para IDs que não são dela.
- **Sugestão:** adicionar `EmpresaGuard` e filtrar `findAll` por empresa; em `fecharLote`, validar que todos os `agendamentoIds` pertencem à empresa do usuário autenticado antes de processar.

### C-05. `/agendamentos/gerar-mensal` e `/agendamentos/export-extrato` usam campo que nunca é preenchido
- **Local:** `backend/src/agendamentos/agendamentos.controller.ts:39-41` e `:120-133`
- **Problema:** o controller lê `req.tenantId`, mas `EmpresaGuard` (`backend/src/auth/guards/empresa.guard.ts`) só define `request.empresaId` — nunca `request.tenantId`. Esse campo é sempre `undefined` nessas duas rotas (mesmo com `EmpresaGuard` aplicado na classe).
- **Exploração concreta:**
  - `POST /agendamentos/gerar-mensal` → `agendamentosService.gerarMensal(..., empresaId=undefined)`: o filtro `where: { empresaId }` vira `{empresaId: undefined}` e o Prisma **ignora o filtro**, lendo contratos/escalas de todas as empresas; os agendamentos novos são gravados com `empresaId: empresaId || 1` — ou seja, **sempre caem na empresa de id 1**, não importa quem chamou o endpoint. Isso tanto vaza dados de outras empresas na geração quanto grava dados errados no tenant 1 toda vez que qualquer empresa usa essa função.
  - `GET /agendamentos/export-extrato` → o objeto `filters` é montado com `tenantId: req.tenantId`, mas `buildWhereFromFilters()` em `agendamentos.service.ts` só lê `filters.empresaId` (nome de campo diferente!) — o filtro de empresa nunca é aplicado. O extrato exportado (XLS/PDF com valores financeiros, nomes de clientes e profissionais) sai com dados de **todas as empresas combinadas**, para qualquer usuário autenticado.
- **Sugestão:** trocar `req.tenantId` por `req.empresaId` nos dois pontos (mesmo padrão já usado em `findAll`/`search`/`export` no mesmo controller, que estão corretos).

### C-06. `POST /agendamentos` aceita `empresaId` vindo do corpo da requisição
- **Local:** `backend/src/agendamentos/agendamentos.controller.ts:33-36` (`create`) + `agendamentos.service.ts:124` (`empresaId: (dto as any).empresaId ?? 1`)
- **Problema:** o controller não passa a empresa da sessão (`req.user.empresaId`/`req.empresaId`) para `create()` — a única fonte de `empresaId` é o próprio corpo da requisição, com fallback para `1`.
- **Exploração:** um usuário pode enviar `empresaId` de outra empresa no payload e criar agendamentos lá; se o frontend não mandar o campo, todo agendamento criado por qualquer empresa cai silenciosamente na empresa `1`.
- **Sugestão:** `create()` deve receber `empresaId` do contexto autenticado (`req.empresaId`, já disponível já que o controller usa `EmpresaGuard`), nunca do body.

---

## Achados HIGH

### H-01. Autorização por Menu/Rotina implementada mas usada em 1 de 20 controllers
- **Local:** `backend/src/auth/guards/menu.guard.ts` + `backend/src/auth/decorators/require-menu.decorator.ts`, usados só em `backend/src/agendamentos/agendamentos.controller.ts` (`@RequireMenu('agendamentos-list')`)
- **Problema:** o sistema tem uma modelagem completa de permissão fina por Perfil → Menu → Rotina (`backend/prisma/manual-migrations/2026-07-18_menu_perfil_modulo_rotinas.sql`), mas o backend só aplica esse controle em um único recurso. Em todos os outros (Clientes, Contratos, Profissionais, Atributos, Feriados, Módulos, Rotinas, Menus, Perfis, Usuários...), qualquer perfil autenticado acessa o endpoint mesmo que a rotina correspondente não esteja liberada no menu dele — o controle de acesso por perfil hoje só existe visualmente (o quê aparece no menu), não é reforçado na API.
- **Sugestão:** aplicar `@UseGuards(..., MenuGuard)` + `@RequireMenu('<routine-key>')` nos demais controllers sensíveis, ou decidir conscientemente que o controle fica só no frontend (e documentar isso como decisão aceita, não como esquecimento).

### H-02. Mass assignment em vários recursos sensíveis (`@Body() data: any` sem DTO)
- **Locais:** `users.controller.ts`, `profiles.controller.ts`, `system-modules.controller.ts`, `routines.controller.ts`, `menus.controller.ts`, `empresas.controller.ts` — todos `create`/`update` com `@Body() data: any`.
- **Problema:** o `ValidationPipe({whitelist:true, transform:true})` global (`main.ts`) só filtra campos quando o parâmetro é uma classe DTO decorada com `class-validator`; com `data: any` não há whitelist nenhuma — o cliente pode mandar qualquer campo extra que o Prisma aceitar.
- **Sugestão:** criar DTOs tipados para esses recursos (o projeto já usa esse padrão em `clientes`, `contratos`, `profissionais`, `atributos`, `feriados`, `agendamentos` — é questão de estender o padrão existente).

### H-03. `POST /auth/empresa-options` permite enumerar e-mails cadastrados
- **Local:** `backend/src/auth/auth.controller.ts:15-29`
- **Problema:** endpoint `@Public()` que recebe um e-mail e devolve a lista de empresas associadas — sem rate limit, sem exigir mais nenhuma credencial.
- **Exploração:** um atacante pode testar uma lista de e-mails e descobrir quais estão cadastrados no sistema (resposta vazia `[]` vs lista de empresas) — enumeração de contas.
- **Sugestão:** aplicar rate limiting; considerar não diferenciar a resposta entre "e-mail não existe" e "e-mail existe sem empresa".

### H-04. Nenhum rate limiting em `/auth/login`
- **Local:** `backend/src/auth/auth.controller.ts:31-36`, `backend/src/main.ts`
- **Problema:** não há `@nestjs/throttler` nem qualquer outro mecanismo de limite de tentativas instalado no projeto (confirmado por busca no código e no `package.json`).
- **Sugestão:** adicionar throttling (por IP e/ou por e-mail) no login.

---

## Achados MEDIUM

### M-01. CORS totalmente aberto
- **Local:** `backend/src/main.ts:9` — `app.enableCors()` sem opções.
- **Problema:** por padrão, isso reflete qualquer `Origin` da requisição. Como a API usa Bearer token (não cookies), o risco prático é menor que com auth por cookie, mas ainda permite que qualquer site faça requisições autenticadas se o token vazar por outro canal.
- **Sugestão:** restringir a lista de origens permitidas em produção (`atendimento.bjsoft.com.br` e variações necessárias).

### M-02. Token JWT em `localStorage`
- **Local:** `frontend/src/app/core/auth/auth.service.ts:20,41,59,64`
- **Problema:** abordagem padrão em SPAs, mas vulnerável a roubo via XSS. Não foi encontrado nenhum vetor de XSS ativo no frontend nesta auditoria (ver "Verificado e OK"), então não é explorável hoje — mas não há defesa em profundidade caso surja um XSS futuro.
- **Sugestão:** documentar como risco aceito, ou migrar para cookie `httpOnly` + `SameSite` se o esforço se justificar.

### M-03. Vazamento de dados sensíveis em log
- **Locais:** `frontend/src/app/core/auth/auth.service.ts:70` (loga o token JWT completo no console do navegador) e `backend/src/auth/auth.controller.ts:18` (`console.log` do e-mail recebido em `empresa-options`).
- **Sugestão:** remover esses `console.log` antes de produção.

---

## Achados LOW (conteúdo sem uso)

### L-01. Scripts órfãos na raiz de `backend/`
- **Local:** `backend/fix-db.ts`, `fix_seq.js`, `fix-modules.js`, `capture-error.js`, `check.js`, `check-db.ts`, `migrate.ts`
- **Como verifiquei:** busquei cada nome de arquivo em `backend/package.json` (seção `scripts`) — nenhum deles tem um script `npm run` associado (diferente de `bootstrap-system.ts`, que é usado por `bootstrap:system`). Também não são importados por nenhum arquivo em `src/`.
- **Sugestão:** confirmar que já cumpriram o propósito (parecem correções pontuais já aplicadas) e remover, ou documentar formalmente se ainda tiverem utilidade futura.

### L-02. Tabelas legadas no banco sem referência no schema atual
- **Local:** `menu_items_legacy`, `profile_menu_items_legacy`, `profile_modules_deprecated` (criadas por `manual-migrations/2026-07-18_...sql` e `2026-07-16_...sql` via `RENAME TABLE`)
- **Como verifiquei:** busquei os três nomes em `backend/prisma/schema.prisma` — nenhum aparece, ou seja, não são mais models gerenciados pelo Prisma nem acessíveis via `PrismaService` normalmente.
- **Nota:** os comentários nas próprias migrações dizem que foram mantidas de propósito para auditoria/rollback — não é um esquecimento, é decisão registrada. Ainda assim, vale um prazo de validade combinado com o time antes de dropar de vez.

### L-03. Seis componentes Angular órfãos (sem rota, sem referência)
- **Local:** `clientes-detail.page.ts`, `clientes-excluir.page.ts`, `contratos-detail.page.ts`, `contratos-excluir.page.ts`, `profissionais-detail.page.ts`, `profissionais-excluir.page.ts`
- **Como verifiquei:** conferi `frontend/src/app/app.routes.ts` inteiro — nenhuma rota `detail` ou `excluir` existe (a exclusão hoje é feita inline pela tabela do PO UI, `p-actions.remove: true`, sem página dedicada). Depois busquei o nome de cada classe (`ClientesDetailPage`, etc.) em todo `frontend/src` — só aparecem na própria declaração, nunca importadas em outro lugar.
- **Sugestão:** remover os 6 arquivos, ou religar caso a intenção seja reaproveitá-los futuramente.

### L-04. `$executeRawUnsafe` com string fixa (não é vulnerabilidade, é higiene)
- **Local:** `backend/src/feriados/feriados.service.ts:209`
- **Nota:** a string é 100% fixa, sem interpolação de dado do usuário — não é SQL Injection. Ainda assim, por convenção, prefira `$executeRaw` com template literal (que o Prisma trata como parametrizado) em vez do método "Unsafe".

---

## Verificado e OK

- **SQL Injection:** única ocorrência de `$executeRawUnsafe`/`$queryRawUnsafe` em todo `backend/src` é a do L-04, com string fixa — nenhuma concatenação de input do usuário encontrada.
- **Senha de usuário:** `users.service.ts` sempre usa `omit: { password: true }` nas respostas — hash nunca vaza pela API.
- **`ValidationPipe`** global ativo com `whitelist: true, transform: true` (`main.ts`).
- **Isolamento por tenant correto** em `clientes`, `contratos`, `feriados`, `atributos` — todos usam `req.user.empresaId`/`req.user.tenantId`, que vem do JWT e está sempre populado independente de guard adicional.
- **Dados de referência compartilhados** (`estados`, `municipios`, `ceps`, `paises`, `localidades`) corretamente sem isolamento por empresa — são catálogos globais, não dados de tenant.
- **Frontend:** nenhum uso de `[innerHTML]`, `bypassSecurityTrust` ou `DomSanitizer` em todo `frontend/src` — sem vetor de XSS ativo encontrado.
- **`environment.ts`/`environment.development.ts`:** sem credenciais reais, só a URL da API.
- **Rotas do frontend:** todas as rotas autenticadas em `app.routes.ts` usam `canActivate: [authGuard]`; só `login` e o redirect raiz ficam de fora, como esperado.
- **`bootstrap-system.ts`:** tem script npm associado (`bootstrap:system`) — não é código morto, ao contrário dos demais scripts da raiz.
- **`EmpresaGuard`** aplicado corretamente em `agendamentos` (exceto os dois métodos do C-05) e, após a correção desta sessão, também em `profissionais`.

## Próximos passos sugeridos

Nenhuma correção foi aplicada por este relatório (exceto C-01, já feita fora do escopo do skill, antes desta auditoria formal). Prioridade sugerida: C-02 e C-03 primeiro (escalação de privilégio e gestão de tenants são os mais graves), depois C-04/C-05/C-06 (vazamento financeiro entre empresas), depois H-01 a H-04.
