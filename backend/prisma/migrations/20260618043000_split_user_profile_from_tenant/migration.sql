-- Add profile reference to users
ALTER TABLE "users" ADD COLUMN "profile_id" INTEGER;

-- Backfill users.profile_id from default empresa link, falling back to first empresa link
WITH default_links AS (
  SELECT DISTINCT ON ("user_id")
    "user_id",
    "profile_id"
  FROM "user_empresas"
  ORDER BY "user_id", "is_default" DESC, "id" ASC
)
UPDATE "users" u
SET "profile_id" = dl."profile_id"
FROM default_links dl
WHERE u."id" = dl."user_id"
  AND u."profile_id" IS NULL;

-- Consolidate duplicated profiles by name before making them global
WITH canonical_profiles AS (
  SELECT MIN("id") AS canonical_id, "name"
  FROM "profiles"
  GROUP BY "name"
),
duplicate_profiles AS (
  SELECT p."id" AS duplicate_id, c.canonical_id
  FROM "profiles" p
  INNER JOIN canonical_profiles c ON c."name" = p."name"
  WHERE p."id" <> c.canonical_id
)
UPDATE "users" u
SET "profile_id" = d.canonical_id
FROM duplicate_profiles d
WHERE u."profile_id" = d.duplicate_id;

WITH canonical_profiles AS (
  SELECT MIN("id") AS canonical_id, "name"
  FROM "profiles"
  GROUP BY "name"
),
duplicate_profiles AS (
  SELECT p."id" AS duplicate_id, c.canonical_id
  FROM "profiles" p
  INNER JOIN canonical_profiles c ON c."name" = p."name"
  WHERE p."id" <> c.canonical_id
)
UPDATE "profile_modules" pm
SET "profile_id" = d.canonical_id
FROM duplicate_profiles d
WHERE pm."profile_id" = d.duplicate_id;

DELETE FROM "profile_modules" a
USING "profile_modules" b
WHERE a."id" > b."id"
  AND a."profile_id" = b."profile_id"
  AND a."module_id" = b."module_id";

DELETE FROM "profiles"
WHERE "id" IN (
  SELECT p."id"
  FROM "profiles" p
  INNER JOIN (
    SELECT MIN("id") AS canonical_id, "name"
    FROM "profiles"
    GROUP BY "name"
  ) c ON c."name" = p."name"
  WHERE p."id" <> c.canonical_id
);

-- Remove empresa-specific profile ownership
ALTER TABLE "user_empresas" DROP CONSTRAINT "user_empresas_profile_id_fkey";
ALTER TABLE "user_empresas" DROP COLUMN "profile_id";

ALTER TABLE "profiles" DROP CONSTRAINT "profiles_empresa_id_fkey";
DROP INDEX "profiles_empresa_id_name_key";
ALTER TABLE "profiles" DROP COLUMN "empresa_id";
CREATE UNIQUE INDEX "profiles_name_key" ON "profiles"("name");

-- Finalize users.profile_id constraints
ALTER TABLE "users" ALTER COLUMN "profile_id" SET NOT NULL;
ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
