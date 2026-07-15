-- Reorganiza os Modulos/Rotinas/Menus a partir do modelo definido pelo usuario:
--
--   Inicio | Dashboard
--   Basicos      -> Estados, Municipios, CEP, Paises
--   Cadastro     -> Clientes, Profissionais, Contratos, Feriados, Atributos
--   Atendimentos -> Atendimentos (lista), Calendario
--   Configuracao -> Empresas, Modulos, Rotinas, Menu
--   Usuario      -> Perfil, Usuario
--
-- Tambem cria a rotina "Dashboard" (nao existia), os perfis Analista/Gerente,
-- e garante que ricardo@bjsoft.com.br (quando existir) use o perfil Administrador.
--
-- Requer que as migrations anteriores ja tenham rodado:
--   2026-07-15_add_atributos_multi_cadastro.sql
--   2026-07-15_add_atributos_menu.sql
--   2026-07-16_profile_menus_and_module_groups.sql
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-07-17_reorganize_modules.sql
--
-- E seguro rodar mais de uma vez (idempotente).

BEGIN;

-- 1. Modulos novos + nomes corrigidos
INSERT INTO "modules" ("key", "name")
SELECT 'basicos', 'Básicos'
WHERE NOT EXISTS (SELECT 1 FROM "modules" WHERE "key" = 'basicos');

INSERT INTO "modules" ("key", "name")
SELECT 'atendimentos', 'Atendimentos'
WHERE NOT EXISTS (SELECT 1 FROM "modules" WHERE "key" = 'atendimentos');

INSERT INTO "modules" ("key", "name")
SELECT 'usuarios', 'Usuário'
WHERE NOT EXISTS (SELECT 1 FROM "modules" WHERE "key" = 'usuarios');

UPDATE "modules" SET "name" = 'Cadastro' WHERE "key" = 'cadastros';
UPDATE "modules" SET "name" = 'Configuração' WHERE "key" = 'configuracoes';

-- 2. Rotina nova: Dashboard (nao existia)
INSERT INTO "routines" ("module_id", "name", "key", "path", "icon", "short_label", "sort_order", "is_active")
SELECT (SELECT "id" FROM "modules" WHERE "key" = 'dashboard'), 'Dashboard', 'dashboard-home', '/dashboard', 'an an-gauge', 'DSH', 2, true
WHERE NOT EXISTS (SELECT 1 FROM "routines" WHERE "key" = 'dashboard-home');

-- 3. Move rotinas para os novos modulos
UPDATE "routines" SET "module_id" = (SELECT "id" FROM "modules" WHERE "key" = 'basicos')
WHERE "key" IN ('configuracoes-estados', 'configuracoes-municipios', 'configuracoes-ceps', 'configuracoes-paises');

UPDATE "routines" SET "module_id" = (SELECT "id" FROM "modules" WHERE "key" = 'atendimentos')
WHERE "key" IN ('agendamentos-list', 'agendamentos-calendario');

UPDATE "routines" SET "module_id" = (SELECT "id" FROM "modules" WHERE "key" = 'usuarios')
WHERE "key" IN ('configuracoes-perfis', 'configuracoes-usuarios');

-- 4. Renomeia rotinas (nomes de exibicao)
UPDATE "routines" SET "name" = 'Cadastro' WHERE "key" = 'cadastros-home';
UPDATE "routines" SET "name" = 'Configuração' WHERE "key" = 'configuracoes-home';
UPDATE "routines" SET "name" = 'Módulos' WHERE "key" = 'configuracoes-modulos';
UPDATE "routines" SET "name" = 'Menu' WHERE "key" = 'configuracoes-menus';
UPDATE "routines" SET "name" = 'Perfil' WHERE "key" = 'configuracoes-perfis';
UPDATE "routines" SET "name" = 'Usuário' WHERE "key" = 'configuracoes-usuarios';
UPDATE "routines" SET "name" = 'CEP' WHERE "key" = 'configuracoes-ceps';
UPDATE "routines" SET "name" = 'Atendimentos' WHERE "key" = 'agendamentos-list';
UPDATE "routines" SET "name" = 'Calendário' WHERE "key" = 'agendamentos-calendario';

-- 5. Menus: acompanha a rotina (module_id + label)
UPDATE "menus" m SET "module_id" = r."module_id", "label" = r."name"
FROM "routines" r
WHERE m."routine_id" = r."id"
  AND r."key" IN (
    'configuracoes-estados', 'configuracoes-municipios', 'configuracoes-ceps', 'configuracoes-paises',
    'agendamentos-list', 'agendamentos-calendario',
    'configuracoes-perfis', 'configuracoes-usuarios',
    'cadastros-home', 'configuracoes-home', 'configuracoes-modulos', 'configuracoes-menus'
  );

-- 6. Menu novo: Dashboard (item de topo, ao lado de Inicio)
INSERT INTO "menus" ("module_id", "routine_id", "parent_id", "label", "short_label", "icon", "link", "sort_order", "is_active")
SELECT r."module_id", r."id", NULL, r."name", r."short_label", r."icon", r."path", r."sort_order", true
FROM "routines" r
WHERE r."key" = 'dashboard-home'
  AND NOT EXISTS (SELECT 1 FROM "menus" WHERE "routine_id" = r."id");

-- 6b. Da acesso ao novo menu "Dashboard" pra quem ja tem acesso a algum outro menu
--     ("Inicio" nao precisa disso porque nao tem module_id/routine_id, e por isso
--     e sempre visivel; "Dashboard" tem rotina propria, entao precisa de grant).
INSERT INTO "profile_menus" ("profile_id", "menu_id", "can_read", "can_write")
SELECT DISTINCT pm."profile_id", (SELECT "id" FROM "menus" WHERE "label" = 'Dashboard'), true, true
FROM "profile_menus" pm
ON CONFLICT ("profile_id", "menu_id") DO NOTHING;

-- 7. Menus de grupo novos: Básicos, Atendimentos, Usuário (sem rotina propria).
--    "routine_id" IS NULL no filtro distingue o cabecalho de grupo de um item-folha
--    que por acaso tenha o mesmo label (ex: a rotina "Atendimentos" dentro do grupo
--    "Atendimentos") — sem isso, o cabecalho nunca seria criado e o item-folha
--    acabaria virando pai de si mesmo no passo 8.
INSERT INTO "menus" ("module_id", "routine_id", "parent_id", "label", "short_label", "icon", "link", "sort_order", "is_active")
SELECT (SELECT "id" FROM "modules" WHERE "key" = 'basicos'), NULL, NULL, 'Básicos', 'BAS', 'an an-list-bullets', NULL, 5, true
WHERE NOT EXISTS (SELECT 1 FROM "menus" WHERE "label" = 'Básicos' AND "parent_id" IS NULL AND "routine_id" IS NULL);

INSERT INTO "menus" ("module_id", "routine_id", "parent_id", "label", "short_label", "icon", "link", "sort_order", "is_active")
SELECT (SELECT "id" FROM "modules" WHERE "key" = 'atendimentos'), NULL, NULL, 'Atendimentos', 'ATD', 'an an-calendar-check', NULL, 40, true
WHERE NOT EXISTS (SELECT 1 FROM "menus" WHERE "label" = 'Atendimentos' AND "parent_id" IS NULL AND "routine_id" IS NULL);

INSERT INTO "menus" ("module_id", "routine_id", "parent_id", "label", "short_label", "icon", "link", "sort_order", "is_active")
SELECT (SELECT "id" FROM "modules" WHERE "key" = 'usuarios'), NULL, NULL, 'Usuário', 'USR', 'an an-user-circle', NULL, 80, true
WHERE NOT EXISTS (SELECT 1 FROM "menus" WHERE "label" = 'Usuário' AND "parent_id" IS NULL AND "routine_id" IS NULL);

UPDATE "menus" SET "sort_order" = 5 WHERE "label" = 'Básicos' AND "parent_id" IS NULL AND "routine_id" IS NULL;

-- 8. Reparenta os menus filhos pros novos grupos (mesma ressalva "routine_id IS NULL")
UPDATE "menus" SET "parent_id" = (SELECT "id" FROM "menus" WHERE "label" = 'Básicos' AND "parent_id" IS NULL AND "routine_id" IS NULL)
WHERE "routine_id" IN (SELECT "id" FROM "routines" WHERE "key" IN ('configuracoes-estados', 'configuracoes-municipios', 'configuracoes-ceps', 'configuracoes-paises'));

UPDATE "menus" SET "parent_id" = (SELECT "id" FROM "menus" WHERE "label" = 'Atendimentos' AND "parent_id" IS NULL AND "routine_id" IS NULL)
WHERE "routine_id" IN (SELECT "id" FROM "routines" WHERE "key" IN ('agendamentos-list', 'agendamentos-calendario'));

UPDATE "menus" SET "parent_id" = (SELECT "id" FROM "menus" WHERE "label" = 'Usuário' AND "parent_id" IS NULL AND "routine_id" IS NULL)
WHERE "routine_id" IN (SELECT "id" FROM "routines" WHERE "key" IN ('configuracoes-perfis', 'configuracoes-usuarios'));

-- 9. Modulos antigos de atendimentos (1 por rotina) ficam orfaos, remove
DELETE FROM "modules" WHERE "key" IN ('agendamentos-list', 'agendamentos-calendario');

-- 10. Perfis novos
INSERT INTO "profiles" ("name")
SELECT 'Analista' WHERE NOT EXISTS (SELECT 1 FROM "profiles" WHERE "name" = 'Analista');

INSERT INTO "profiles" ("name")
SELECT 'Gerente' WHERE NOT EXISTS (SELECT 1 FROM "profiles" WHERE "name" = 'Gerente');

-- 11. ricardo@bjsoft.com.br usa o perfil Administrador (no-op se o usuario nao existir)
UPDATE "users" SET "profile_id" = (SELECT "id" FROM "profiles" WHERE "name" = 'Administrador')
WHERE "email" = 'ricardo@bjsoft.com.br';

COMMIT;
