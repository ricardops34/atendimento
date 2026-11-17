-- Adiciona os campos/tabelas da feature de hierarquia Gerente/Analista e de
-- banco de horas por profissional/contrato (commit 44fe023 "Ajustes"), que
-- alterou backend/prisma/schema.prisma sem gerar uma migration do Prisma.
-- Sem este script, a API quebra em producao com PrismaClientKnownRequestError
-- P2022 (coluna/tabela inexistente) ao listar profissionais e ao abrir um
-- contrato para edicao.
--
-- Script manual para aplicar via psql, FORA do fluxo `prisma migrate`
-- (mesmo padrao dos demais scripts em manual-migrations/: o historico de
-- migrations deste projeto esta com drift em relacao ao banco real).
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-11-17_add_gerente_e_banco_horas.sql
--
-- NAO aplicar sem autorizacao explicita do usuario (regra de protecao de
-- banco de dados do projeto). E seguro rodar mais de uma vez (idempotente).

BEGIN;

-- 1. profissional.gerente_id (RBAC: Gerente enxerga os Analistas que apontam para ele)
ALTER TABLE "profissional"
  ADD COLUMN IF NOT EXISTS "gerente_id" INTEGER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'profissional_gerente_id_fkey'
    ) THEN
        ALTER TABLE "profissional"
          ADD CONSTRAINT "profissional_gerente_id_fkey"
          FOREIGN KEY ("gerente_id") REFERENCES "profissional"("id")
          ON UPDATE CASCADE ON DELETE SET NULL;
    END IF;
END $$;

-- 2. contrato_profissional: sobreposicoes de valor/limite e saldo de banco de horas
ALTER TABLE "contrato_profissional"
  ADD COLUMN IF NOT EXISTS "valor_hora" DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS "valor_fixo" DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS "max_horas_mes" DECIMAL(6,2),
  ADD COLUMN IF NOT EXISTS "modo_excedente" VARCHAR(10),
  ADD COLUMN IF NOT EXISTS "saldo_banco_horas" DECIMAL(8,2) NOT NULL DEFAULT 0;

-- 3. Extrato de movimentacoes do banco de horas (credito/debito)
CREATE TABLE IF NOT EXISTS "banco_horas_movimento" (
    "id"                        SERIAL PRIMARY KEY,
    "contrato_profissional_id"  INTEGER NOT NULL,
    "tipo"                      VARCHAR(10) NOT NULL,
    "horas"                     DECIMAL(8,2) NOT NULL,
    "data"                      DATE NOT NULL,
    "descricao"                 VARCHAR(255),
    "agendamento_id"            INTEGER,
    "created_at"                TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'banco_horas_movimento_contrato_profissional_id_fkey'
    ) THEN
        ALTER TABLE "banco_horas_movimento"
          ADD CONSTRAINT "banco_horas_movimento_contrato_profissional_id_fkey"
          FOREIGN KEY ("contrato_profissional_id") REFERENCES "contrato_profissional"("id")
          ON UPDATE CASCADE ON DELETE CASCADE;
    END IF;
END $$;

-- 4. Fechamento mensal de horas lancadas (base para apurar o excedente)
CREATE TABLE IF NOT EXISTS "contrato_profissional_apontamento_mensal" (
    "id"                        SERIAL PRIMARY KEY,
    "contrato_profissional_id"  INTEGER NOT NULL,
    "competencia"               VARCHAR(7) NOT NULL,
    "horas_lancadas"            DECIMAL(8,2) NOT NULL DEFAULT 0,
    "horas_excedente"           DECIMAL(8,2) NOT NULL DEFAULT 0
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'contrato_profissional_apontamento_mensal_contrato_profissi_fkey'
    ) THEN
        ALTER TABLE "contrato_profissional_apontamento_mensal"
          ADD CONSTRAINT "contrato_profissional_apontamento_mensal_contrato_profissi_fkey"
          FOREIGN KEY ("contrato_profissional_id") REFERENCES "contrato_profissional"("id")
          ON UPDATE CASCADE ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'contrato_profissional_apontamento_mensal_contrato_profiss_key'
    ) THEN
        ALTER TABLE "contrato_profissional_apontamento_mensal"
          ADD CONSTRAINT "contrato_profissional_apontamento_mensal_contrato_profiss_key"
          UNIQUE ("contrato_profissional_id", "competencia");
    END IF;
END $$;

COMMIT;
