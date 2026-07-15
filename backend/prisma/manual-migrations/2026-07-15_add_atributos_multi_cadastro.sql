-- Atributos Personalizados (multi-cadastro: Cliente, Empresa, Contrato, Profissional)
--
-- Script manual para aplicar em produção via psql, FORA do fluxo `prisma migrate`
-- (o histórico de migrations deste projeto está com drift em relação ao banco real,
-- então rodar `prisma migrate deploy` aqui poderia tentar reconciliar diferenças que
-- não têm relação com esta mudança).
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-07-15_add_atributos_multi_cadastro.sql
--
-- É seguro rodar mais de uma vez (idempotente).

BEGIN;

ALTER TABLE "cliente"      ADD COLUMN IF NOT EXISTS "atributos" JSONB;
ALTER TABLE "empresas"     ADD COLUMN IF NOT EXISTS "atributos" JSONB;
ALTER TABLE "contrato"     ADD COLUMN IF NOT EXISTS "atributos" JSONB;
ALTER TABLE "profissional" ADD COLUMN IF NOT EXISTS "atributos" JSONB;

CREATE TABLE IF NOT EXISTS "atributo" (
    "id"          SERIAL PRIMARY KEY,
    "empresa_id"  INTEGER NOT NULL,
    "sequencia"   INTEGER NOT NULL DEFAULT 0,
    "titulo"      VARCHAR(255) NOT NULL,
    "tipo"        VARCHAR(20) NOT NULL,
    "tamanho"     INTEGER,
    "obrigatorio" BOOLEAN NOT NULL DEFAULT false,
    "cadastro"    VARCHAR(20) NOT NULL,
    "ativo"       BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "atributo_empresa_id_fkey"
        FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id")
        ON UPDATE CASCADE ON DELETE CASCADE
);

COMMIT;
