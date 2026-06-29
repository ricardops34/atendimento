-- =============================================================================
-- Extend Cliente and Empresa with full PF/PJ + address fields
-- Add shared reference tables: paises, estados, municipios (IBGE)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Remove cpf_cnpj (single field) added in previous migration
-- ---------------------------------------------------------------------------
ALTER TABLE "empresas" DROP COLUMN IF EXISTS "cpf_cnpj";
ALTER TABLE "cliente"  DROP COLUMN IF EXISTS "cpf_cnpj";

-- ---------------------------------------------------------------------------
-- 2. Rename existing cliente columns to new names
-- ---------------------------------------------------------------------------
ALTER TABLE "cliente" RENAME COLUMN "razao"    TO "razao_social";
ALTER TABLE "cliente" RENAME COLUMN "endereco" TO "logradouro";
ALTER TABLE "cliente" RENAME COLUMN "cidade"   TO "municipio";
ALTER TABLE "cliente" RENAME COLUMN "estado"   TO "uf";

-- ---------------------------------------------------------------------------
-- 3. Extend cliente with full PF/PJ + address fields
-- ---------------------------------------------------------------------------
ALTER TABLE "cliente"
  ADD COLUMN "tipo_pessoa"          VARCHAR(2)   NOT NULL DEFAULT 'PJ',
  ADD COLUMN "cnpj"                 VARCHAR(18),
  ADD COLUMN "inscricao_estadual"   VARCHAR(20),
  ADD COLUMN "inscricao_municipal"  VARCHAR(20),
  ADD COLUMN "cpf"                  VARCHAR(14),
  ADD COLUMN "rg"                   VARCHAR(20),
  ADD COLUMN "data_nascimento"      DATE,
  ADD COLUMN "celular"              VARCHAR(20),
  ADD COLUMN "cep"                  VARCHAR(9),
  ADD COLUMN "numero"               VARCHAR(10),
  ADD COLUMN "complemento"          VARCHAR(100),
  ADD COLUMN "bairro"               VARCHAR(100),
  ADD COLUMN "pais"                 VARCHAR(50) DEFAULT 'Brasil';

-- Adjust logradouro length (was VARCHAR(500) originally named endereco)
ALTER TABLE "cliente" ALTER COLUMN "logradouro" TYPE VARCHAR(255);

-- ---------------------------------------------------------------------------
-- 4. Extend empresas (org/tenant) with full address + registration fields
-- ---------------------------------------------------------------------------
ALTER TABLE "empresas"
  ADD COLUMN "razao_social"         VARCHAR(255),
  ADD COLUMN "cnpj"                 VARCHAR(18),
  ADD COLUMN "inscricao_estadual"   VARCHAR(20),
  ADD COLUMN "inscricao_municipal"  VARCHAR(20),
  ADD COLUMN "celular"              VARCHAR(20),
  ADD COLUMN "cep"                  VARCHAR(9),
  ADD COLUMN "logradouro"           VARCHAR(255),
  ADD COLUMN "numero"               VARCHAR(10),
  ADD COLUMN "complemento"          VARCHAR(100),
  ADD COLUMN "bairro"               VARCHAR(100),
  ADD COLUMN "municipio"            VARCHAR(100),
  ADD COLUMN "uf"                   VARCHAR(2),
  ADD COLUMN "pais"                 VARCHAR(50) DEFAULT 'Brasil';

-- ---------------------------------------------------------------------------
-- 5. Create shared reference tables (not empresa-scoped)
-- ---------------------------------------------------------------------------

CREATE TABLE "paises" (
  "id"    SERIAL      NOT NULL,
  "nome"  VARCHAR(100) NOT NULL,
  "sigla" VARCHAR(3)  NOT NULL,
  CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "paises_sigla_key" ON "paises"("sigla");

CREATE TABLE "estados" (
  "id"           SERIAL      NOT NULL,
  "pais_id"      INTEGER     NOT NULL,
  "nome"         VARCHAR(100) NOT NULL,
  "sigla"        VARCHAR(2)  NOT NULL,
  "codigo_ibge"  INTEGER,
  CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "estados_sigla_key" ON "estados"("sigla");
ALTER TABLE "estados" ADD CONSTRAINT "estados_pais_id_fkey"
  FOREIGN KEY ("pais_id") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "municipios" (
  "id"           SERIAL      NOT NULL,
  "estado_id"    INTEGER     NOT NULL,
  "nome"         VARCHAR(100) NOT NULL,
  "codigo_ibge"  INTEGER,
  CONSTRAINT "municipios_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "municipios" ADD CONSTRAINT "municipios_estado_id_fkey"
  FOREIGN KEY ("estado_id") REFERENCES "estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ---------------------------------------------------------------------------
-- 6. Seed Brasil + 27 UFs (seed data for paises and estados)
-- ---------------------------------------------------------------------------

INSERT INTO "paises" ("nome", "sigla") VALUES ('Brasil', 'BRA');

INSERT INTO "estados" ("pais_id", "nome", "sigla", "codigo_ibge") VALUES
  (1, 'Acre',                'AC', 12),
  (1, 'Alagoas',             'AL', 27),
  (1, 'Amapá',               'AP', 16),
  (1, 'Amazonas',            'AM', 13),
  (1, 'Bahia',               'BA', 29),
  (1, 'Ceará',               'CE', 23),
  (1, 'Distrito Federal',    'DF', 53),
  (1, 'Espírito Santo',      'ES', 32),
  (1, 'Goiás',               'GO', 52),
  (1, 'Maranhão',            'MA', 21),
  (1, 'Mato Grosso',         'MT', 51),
  (1, 'Mato Grosso do Sul',  'MS', 50),
  (1, 'Minas Gerais',        'MG', 31),
  (1, 'Pará',                'PA', 15),
  (1, 'Paraíba',             'PB', 25),
  (1, 'Paraná',              'PR', 41),
  (1, 'Pernambuco',          'PE', 26),
  (1, 'Piauí',               'PI', 22),
  (1, 'Rio de Janeiro',      'RJ', 33),
  (1, 'Rio Grande do Norte', 'RN', 24),
  (1, 'Rio Grande do Sul',   'RS', 43),
  (1, 'Rondônia',            'RO', 11),
  (1, 'Roraima',             'RR', 14),
  (1, 'Santa Catarina',      'SC', 42),
  (1, 'São Paulo',           'SP', 35),
  (1, 'Sergipe',             'SE', 28),
  (1, 'Tocantins',           'TO', 17);
