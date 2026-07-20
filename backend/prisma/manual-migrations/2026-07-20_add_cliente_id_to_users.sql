-- Adiciona o vinculo 1:1 opcional entre "cliente" e "users", usado pelo
-- portal de autoatendimento do Cliente (feature 003-acesso-cliente-atendimentos).
--
-- A FK fica na tabela "cliente" (campo "usuario_id"), nao em "users": e um
-- campo do cadastro de Cliente que aponta para o usuario de login vinculado.
-- "usuario_id" e UNIQUE, entao um usuario nunca pode ser vinculado a mais de
-- um Cliente. Usuarios e clientes existentes nao sao afetados (coluna nula
-- por padrao).
--
-- Script manual para aplicar via psql, FORA do fluxo `prisma migrate`
-- (mesmo padrao dos demais scripts em manual-migrations/).
--
-- Como aplicar:
--   psql "<DATABASE_URL>" -f backend/prisma/manual-migrations/2026-07-20_add_cliente_id_to_users.sql
--
-- NAO aplicar sem autorizacao explicita do usuario (regra de protecao de
-- banco de dados do projeto). E seguro rodar mais de uma vez (idempotente).

BEGIN;

ALTER TABLE "cliente"
  ADD COLUMN IF NOT EXISTS "usuario_id" INTEGER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'cliente_usuario_id_key'
    ) THEN
        ALTER TABLE "cliente" ADD CONSTRAINT "cliente_usuario_id_key" UNIQUE ("usuario_id");
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'cliente_usuario_id_fkey'
    ) THEN
        ALTER TABLE "cliente"
          ADD CONSTRAINT "cliente_usuario_id_fkey"
          FOREIGN KEY ("usuario_id") REFERENCES "users"("id")
          ON UPDATE CASCADE ON DELETE SET NULL;
    END IF;
END $$;

COMMIT;
