-- Adiciona a ordem de apresentacao dos Modulos.
-- Na primeira execucao, preserva a ordem alfabetica atual em intervalos de 10.
-- Execucoes seguintes nao alteram ordens configuradas pelo usuario.
BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'modules'
      AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE "modules"
      ADD COLUMN "sort_order" INTEGER NOT NULL DEFAULT 0;

    WITH ordered_modules AS (
      SELECT "id", ROW_NUMBER() OVER (ORDER BY "name", "id") * 10 AS new_order
      FROM "modules"
    )
    UPDATE "modules" module
    SET "sort_order" = ordered.new_order
    FROM ordered_modules ordered
    WHERE ordered."id" = module."id";
  END IF;
END $$;

COMMIT;
