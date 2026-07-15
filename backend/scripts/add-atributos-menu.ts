// Adiciona a rotina Atributos ao Menu do Administrador.
// Seguro para execucao repetida.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cadastrosModule = await prisma.module.findUnique({ where: { key: 'cadastros' } });
  if (!cadastrosModule) throw new Error('Modulo cadastros nao encontrado.');

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

  const adminMenu = await prisma.menu.findUnique({ where: { title: 'Menu do Administrador' } });
  if (!adminMenu) throw new Error('Menu do Administrador nao encontrado.');

  const menuItem = await prisma.menuItem.upsert({
    where: { menuId_routineId: { menuId: adminMenu.id, routineId: attributesRoutine.id } },
    update: { sortOrder: attributesRoutine.sortOrder, isActive: true },
    create: {
      menuId: adminMenu.id,
      routineId: attributesRoutine.id,
      sortOrder: attributesRoutine.sortOrder,
      isActive: true,
    },
  });

  console.log('Item de menu Atributos configurado:', menuItem.id);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
