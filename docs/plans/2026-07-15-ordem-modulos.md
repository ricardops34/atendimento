# Ordem de Módulos Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Adicionar uma ordem configurável aos Módulos e usá-la na manutenção e na apresentação dos grupos do menu.

**Architecture:** A tabela `modules` receberá `sort_order INTEGER NOT NULL DEFAULT 0`. O backend normalizará o campo e ordenará por `sortOrder, name`; o menu de sessão aplicará a mesma regra. A manutenção exibirá e editará `Ordem` sem alterar rotinas ou itens de menu.

**Tech Stack:** PostgreSQL, Prisma 6, NestJS 11, Angular 21, PO UI 21, Jest.

---

### Task 1: Contrato de ordenação

**Files:**
- Create: `backend/src/system-modules/system-modules.service.spec.ts`
- Modify: `backend/src/auth/auth.service.spec.ts`

1. Testar que a busca de módulos ordena por `sortOrder` e nome.
2. Testar que os grupos da sessão respeitam `module.sortOrder` antes do nome.
3. Executar e confirmar as falhas pelo comportamento ainda inexistente.

### Task 2: Schema e API

**Files:**
- Modify: `backend/prisma/schema.prisma`
- Modify: `backend/src/system-modules/system-modules.service.ts`
- Modify: `backend/src/auth/auth.service.ts`
- Create: `backend/prisma/manual-migrations/2026-07-20_add_module_sort_order.sql`

1. Adicionar `sortOrder` ao model `Module`.
2. Mapear somente `name`, `key` e `sortOrder` nos writes da API.
3. Ordenar busca/listagem e menu por ordem e nome.
4. Criar migration idempotente e inicializar módulos existentes em intervalos de 10 por nome.
5. Executar os testes novamente.

### Task 3: Manutenção e verificação

**Files:**
- Modify: `frontend/src/app/features/configuracoes/modulos/modulos.page.ts`
- Modify: `frontend/src/app/features/configuracoes/modulos/modulos-edit.page.ts`
- Modify: `frontend/src/app/core/services/system-module.service.ts`

1. Adicionar `Ordem` à listagem, filtros/tipos e formulário.
2. Compilar backend e frontend.
3. Validar a migration duas vezes em banco temporário.
4. Aplicar no Docker local autorizado e confirmar somente a nova coluna/valores.
5. Recriar backend/frontend e verificar API, sessão e HTTP.

