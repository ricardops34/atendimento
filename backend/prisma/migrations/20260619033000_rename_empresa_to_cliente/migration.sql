-- Rename table empresa -> cliente
ALTER TABLE "empresa" RENAME TO "cliente";

-- Rename column empresa_id -> cliente_id in contrato
ALTER TABLE "contrato" RENAME COLUMN "empresa_id" TO "cliente_id";

-- Rename constraint names to match new table
ALTER TABLE "cliente" RENAME CONSTRAINT "empresa_pkey" TO "cliente_pkey";
ALTER TABLE "cliente" RENAME CONSTRAINT "empresa_tenant_id_fkey" TO "cliente_tenant_id_fkey";
ALTER TABLE "contrato" RENAME CONSTRAINT "contrato_empresa_id_fkey" TO "contrato_cliente_id_fkey";
