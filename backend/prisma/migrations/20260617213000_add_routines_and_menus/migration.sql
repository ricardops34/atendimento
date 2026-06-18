-- CreateTable
CREATE TABLE "routines" (
    "id" SERIAL NOT NULL,
    "module_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(100),
    "short_label" VARCHAR(20),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "module_id" INTEGER,
    "routine_id" INTEGER,
    "parent_id" INTEGER,
    "label" VARCHAR(255) NOT NULL,
    "short_label" VARCHAR(20),
    "icon" VARCHAR(100),
    "link" VARCHAR(255),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "routines_key_key" ON "routines"("key");

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
