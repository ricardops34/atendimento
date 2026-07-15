-- Adiciona SÓ a rotina + item de menu "Atributos" (cadastros > Atributos).
-- Não mexe em outros módulos/rotinas/menus.
--
-- Como aplicar:
--   psql "<DATABASE_URL>" -f backend/prisma/manual-migrations/2026-07-15_add_atributos_menu.sql
--
-- É seguro rodar mais de uma vez (idempotente).

BEGIN;

-- 1. Rotina "Atributos" (upsert pela key única)
INSERT INTO routines (module_id, name, key, path, icon, short_label, sort_order, is_active)
SELECT m.id, 'Atributos', 'attributes-list', '/atributos', 'an an-list-checks', 'ATR', 15, true
FROM modules m
WHERE m.key = 'cadastros'
ON CONFLICT (key) DO UPDATE SET
  module_id   = EXCLUDED.module_id,
  name        = EXCLUDED.name,
  path        = EXCLUDED.path,
  icon        = EXCLUDED.icon,
  short_label = EXCLUDED.short_label,
  sort_order  = EXCLUDED.sort_order,
  is_active   = EXCLUDED.is_active;

-- 2. Item de menu "Atributos", pendurado no menu pai "Cadastros"
INSERT INTO menus (module_id, routine_id, parent_id, label, short_label, icon, link, sort_order, is_active)
SELECT r.module_id, r.id, parent.id, r.name, r.short_label, r.icon, r.path, r.sort_order, true
FROM routines r
JOIN routines cadastros_home ON cadastros_home.key = 'cadastros-home'
LEFT JOIN menus parent ON parent.routine_id = cadastros_home.id
WHERE r.key = 'attributes-list'
  AND NOT EXISTS (
    SELECT 1 FROM menus existing
    WHERE existing.routine_id = r.id OR existing.link = r.path
  );

COMMIT;
