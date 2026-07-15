-- Modelo de navegacao: Usuario -> Perfil -> Menu -> Modulo -> Rotinas.
--
-- Objetivos:
--   1. Preservar as tabelas atuais de itens/permissoes como legado.
--   2. Ajustar "menus" para ser o cabecalho (titulo + ativo/inativo).
--   3. Criar "menu_items" como Menu x Rotina (o modulo vem da rotina).
--   4. Associar um Menu ao Perfil por profiles.menu_id.
--   5. Converter as permissoes atuais sem apagar ou recarregar dados de dominio.
--
-- Nao executa restore, TRUNCATE, seed nem altera dados operacionais.
-- Idempotente: pode ser executado novamente apos uma aplicacao bem-sucedida.

BEGIN;

-- Preserva o modelo anterior. Renomear mantem dados, indices e FKs intactos.
DO $$
BEGIN
  IF to_regclass('public.menu_items_legacy') IS NULL
     AND EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'menus' AND column_name = 'label'
     ) THEN
    ALTER TABLE "menus" RENAME TO "menu_items_legacy";
  END IF;

  IF to_regclass('public.profile_menu_items_legacy') IS NULL
     AND to_regclass('public.profile_menus') IS NOT NULL THEN
    ALTER TABLE "profile_menus" RENAME TO "profile_menu_items_legacy";
  END IF;
END $$;

CREATE SEQUENCE IF NOT EXISTS "app_menus_id_seq";

CREATE TABLE IF NOT EXISTS "menus" (
  "id"        INTEGER NOT NULL DEFAULT nextval('app_menus_id_seq'),
  "title"     VARCHAR(255) NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "app_menus_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "app_menus_title_key" UNIQUE ("title")
);

ALTER SEQUENCE "app_menus_id_seq" OWNED BY "menus"."id";

CREATE TABLE IF NOT EXISTS "menu_items" (
  "id"         SERIAL NOT NULL,
  "menu_id"    INTEGER NOT NULL,
  "routine_id" INTEGER NOT NULL,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active"  BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "menu_items_menu_id_routine_id_key" UNIQUE ("menu_id", "routine_id"),
  CONSTRAINT "menu_items_menu_id_fkey"
    FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "menu_items_routine_id_fkey"
    FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "menu_id" INTEGER;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_menu_id_fkey') THEN
    ALTER TABLE "profiles"
      ADD CONSTRAINT "profiles_menu_id_fkey"
      FOREIGN KEY ("menu_id") REFERENCES "menus"("id")
      ON UPDATE CASCADE ON DELETE SET NULL;
  END IF;
END $$;

-- Um cabecalho de menu para cada perfil atual.
INSERT INTO "menus" ("title", "is_active")
SELECT 'Menu do ' || p."name", true
FROM "profiles" p
ON CONFLICT ("title") DO NOTHING;

UPDATE "profiles" p
SET "menu_id" = m."id"
FROM "menus" m
WHERE m."title" = 'Menu do ' || p."name"
  AND p."menu_id" IS NULL;

-- Converte somente rotinas que ja estavam liberadas para cada perfil.
DO $$
BEGIN
  IF to_regclass('public.profile_menu_items_legacy') IS NOT NULL
     AND to_regclass('public.menu_items_legacy') IS NOT NULL THEN
    INSERT INTO "menu_items" ("menu_id", "routine_id", "sort_order", "is_active")
    SELECT DISTINCT p."menu_id", legacy_item."routine_id", legacy_item."sort_order", legacy_item."is_active"
    FROM "profile_menu_items_legacy" permission
    JOIN "profiles" p ON p."id" = permission."profile_id"
    JOIN "menu_items_legacy" legacy_item ON legacy_item."id" = permission."menu_id"
    JOIN "routines" legacy_routine ON legacy_routine."id" = legacy_item."routine_id"
    WHERE permission."can_read" = true
      AND p."menu_id" IS NOT NULL
      AND legacy_item."routine_id" IS NOT NULL
      AND legacy_routine."key" NOT IN ('dashboard-home', 'configuracoes-home', 'configuracoes-menus-rotinas')
    ON CONFLICT ("menu_id", "routine_id") DO UPDATE SET
      "sort_order" = EXCLUDED."sort_order",
      "is_active" = EXCLUDED."is_active";
  END IF;
END $$;

-- Inicio/Home aponta diretamente para /dashboard; Dashboard nao e item configuravel.
DELETE FROM "menu_items" item
USING "routines" routine
WHERE routine."id" = item."routine_id"
  AND routine."key" = 'dashboard-home';

COMMIT;
