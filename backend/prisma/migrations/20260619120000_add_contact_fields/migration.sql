-- AlterTable empresas
ALTER TABLE "empresas" ADD COLUMN "cpf_cnpj" VARCHAR(18);
ALTER TABLE "empresas" ADD COLUMN "telefone" VARCHAR(20);
ALTER TABLE "empresas" ADD COLUMN "email" VARCHAR(255);

-- AlterTable cliente
ALTER TABLE "cliente" ADD COLUMN "cpf_cnpj" VARCHAR(18);
ALTER TABLE "cliente" ADD COLUMN "telefone" VARCHAR(20);
ALTER TABLE "cliente" ADD COLUMN "email" VARCHAR(255);