-- Reestrutura o modelo de permissoes: Perfil passa a se relacionar com Menu
-- (profile_menus), em vez de com Modulo (profile_modules). Modulo vira apenas
-- agrupamento organizacional de Rotina/Menu (ex: Clientes, Profissionais,
-- Contratos e Feriados passam a compartilhar o modulo "cadastros", assim como
-- ja acontece com "settings").
--
-- Script manual para aplicar em producao via psql, FORA do fluxo `prisma migrate`
-- (mesmo motivo do script de atributos: historico de migrations com drift em
-- relacao ao banco real).
--
-- Tambem renomeia as keys tecnicas de Modulo/Rotina que estavam em ingles sem
-- necessidade (companies, professionals, contracts, holidays, appointments-*,
-- settings-*), ja que a key aparece nas telas de administracao Modulos/Rotinas.
--
-- Requer que o script de atributos ja tenha rodado antes:
--   backend/prisma/manual-migrations/2026-07-15_add_atributos_multi_cadastro.sql
--   backend/prisma/manual-migrations/2026-07-15_add_atributos_menu.sql
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-07-16_profile_menus_and_module_groups.sql
--
-- E seguro rodar mais de uma vez (idempotente).

BEGIN;

-- 1. Nova tabela de permissao por item de menu
CREATE TABLE IF NOT EXISTS "profile_menus" (
    "id"         SERIAL PRIMARY KEY,
    "profile_id" INTEGER NOT NULL,
    "menu_id"    INTEGER NOT NULL,
    "can_read"   BOOLEAN NOT NULL DEFAULT true,
    "can_write"  BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "profile_menus_profile_id_fkey"
        FOREIGN KEY ("profile_id") REFERENCES "profiles"("id")
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "profile_menus_menu_id_fkey"
        FOREIGN KEY ("menu_id") REFERENCES "menus"("id")
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "profile_menus_profile_id_menu_id_key" UNIQUE ("profile_id", "menu_id")
);

-- 2. Migra dados de profile_modules -> profile_menus. Um modulo pode ter
--    varios menus (via menus.module_id direto, ou via menus.routine_id ->
--    routines.module_id), entao cada permissao de modulo vira permissao em
--    todos os menus daquele modulo.
DO $$
BEGIN
    IF to_regclass('public.profile_modules') IS NOT NULL THEN
        INSERT INTO "profile_menus" ("profile_id", "menu_id", "can_read", "can_write")
        SELECT DISTINCT pm."profile_id", m."id", pm."can_read", pm."can_write"
        FROM "profile_modules" pm
        JOIN "menus" m
          ON m."module_id" = pm."module_id"
          OR m."routine_id" IN (SELECT r."id" FROM "routines" r WHERE r."module_id" = pm."module_id")
        ON CONFLICT ("profile_id", "menu_id") DO UPDATE
        SET "can_read"  = "profile_menus"."can_read"  OR EXCLUDED."can_read",
            "can_write" = "profile_menus"."can_write" OR EXCLUDED."can_write";
    END IF;
END $$;

-- 3. Consolida os modulos-filhos de "Cadastros" no proprio modulo "cadastros"
--    (modulo = grupo do menu, mesmo padrao ja usado em "settings").
UPDATE "routines" SET "module_id" = (SELECT "id" FROM "modules" WHERE "key" = 'cadastros')
WHERE "module_id" IN (SELECT "id" FROM "modules" WHERE "key" IN ('companies', 'professionals', 'contracts', 'holidays'));

UPDATE "menus" SET "module_id" = (SELECT "id" FROM "modules" WHERE "key" = 'cadastros')
WHERE "module_id" IN (SELECT "id" FROM "modules" WHERE "key" IN ('companies', 'professionals', 'contracts', 'holidays'));

DELETE FROM "modules" WHERE "key" IN ('companies', 'professionals', 'contracts', 'holidays');

-- 3b. Corrige o nome de exibicao dos modulos restantes (estava igual ao key, em ingles)
UPDATE "modules" SET "name" = 'Inicio' WHERE "key" = 'dashboard';
UPDATE "modules" SET "name" = 'Cadastros' WHERE "key" = 'cadastros';
UPDATE "modules" SET "name" = 'Calendario' WHERE "key" = 'appointments-calendar';
UPDATE "modules" SET "name" = 'Lista de Atendimentos' WHERE "key" = 'appointments-list';
UPDATE "modules" SET "name" = 'Configuracoes' WHERE "key" = 'settings';

-- 4. Aposenta profile_modules (dados ja migrados para profile_menus no passo 2).
--    Mantido renomeado em vez de excluido, para auditoria/rollback.
DO $$
BEGIN
    IF to_regclass('public.profile_modules') IS NOT NULL THEN
        ALTER TABLE "profile_modules" RENAME TO "profile_modules_deprecated";
    END IF;
END $$;

-- 5. Renomeia keys tecnicas de modulo/rotina para portugues (sao visiveis nas
--    telas de administracao Modulos/Rotinas e nao batiam com o restante do sistema,
--    que ja usa nomes de dominio em portugues: Cliente, Profissional, Contrato,
--    Feriado, Agendamento, Configuracoes...).
UPDATE "modules" SET "key" = 'agendamentos-calendario' WHERE "key" = 'appointments-calendar';
UPDATE "modules" SET "key" = 'agendamentos-list'       WHERE "key" = 'appointments-list';
UPDATE "modules" SET "key" = 'configuracoes'           WHERE "key" = 'settings';

UPDATE "routines" SET "key" = 'clientes-list'            WHERE "key" = 'companies-list';
UPDATE "routines" SET "key" = 'profissionais-list'       WHERE "key" = 'professionals-list';
UPDATE "routines" SET "key" = 'contratos-list'           WHERE "key" = 'contracts-list';
UPDATE "routines" SET "key" = 'feriados-list'            WHERE "key" = 'holidays-list';
UPDATE "routines" SET "key" = 'atributos-list'           WHERE "key" = 'attributes-list';
UPDATE "routines" SET "key" = 'agendamentos-list'        WHERE "key" = 'appointments-list';
UPDATE "routines" SET "key" = 'agendamentos-calendario'  WHERE "key" = 'appointments-calendar';
UPDATE "routines" SET "key" = 'configuracoes-home'       WHERE "key" = 'settings-home';
UPDATE "routines" SET "key" = 'configuracoes-empresas'   WHERE "key" = 'settings-empresas';
UPDATE "routines" SET "key" = 'configuracoes-modulos'    WHERE "key" = 'settings-modules';
UPDATE "routines" SET "key" = 'configuracoes-rotinas'    WHERE "key" = 'settings-routines';
UPDATE "routines" SET "key" = 'configuracoes-perfis'     WHERE "key" = 'settings-profiles';
UPDATE "routines" SET "key" = 'configuracoes-menus'      WHERE "key" = 'settings-menus';
UPDATE "routines" SET "key" = 'configuracoes-usuarios'   WHERE "key" = 'settings-users';
UPDATE "routines" SET "key" = 'configuracoes-estados'    WHERE "key" = 'settings-estados';
UPDATE "routines" SET "key" = 'configuracoes-municipios' WHERE "key" = 'settings-municipios';
UPDATE "routines" SET "key" = 'configuracoes-ceps'       WHERE "key" = 'settings-ceps';
UPDATE "routines" SET "key" = 'configuracoes-paises'     WHERE "key" = 'settings-paises';

COMMIT;
