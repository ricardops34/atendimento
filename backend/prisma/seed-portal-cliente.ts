// Seed idempotente da feature 003-acesso-cliente-atendimentos (Portal do Cliente).
//
// Script standalone (mesmo padrão de seed-paises.ts), NÃO integrado ao `npm run seed`
// (que roda prisma/seed.ts). Motivo: prisma/seed.ts contém lógica de provisionamento de
// Menu/Profile (`ensureMenu`, `prisma.profileMenu`) que não corresponde mais ao schema
// atual (Menu.title + MenuItem, Profile.menuId único) — parece ter ficado desatualizado
// em relação às migrations manuais mais recentes (2026-07-18 em diante). Isso é uma
// inconsistência pré-existente, não introduzida por esta feature; ver `legacy-impact.md`
// da feature 003 para detalhes. Este script evita depender daquele código quebrado.
//
// Como rodar:
//   npx tsx prisma/seed-portal-cliente.ts
//
// Cria (ou atualiza, se já existir):
//   - Module "Clientes" (key: portal-cliente)
//   - Routines: portal-cliente-calendario, portal-cliente-lista, portal-cliente-extrato
//   - Menu "Portal do Cliente" com os 3 MenuItems acima
//   - Profile "Cliente" vinculado a esse Menu

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Module/Routines/Menu/Profile do Portal do Cliente...');

  const modulo = await prisma.module.upsert({
    where: { key: 'portal-cliente' },
    update: { name: 'Clientes' },
    create: { key: 'portal-cliente', name: 'Clientes', sortOrder: 90 },
  });

  const routinesData = [
    {
      key: 'portal-cliente-calendario',
      name: 'Calendário',
      path: '/portal/calendario',
      icon: 'an an-calendar-blank',
      shortLabel: 'CAL',
      sortOrder: 1,
    },
    {
      key: 'portal-cliente-lista',
      name: 'Meus Atendimentos',
      path: '/portal/lista',
      icon: 'an an-list-dashes',
      shortLabel: 'LST',
      sortOrder: 2,
    },
    {
      key: 'portal-cliente-extrato',
      name: 'Extrato',
      path: '/portal/extrato',
      icon: 'an an-file-text',
      shortLabel: 'EXT',
      sortOrder: 3,
    },
  ];

  const routines = [];
  for (const routine of routinesData) {
    const saved = await prisma.routine.upsert({
      where: { key: routine.key },
      update: {
        moduleId: modulo.id,
        name: routine.name,
        path: routine.path,
        icon: routine.icon,
        shortLabel: routine.shortLabel,
        sortOrder: routine.sortOrder,
        isActive: true,
      },
      create: {
        moduleId: modulo.id,
        name: routine.name,
        key: routine.key,
        path: routine.path,
        icon: routine.icon,
        shortLabel: routine.shortLabel,
        sortOrder: routine.sortOrder,
        isActive: true,
      },
    });
    routines.push(saved);
  }

  const menu = await prisma.menu.upsert({
    where: { title: 'Portal do Cliente' },
    update: { isActive: true },
    create: { title: 'Portal do Cliente', isActive: true },
  });

  for (const routine of routines) {
    await prisma.menuItem.upsert({
      where: { menuId_routineId: { menuId: menu.id, routineId: routine.id } },
      update: { sortOrder: routine.sortOrder, isActive: true },
      create: { menuId: menu.id, routineId: routine.id, sortOrder: routine.sortOrder, isActive: true },
    });
  }

  await prisma.profile.upsert({
    where: { name: 'Cliente' },
    update: { menuId: menu.id },
    create: { name: 'Cliente', menuId: menu.id },
  });

  console.log('Seed do Portal do Cliente concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
