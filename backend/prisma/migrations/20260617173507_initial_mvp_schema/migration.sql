-- CreateTable
CREATE TABLE "tenants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_modules" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "module_id" INTEGER NOT NULL,
    "can_read" BOOLEAN NOT NULL DEFAULT true,
    "can_write" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profile_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profissional" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contrato" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "cor" VARCHAR(7) NOT NULL DEFAULT '#333333',
    "is_feriado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contrato_item" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "profissional_id" INTEGER NOT NULL,
    "dia_semana" INTEGER NOT NULL,
    "hora_inicio" VARCHAR(5) NOT NULL,
    "hora_fim" VARCHAR(5) NOT NULL,
    "intervalo_ini" VARCHAR(5) NOT NULL,
    "intervalo_fim" VARCHAR(5) NOT NULL,

    CONSTRAINT "contrato_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamento" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "contrato_id" INTEGER,
    "profissional_id" INTEGER,
    "descricao" VARCHAR(500) NOT NULL,
    "data_agenda" DATE NOT NULL,
    "hora_inicio" VARCHAR(5) NOT NULL,
    "hora_fim" VARCHAR(5) NOT NULL,
    "hora_intervalo_inicial" VARCHAR(5) NOT NULL DEFAULT '00:00',
    "hora_intervalo_final" VARCHAR(5) NOT NULL DEFAULT '00:00',
    "duracao_minutos" INTEGER NOT NULL,
    "horario_inicial" TIMESTAMPTZ NOT NULL,
    "horario_final" TIMESTAMPTZ NOT NULL,
    "local" VARCHAR(1) NOT NULL DEFAULT 'P',
    "tipo" VARCHAR(1) NOT NULL DEFAULT 'A',
    "cor" VARCHAR(7) NOT NULL DEFAULT '#333333',
    "observacao" TEXT,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realizado" (
    "id" SERIAL NOT NULL,
    "agendamento_id" INTEGER NOT NULL,
    "horas_decimais" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "realizado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenant_id_email_key" ON "users"("tenant_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_tenant_id_name_key" ON "profiles"("tenant_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "modules_key_key" ON "modules"("key");

-- CreateIndex
CREATE UNIQUE INDEX "profile_modules_profile_id_module_id_key" ON "profile_modules"("profile_id", "module_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_modules" ADD CONSTRAINT "profile_modules_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_modules" ADD CONSTRAINT "profile_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresa" ADD CONSTRAINT "empresa_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profissional" ADD CONSTRAINT "profissional_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato_item" ADD CONSTRAINT "contrato_item_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrato_item" ADD CONSTRAINT "contrato_item_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_profissional_id_fkey" FOREIGN KEY ("profissional_id") REFERENCES "profissional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realizado" ADD CONSTRAINT "realizado_agendamento_id_fkey" FOREIGN KEY ("agendamento_id") REFERENCES "agendamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
