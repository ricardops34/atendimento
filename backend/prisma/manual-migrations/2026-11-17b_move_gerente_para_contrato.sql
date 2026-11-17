-- Corrige o modelo de RBAC do Gerente: o Gerente e responsavel pelo CONTRATO
-- (nao pelo Analista diretamente). Ele gerencia/acompanha os profissionais
-- (Analistas) alocados no contrato via "contrato_profissional" (que ja existia).
--
-- Substitui o script anterior (2026-11-17_add_gerente_e_banco_horas.sql), que
-- havia colocado "gerente_id" em "profissional" (Analista aponta pro Gerente).
-- Esse campo nunca chegou a ser usado em producao (feature ainda nao exposta
-- em tela), entao e seguro remove-lo.
--
-- Script manual para aplicar via psql, FORA do fluxo `prisma migrate`
-- (mesmo padrao dos demais scripts em manual-migrations/).
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-11-17b_move_gerente_para_contrato.sql
--
-- NAO aplicar sem autorizacao explicita do usuario (regra de protecao de
-- banco de dados do projeto). E seguro rodar mais de uma vez (idempotente).

BEGIN;

-- 1. Remove profissional.gerente_id (e a FK associada)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'profissional_gerente_id_fkey'
    ) THEN
        ALTER TABLE "profissional" DROP CONSTRAINT "profissional_gerente_id_fkey";
    END IF;
END $$;

ALTER TABLE "profissional"
  DROP COLUMN IF EXISTS "gerente_id";

-- 2. Adiciona contrato.gerente_id (Gerente responsável pelo contrato)
ALTER TABLE "contrato"
  ADD COLUMN IF NOT EXISTS "gerente_id" INTEGER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'contrato_gerente_id_fkey'
    ) THEN
        ALTER TABLE "contrato"
          ADD CONSTRAINT "contrato_gerente_id_fkey"
          FOREIGN KEY ("gerente_id") REFERENCES "profissional"("id")
          ON UPDATE CASCADE ON DELETE SET NULL;
    END IF;
END $$;

COMMIT;
