-- Rename tenants table -> empresas
ALTER TABLE "tenants" RENAME TO "empresas";

-- Rename user_tenants table -> user_empresas
ALTER TABLE "user_tenants" RENAME TO "user_empresas";

-- Rename tenant_id column in user_empresas
ALTER TABLE "user_empresas" RENAME COLUMN "tenant_id" TO "empresa_id";

-- Rename tenant_id column in cliente
ALTER TABLE "cliente" RENAME COLUMN "tenant_id" TO "empresa_id";

-- Rename tenant_id column in profissional
ALTER TABLE "profissional" RENAME COLUMN "tenant_id" TO "empresa_id";

-- Rename tenant_id column in contrato
ALTER TABLE "contrato" RENAME COLUMN "tenant_id" TO "empresa_id";

-- Rename tenant_id column in agendamento
ALTER TABLE "agendamento" RENAME COLUMN "tenant_id" TO "empresa_id";
