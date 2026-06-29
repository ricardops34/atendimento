-- CreateTable
CREATE TABLE "user_empresas" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_empresas_pkey" PRIMARY KEY ("id")
);

-- Migrate current empresa/profile ownership from users to user_empresas
INSERT INTO "user_empresas" ("user_id", "empresa_id", "profile_id", "is_default")
SELECT "id", "empresa_id", "profile_id", true
FROM "users";

-- Merge duplicated users by e-mail if they exist
WITH canonical_users AS (
  SELECT MIN("id") AS canonical_id, "email"
  FROM "users"
  GROUP BY "email"
),
duplicate_users AS (
  SELECT u."id" AS duplicate_id, c.canonical_id
  FROM "users" u
  INNER JOIN canonical_users c ON c."email" = u."email"
  WHERE u."id" <> c.canonical_id
)
UPDATE "user_empresas" ue
SET "user_id" = d.canonical_id
FROM duplicate_users d
WHERE ue."user_id" = d.duplicate_id;

DELETE FROM "users"
WHERE "id" IN (
  SELECT u."id"
  FROM "users" u
  INNER JOIN (
    SELECT MIN("id") AS canonical_id, "email"
    FROM "users"
    GROUP BY "email"
  ) c ON c."email" = u."email"
  WHERE u."id" <> c.canonical_id
);

-- Remove possible duplicate empresa links after consolidation
DELETE FROM "user_empresas" a
USING "user_empresas" b
WHERE a."id" > b."id"
  AND a."user_id" = b."user_id"
  AND a."empresa_id" = b."empresa_id";

-- Drop old foreign keys/indexes
ALTER TABLE "users" DROP CONSTRAINT "users_empresa_id_fkey";
ALTER TABLE "users" DROP CONSTRAINT "users_profile_id_fkey";
DROP INDEX "users_empresa_id_email_key";

-- Add new structure to users
ALTER TABLE "users" DROP COLUMN "empresa_id";
ALTER TABLE "users" DROP COLUMN "profile_id";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_empresas_user_id_empresa_id_key" ON "user_empresas"("user_id", "empresa_id");

-- AddForeignKey
ALTER TABLE "user_empresas" ADD CONSTRAINT "user_empresas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_empresas" ADD CONSTRAINT "user_empresas_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_empresas" ADD CONSTRAINT "user_empresas_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
