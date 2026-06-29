/*
  Warnings:

  - Added the required column `dt_fim` to the `contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dt_inicio` to the `contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `contrato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contrato" ADD COLUMN     "dt_fim" DATE NOT NULL,
ADD COLUMN     "dt_inicio" DATE NOT NULL,
ADD COLUMN     "tipo" VARCHAR(1) NOT NULL,
ADD COLUMN     "valor_fixo" DECIMAL(10,2),
ADD COLUMN     "valor_hora" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "cliente" ADD COLUMN     "cidade" VARCHAR(255),
ADD COLUMN     "cor" VARCHAR(7),
ADD COLUMN     "endereco" VARCHAR(500),
ADD COLUMN     "estado" VARCHAR(2),
ADD COLUMN     "razao" VARCHAR(255);

-- AlterTable
ALTER TABLE "profissional" ADD COLUMN     "user_id" INTEGER;

-- CreateTable
CREATE TABLE "contrato_profissional" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "profissional_id" INTEGER NOT NULL,

    CONSTRAINT "contrato_profissional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contrato_profissional_contrato_id_profissional_id_key" ON "contrato_profissional"("contrato_id", "profissional_id");

-- AddForeignKey
ALTER TABLE "profissional" ADD CONSTRAINT "profissional_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato_profissional" ADD CONSTRAINT "contrato_profissional_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato_profissional" ADD CONSTRAINT "contrato_profissional_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
