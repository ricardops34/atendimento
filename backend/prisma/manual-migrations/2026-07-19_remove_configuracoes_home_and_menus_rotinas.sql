-- Remove somente as duas rotinas redundantes que nao fazem parte do modelo
-- Menu mestre-detalhe. Idempotente e sem recarga de outros dados.
BEGIN;

DELETE FROM "menu_items"
WHERE "routine_id" IN (
  SELECT "id"
  FROM "routines"
  WHERE "key" IN ('configuracoes-home', 'configuracoes-menus-rotinas')
);

DELETE FROM "routines"
WHERE "key" IN ('configuracoes-home', 'configuracoes-menus-rotinas');

COMMIT;
