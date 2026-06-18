-- CreateTable
CREATE TABLE "user_tenants" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_tenants_pkey" PRIMARY KEY ("id")
);

-- Migrate current tenant/profile ownership from users to user_tenants
INSERT INTO "user_tenants" ("user_id", "tenant_id", "profile_id", "is_default")
SELECT "id", "tenant_id", "profile_id", true
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
UPDATE "user_tenants" ut
SET "user_id" = d.canonical_id
FROM duplicate_users d
WHERE ut."user_id" = d.duplicate_id;

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

-- Remove possible duplicate tenant links after consolidation
DELETE FROM "user_tenants" a
USING "user_tenants" b
WHERE a."id" > b."id"
  AND a."user_id" = b."user_id"
  AND a."tenant_id" = b."tenant_id";

-- Drop old foreign keys/indexes
ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_fkey";
ALTER TABLE "users" DROP CONSTRAINT "users_profile_id_fkey";
DROP INDEX "users_tenant_id_email_key";

-- Add new structure to users
ALTER TABLE "users" DROP COLUMN "tenant_id";
ALTER TABLE "users" DROP COLUMN "profile_id";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_tenants_user_id_tenant_id_key" ON "user_tenants"("user_id", "tenant_id");

-- AddForeignKey
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
