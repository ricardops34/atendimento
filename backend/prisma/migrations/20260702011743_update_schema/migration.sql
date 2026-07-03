/*
  Warnings:

  - You are about to drop the column `tenant_id` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id` on the `contrato` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id` on the `profissional` table. All the data in the column will be lost.
  - You are about to drop the `empresa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_tenants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `empresa_id` to the `agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliente_id` to the `contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresa_id` to the `profissional` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "agendamento" DROP CONSTRAINT "agendamento_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "contrato" DROP CONSTRAINT "contrato_empresa_id_fkey";

-- DropForeignKey
ALTER TABLE "contrato" DROP CONSTRAINT "contrato_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "empresa" DROP CONSTRAINT "empresa_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "profissional" DROP CONSTRAINT "profissional_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tenants" DROP CONSTRAINT "user_tenants_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tenants" DROP CONSTRAINT "user_tenants_user_id_fkey";

-- AlterTable
ALTER TABLE "agendamento" DROP COLUMN "tenant_id",
ADD COLUMN     "empresa_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contrato" DROP COLUMN "tenant_id",
ADD COLUMN     "cliente_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profissional" DROP COLUMN "tenant_id",
ADD COLUMN     "empresa_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "empresa";

-- DropTable
DROP TABLE "tenants";

-- DropTable
DROP TABLE "user_tenants";

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_empresas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "razao" VARCHAR(255),
    "tipo_pessoa" VARCHAR(1) NOT NULL DEFAULT 'J',
    "documento" VARCHAR(20),
    "data_nascimento" DATE,
    "cep" VARCHAR(8),
    "bairro" VARCHAR(255),
    "numero" VARCHAR(50),
    "complemento" VARCHAR(255),
    "telefone" VARCHAR(20),
    "email" VARCHAR(255),
    "cor" VARCHAR(7),
    "endereco" VARCHAR(500),
    "cidade" VARCHAR(255),
    "estado" VARCHAR(2),

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feriado" (
    "id" SERIAL NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "data" DATE NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(1) NOT NULL DEFAULT 'N',
    "fixo" BOOLEAN NOT NULL DEFAULT true,
    "municipio" VARCHAR(255),

    CONSTRAINT "feriado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado" (
    "id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sigla" VARCHAR(2) NOT NULL,

    CONSTRAINT "estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipio" (
    "id" INTEGER NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cep" (
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "bairro" VARCHAR(255) NOT NULL,
    "municipio_id" INTEGER NOT NULL,
    "estado_id" INTEGER NOT NULL,

    CONSTRAINT "cep_pkey" PRIMARY KEY ("cep")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_slug_key" ON "empresas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_empresas_user_id_empresa_id_key" ON "user_empresas"("user_id", "empresa_id");

-- CreateIndex
CREATE UNIQUE INDEX "feriado_empresa_id_data_key" ON "feriado"("empresa_id", "data");

-- CreateIndex
CREATE UNIQUE INDEX "estado_sigla_key" ON "estado"("sigla");

-- AddForeignKey
ALTER TABLE "user_empresas" ADD CONSTRAINT "user_empresas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_empresas" ADD CONSTRAINT "user_empresas_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissional" ADD CONSTRAINT "profissional_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feriado" ADD CONSTRAINT "feriado_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cep" ADD CONSTRAINT "cep_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cep" ADD CONSTRAINT "cep_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
