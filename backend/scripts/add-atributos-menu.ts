// Script pontual: adiciona SÓ a rotina + item de menu "Atributos" (cadastros > Atributos).
// Não mexe em módulos, outras rotinas/menus, nem em Estados/Municípios/Países.
//
// Como rodar (de dentro do container/pasta backend, com DATABASE_URL configurado):
//   npx tsx scripts/add-atributos-menu.ts
//
// É seguro rodar mais de uma vez (idempotente).

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cadastrosModule = await prisma.module.findUnique({ where: { key: 'cadastros' } });
  if (!cadastrosModule) {
    throw new Error('Módulo "cadastros" não encontrado. Rode o seed completo (prisma/seed.ts) antes deste script.');
  }

  const cadastrosHomeRoutine = await prisma.routine.findUnique({ where: { key: 'cadastros-home' } });
  if (!cadastrosHomeRoutine) {
    throw new Error('Rotina "cadastros-home" não encontrada. Rode o seed completo (prisma/seed.ts) antes deste script.');
  }

  const attributesRoutine = await prisma.routine.upsert({
    where: { key: 'atributos-list' },
    update: {
      moduleId: cadastrosModule.id,
      name: 'Atributos',
      path: '/atributos',
      icon: 'an an-list-checks',
      shortLabel: 'ATR',
      sortOrder: 15,
      isActive: true,
    },
    create: {
      moduleId: cadastrosModule.id,
      name: 'Atributos',
      key: 'atributos-list',
      path: '/atributos',
      icon: 'an an-list-checks',
      shortLabel: 'ATR',
      sortOrder: 15,
      isActive: true,
    },
  });

  const cadastrosMenu = await prisma.menu.findFirst({ where: { routineId: cadastrosHomeRoutine.id } });

  const menuData = {
    moduleId: attributesRoutine.moduleId,
    routineId: attributesRoutine.id,
    parentId: cadastrosMenu?.id ?? null,
    label: attributesRoutine.name,
    shortLabel: attributesRoutine.shortLabel,
    icon: attributesRoutine.icon,
    link: attributesRoutine.path,
    sortOrder: attributesRoutine.sortOrder,
    isActive: true,
  };

  const existingMenu = await prisma.menu.findFirst({
    where: { OR: [{ routineId: attributesRoutine.id }, { link: attributesRoutine.path }] },
  });

  if (existingMenu) {
    await prisma.menu.update({ where: { id: existingMenu.id }, data: menuData });
    console.log('Menu "Atributos" atualizado (id existente):', existingMenu.id);
  } else {
    const created = await prisma.menu.create({ data: menuData });
    console.log('Menu "Atributos" criado:', created.id);
  }

  console.log('Concluído.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
