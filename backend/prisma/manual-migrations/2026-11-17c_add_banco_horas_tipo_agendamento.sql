-- Adiciona o controle de banco de horas por atendimento: cada agendamento passa a
-- indicar se e NORMAL (dentro do previsto, nao mexe no saldo), CREDITO (hora extra
-- apontada, soma no saldo) ou DEBITO (hora executada usando o saldo, desconta).
--
-- Script manual para aplicar via psql, FORA do fluxo `prisma migrate`
-- (mesmo padrao dos demais scripts em manual-migrations/).
--
-- Como aplicar:
--   psql "<DATABASE_URL_DE_PRODUCAO>" -f backend/prisma/manual-migrations/2026-11-17c_add_banco_horas_tipo_agendamento.sql
--
-- NAO aplicar sem autorizacao explicita do usuario (regra de protecao de
-- banco de dados do projeto). E seguro rodar mais de uma vez (idempotente).

BEGIN;

ALTER TABLE "agendamento"
  ADD COLUMN IF NOT EXISTS "banco_horas_tipo" VARCHAR(10) NOT NULL DEFAULT 'NORMAL';

COMMIT;
