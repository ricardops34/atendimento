# Menu Mestre-Detalhe Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Manter um único cadastro de Menu, com cabeçalho e itens editáveis na mesma tela, removendo as rotinas redundantes “Configuração” e “Menus x Rotinas”.

**Architecture:** O endpoint de Menu passa a carregar e salvar seus itens junto com o cabeçalho em uma transação Prisma. A tela de edição mantém uma lista local dos detalhes e usa um modal apenas para incluir ou editar uma linha; o botão Salvar persiste mestre e detalhes juntos. As rotas e arquivos das duas páginas redundantes serão removidos, e uma migration estritamente destrutiva apenas para as duas rotinas eliminará seus vínculos no banco local/produção sem recarregar outros dados.

**Tech Stack:** Angular 21, PO UI 21, NestJS 11, Prisma 6, PostgreSQL, Jest/Vitest.

---

### Task 1: Contrato transacional do mestre-detalhe

**Files:**
- Modify: `backend/src/menus/menus.service.spec.ts`
- Modify: `backend/src/menus/menus.service.ts`
- Modify: `backend/src/menus/menus.controller.ts`

1. Escrever testes que exijam `findOne` com itens e `create/update` salvando cabeçalho e detalhes na mesma transação.
2. Executar o teste e confirmar falha pela ausência do comportamento.
3. Implementar apenas o contrato `{ title, isActive, items[] }`, validando Menu e Rotina e rejeitando Dashboard.
4. Executar os testes do serviço novamente.

### Task 2: Tela única de Menu

**Files:**
- Modify: `frontend/src/app/features/configuracoes/menus/menus-edit.page.ts`
- Modify: `frontend/src/app/core/services/menu.service.ts`
- Create: `frontend/src/app/features/configuracoes/menus/menus-edit.page.spec.ts`

1. Escrever teste da tela para inclusão, edição e exclusão local de itens e payload único no salvar.
2. Executar o teste e confirmar falha pelo detalhe ainda inexistente.
3. Adicionar grade de Módulo, Rotina, Ordem e Ativo, com modal de linha dentro da edição do Menu.
4. Fazer o Salvar enviar cabeçalho e itens na mesma requisição.
5. Executar novamente o teste da tela.

### Task 3: Remover as duas rotinas redundantes

**Files:**
- Modify: `frontend/src/app/app.routes.ts`
- Modify: `frontend/src/app/app.ts`
- Modify: `frontend/src/app/app.spec.ts`
- Modify: `frontend/src/app/features/configuracoes/configuracoes.page.ts`
- Delete: `frontend/src/app/features/configuracoes/configuracoes.page.html`
- Delete: `frontend/src/app/features/configuracoes/configuracoes.page.ts`
- Delete: `frontend/src/app/features/configuracoes/menus-rotinas/menus-rotinas.page.ts`
- Delete: `frontend/src/app/features/configuracoes/menus-rotinas/menus-rotinas-edit.page.ts`
- Create: `backend/prisma/manual-migrations/2026-07-19_remove_configuracoes_home_and_menus_rotinas.sql`
- Modify: `backend/prisma/manual-migrations/2026-07-18_menu_perfil_modulo_rotinas.sql`

1. Escrever/ajustar teste de navegação para garantir que os dois itens não existam.
2. Confirmar a falha antes da remoção.
3. Remover somente as rotas, fallbacks e páginas dessas duas rotinas.
4. Criar SQL idempotente que exclua somente os `menu_items` e `routines` com chaves `configuracoes-home` e `configuracoes-menus-rotinas`.
5. Ajustar a migration-base para não inserir “Menus x Rotinas” em novas instalações.

### Task 4: Verificação local

**Files:**
- No source changes expected.

1. Rodar os testes específicos do backend e frontend.
2. Rodar os builds completos do backend e frontend.
3. Validar a migration em banco temporário e confirmar que apenas as duas rotinas são removidas.
4. Aplicar a migration autorizada no Docker local, recriar apenas backend/frontend e verificar HTTP.
5. Consultar o PostgreSQL para confirmar: zero itens para as duas chaves, demais contagens preservadas e itens do Menu do Administrador mantidos.

