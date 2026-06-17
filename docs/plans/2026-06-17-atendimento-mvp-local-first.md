# Atendimento MVP Local-First Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Deixar o novo sistema de atendimento rodando localmente de ponta a ponta, aproveitando a base existente em `backend/` e `frontend/`, com backend NestJS, frontend Angular + PO-UI, Prisma/PostgreSQL, importação principal do legado e telas críticas integradas.

**Architecture:** A implementação seguirá a topologia já iniciada no repositório, completando o backend modular existente e as telas Angular já scaffoldadas. O foco é fechar primeiro a execução local completa, depois estabilizar ETL, autenticação mínima, integrações e testes de regressão principais.

**Tech Stack:** NestJS 11, Prisma, PostgreSQL, Angular 21, PO-UI, FullCalendar, Jest/Vitest, TypeScript

---

### Task 1: Baseline do ambiente e lacunas reais

**Files:**
- Modify: `docs/plans/2026-06-17-atendimento-mvp-local-first.md`
- Check: `backend/package.json`
- Check: `frontend/package.json`
- Check: `backend/prisma/schema.prisma`

**Step 1: Levantar o estado atual do workspace**

Run: `npm --prefix backend test -- --runInBand`
Expected: falhas reais que mostrem os gaps atuais do backend

**Step 2: Levantar o estado atual do frontend**

Run: `npm --prefix frontend test -- --runInBand`
Expected: falhas reais ou ausência de configuração que mostrem os gaps atuais do frontend

**Step 3: Levantar build atual**

Run: `npm run build:all`
Expected: erros concretos de compilação ou build

**Step 4: Anotar os gaps confirmados**

Registrar os módulos quebrados encontrados e usá-los para ordenar as próximas tasks.

### Task 2: Fechar backend de agendamentos e realizados

**Files:**
- Modify: `backend/src/agendamentos/agendamentos.controller.ts`
- Modify: `backend/src/agendamentos/agendamentos.service.ts`
- Modify: `backend/src/agendamentos/dto/create-agendamento.dto.ts`
- Modify: `backend/src/agendamentos/dto/update-agendamento.dto.ts`
- Modify: `backend/src/realizados/realizados.controller.ts`
- Modify: `backend/src/realizados/realizados.service.ts`
- Test: `backend/src/agendamentos/agendamentos.service.spec.ts`
- Test: `backend/src/agendamentos/agendamentos.controller.spec.ts`
- Test: `backend/src/realizados/realizados.service.spec.ts`

**Step 1: Escrever testes faltantes para regras críticas**

Cobrir:
- herança de contrato
- cálculo de duração líquida
- imutabilidade de agendamento não `A`
- confirmação individual
- fechamento em lote

**Step 2: Rodar os testes para falhar corretamente**

Run: `npm --prefix backend test -- agendamentos real izados --runInBand`
Expected: FAIL apontando comportamento faltante

**Step 3: Implementar o mínimo para passar**

Adicionar endpoints e lógica faltante sem inflar camadas.

**Step 4: Rodar os testes novamente**

Run: `npm --prefix backend test -- --runInBand`
Expected: PASS nos testes atualizados de backend

### Task 3: Fechar cadastros de apoio e consistência de API

**Files:**
- Modify: `backend/src/empresas/*`
- Modify: `backend/src/profissionais/*`
- Modify: `backend/src/contratos/*`
- Modify: `backend/src/app.module.ts`
- Test: `backend/src/empresas/*.spec.ts`
- Test: `backend/src/profissionais/*.spec.ts`
- Test: `backend/src/contratos/*.spec.ts`

**Step 1: Escrever testes para CRUD mínimo e listagens usadas pelo frontend**

Cobrir:
- listagem simples
- criação/edição básica
- shape de resposta esperado pelos combos do frontend

**Step 2: Rodar os testes para falhar**

Run: `npm --prefix backend test -- --runInBand`
Expected: FAIL nos pontos ainda não implementados

**Step 3: Implementar o mínimo para integração**

Garantir respostas consistentes para `empresa`, `profissional` e `contrato`.

**Step 4: Verificar**

Run: `npm --prefix backend test -- --runInBand`
Expected: PASS

### Task 4: Fechar autenticação/local config mínima

**Files:**
- Modify: `backend/src/auth/*`
- Modify: `backend/prisma/seed.ts`
- Modify: `backend/README.md`
- Create or Modify: `backend/.env.example`
- Test: `backend/src/auth/*.spec.ts`

**Step 1: Escrever teste para login mínimo**

Cobrir emissão de token e credenciais seeded.

**Step 2: Rodar falha**

Run: `npm --prefix backend test -- --runInBand`
Expected: FAIL mostrando o gap no fluxo de login

**Step 3: Implementar o mínimo**

Deixar login funcional para uso local com usuário seed/admin.

**Step 4: Verificar**

Run: `npm --prefix backend test -- --runInBand`
Expected: PASS

### Task 5: Fechar Prisma, seed e ETL principal

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Modify: `backend/prisma/seed.ts`
- Modify: `backend/src/modules/import/import-legacy.command.ts`
- Modify: `backend/test-mysql.ts`
- Create or Modify: `backend/.env.example`
- Test: `backend/src/modules/import/*.spec.ts` or focused tests in existing spec files

**Step 1: Escrever testes para transformações de importação**

Cobrir:
- sanitização de cor
- conversão de duração para minutos
- criação de datetimes
- importação de realizados

**Step 2: Rodar falha**

Run: `npm --prefix backend test -- --runInBand`
Expected: FAIL nos cenários de ETL

**Step 3: Implementar o mínimo**

Completar o importador para rodar com configuração local previsível.

**Step 4: Verificar testes**

Run: `npm --prefix backend test -- --runInBand`
Expected: PASS

### Task 6: Fechar frontend das telas críticas

**Files:**
- Modify: `frontend/src/app/app.routes.ts`
- Modify: `frontend/src/app/app.ts`
- Modify: `frontend/src/app/app.html`
- Modify: `frontend/src/app/core/services/agendamento.service.ts`
- Modify: `frontend/src/app/core/services/contrato.service.ts`
- Modify: `frontend/src/app/core/services/empresa.service.ts`
- Modify: `frontend/src/app/core/services/profissional.service.ts`
- Modify: `frontend/src/app/features/agendamentos/lista/*`
- Modify: `frontend/src/app/features/agendamentos/calendario/*`
- Modify: `frontend/src/app/features/agendamentos/components/form-sidebar/*`
- Test: `frontend/src/app/features/agendamentos/lista/lista.spec.ts`
- Test: `frontend/src/app/features/agendamentos/calendario/calendario.spec.ts`
- Test: `frontend/src/app/features/agendamentos/components/form-sidebar/form-sidebar.spec.ts`

**Step 1: Escrever testes para os fluxos principais**

Cobrir:
- carregar listagem
- confirmar atendimento
- abrir sidebar para novo/edição
- carregar eventos no calendário
- salvar formulário

**Step 2: Rodar testes para falhar**

Run: `npm --prefix frontend test -- --runInBand`
Expected: FAIL nos fluxos incompletos

**Step 3: Implementar o mínimo**

Completar integração com API e estados básicos da UI.

**Step 4: Verificar**

Run: `npm --prefix frontend test -- --runInBand`
Expected: PASS

### Task 7: Integração local e documentação operacional

**Files:**
- Modify: `package.json`
- Modify: `backend/README.md`
- Modify: `frontend/README.md`
- Create or Modify: `.env.example`

**Step 1: Padronizar comandos locais**

Garantir scripts claros para:
- banco
- migrate
- seed
- import legado
- backend
- frontend

**Step 2: Verificar build**

Run: `npm run build:all`
Expected: exit 0

**Step 3: Verificar backend**

Run: `npm --prefix backend test -- --runInBand`
Expected: exit 0

**Step 4: Verificar frontend**

Run: `npm --prefix frontend test -- --runInBand`
Expected: exit 0

### Task 8: Subir e validar execução fim a fim

**Files:**
- No code change required unless integration gaps appear

**Step 1: Subir dependências do banco**

Run: comando local apropriado para PostgreSQL do projeto
Expected: banco disponível

**Step 2: Aplicar Prisma**

Run: `npm --prefix backend exec prisma migrate dev`
Expected: schema aplicado

**Step 3: Popular seed e/ou importação**

Run: `npm --prefix backend exec prisma db seed`
Expected: usuário e dados mínimos locais disponíveis

**Step 4: Subir backend**

Run: `npm run dev:backend`
Expected: API disponível localmente

**Step 5: Subir frontend**

Run: `npm run dev:frontend`
Expected: SPA disponível localmente

**Step 6: Verificação final**

Run: `npm run build:all`
Expected: exit 0

Run: `npm --prefix backend test -- --runInBand`
Expected: exit 0

Run: `npm --prefix frontend test -- --runInBand`
Expected: exit 0
