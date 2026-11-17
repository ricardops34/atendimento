-- Adiciona a rotina/menu "Banco de Horas" (tela /banco-horas), que ficou sem item de
-- menu desde que a feature foi introduzida no commit 44fe023: o backend exige a
-- permissao 'banco-horas-list' (MenuGuard) para qualquer rota /banco-horas*, mas nenhuma
-- rotina com essa key existia, entao a tela ficava inacessivel (403) mesmo digitando a
-- URL direto, e sem aparecer na barra lateral.
--
-- O item novo e adicionado em todo Menu que ja mostra "Contratos" (mesma visibilidade
-- por perfil que os demais cadastros de apoio).
--
-- Script manual para aplicar via psql, FORA do fluxo `prisma migrate`
-- (mesmo padrao dos demais scripts em manual-migrations/).
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-11-17d_add_banco_horas_menu.sql
--
-- NAO aplicar sem autorizacao explicita do usuario (regra de protecao de
-- banco de dados do projeto). E seguro rodar mais de uma vez (idempotente).

BEGIN;

-- 1. Rotina "Banco de Horas", no mesmo modulo de Contratos/Profissionais/Feriados
INSERT INTO "routines" ("module_id", "name", "key", "path", "icon", "short_label", "sort_order", "is_active")
SELECT m.module_id, 'Banco de Horas', 'banco-horas-list', '/banco-horas', 'an an-piggy-bank', 'BHR', 16, true
FROM "routines" m
WHERE m.key = 'contratos-list'
ON CONFLICT ("key") DO UPDATE SET
  module_id   = EXCLUDED.module_id,
  name        = EXCLUDED.name,
  path        = EXCLUDED.path,
  icon        = EXCLUDED.icon,
  short_label = EXCLUDED.short_label,
  sort_order  = EXCLUDED.sort_order,
  is_active   = true;

-- 2. Item de menu em todo Menu que ja exibe "Contratos" (mesma visibilidade por perfil)
INSERT INTO "menu_items" ("menu_id", "routine_id", "sort_order", "is_active")
SELECT DISTINCT contratos_item.menu_id, nova_rotina.id, contratos_item.sort_order + 1, true
FROM "menu_items" contratos_item
JOIN "routines" contratos_routine ON contratos_routine.id = contratos_item.routine_id AND contratos_routine.key = 'contratos-list'
JOIN "routines" nova_rotina ON nova_rotina.key = 'banco-horas-list'
ON CONFLICT ("menu_id", "routine_id") DO UPDATE SET is_active = true;

COMMIT;
