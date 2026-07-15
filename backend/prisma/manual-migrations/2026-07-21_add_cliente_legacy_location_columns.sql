-- Alinha a tabela restaurada de clientes com os campos legados opcionais
-- ainda previstos no Prisma. Nao altera nem recarrega registros existentes.
BEGIN;

ALTER TABLE "cliente"
  ADD COLUMN IF NOT EXISTS "cidade" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "estado" VARCHAR(2),
  ADD COLUMN IF NOT EXISTS "pais" VARCHAR(255);

COMMIT;
