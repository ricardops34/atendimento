-- Remove as tabelas legadas criadas durante a reestruturacao de menu/perfil
-- (2026-07-16 e 2026-07-18), mantidas ate aqui so para auditoria/rollback.
-- Nenhum model do Prisma nem codigo da API referencia essas tabelas.
--
-- IMPORTANTE: operacao irreversivel. Faca backup antes (pg_dump das 3 tabelas)
-- se ainda nao tiver certeza de que nao vai precisar mais delas.
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-07-24_drop_legacy_menu_tables.sql
--
-- Idempotente (DROP TABLE IF EXISTS) — seguro rodar mais de uma vez.

BEGIN;

DROP TABLE IF EXISTS "profile_menu_items_legacy";
DROP TABLE IF EXISTS "menu_items_legacy";
DROP TABLE IF EXISTS "profile_modules_deprecated";

COMMIT;
