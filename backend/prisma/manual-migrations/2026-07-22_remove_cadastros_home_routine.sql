-- Remove a rotina orfa "cadastros-home" (path /cadastros), que nunca teve
-- rota correspondente no frontend. O cabecalho "Cadastro" exibido no menu
-- ja vem do nome do modulo (modules.name), entao esse item era so um link
-- morto duplicando o titulo do grupo. Mesmo tratamento dado a
-- configuracoes-home e configuracoes-menus-rotinas no
-- 2026-07-19_remove_configuracoes_home_and_menus_rotinas.sql.
-- Idempotente e sem recarga de outros dados.
BEGIN;

DELETE FROM "menu_items"
WHERE "routine_id" IN (
  SELECT "id"
  FROM "routines"
  WHERE "key" = 'cadastros-home'
);

DELETE FROM "routines"
WHERE "key" = 'cadastros-home';

COMMIT;
