// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MVP modules and default access...');

  // 1. Módulos
  const moduleKeys = [
    'dashboard',
    'companies',
    'professionals',
    'contracts',
    'appointments-calendar',
    'appointments-list',
    'settings',
  ];

  for (const key of moduleKeys) {
    await prisma.module.upsert({
      where: { key },
      update: {},
      create: { key, name: key },
    });
  }
  const allModules = await prisma.module.findMany();

  const defaultRoutines = [
    { moduleKey: 'companies', name: 'Clientes', key: 'companies-list', path: '/clientes', icon: 'an an-buildings', shortLabel: 'CLI', sortOrder: 10 },
    { moduleKey: 'professionals', name: 'Profissionais', key: 'professionals-list', path: '/profissionais', icon: 'an an-user', shortLabel: 'PRO', sortOrder: 20 },
    { moduleKey: 'contracts', name: 'Contratos', key: 'contracts-list', path: '/contratos', icon: 'an an-file-text', shortLabel: 'CON', sortOrder: 30 },
    { moduleKey: 'appointments-list', name: 'Lista de Atendimentos', key: 'appointments-list', path: '/agendamentos/lista', icon: 'an an-list-dashes', shortLabel: 'LST', sortOrder: 40 },
    { moduleKey: 'appointments-calendar', name: 'Calendario', key: 'appointments-calendar', path: '/agendamentos/calendario', icon: 'an an-calendar-blank', shortLabel: 'CAL', sortOrder: 50 },
    { moduleKey: 'settings', name: 'Configuracoes', key: 'settings-home', path: '/configuracoes', icon: 'an an-gear', shortLabel: 'CFG', sortOrder: 60 },
    { moduleKey: 'settings', name: 'Empresas', key: 'settings-tenants', path: '/configuracoes/empresas', icon: 'an an-buildings', shortLabel: 'EMP', sortOrder: 61 },
    { moduleKey: 'settings', name: 'Modulos', key: 'settings-modules', path: '/configuracoes/modulos', icon: 'an an-squares-four', shortLabel: 'MOD', sortOrder: 62 },
    { moduleKey: 'settings', name: 'Rotinas', key: 'settings-routines', path: '/configuracoes/rotinas', icon: 'an an-list-checks', shortLabel: 'ROT', sortOrder: 63 },
    { moduleKey: 'settings', name: 'Perfis', key: 'settings-profiles', path: '/configuracoes/perfis', icon: 'an an-identification-card', shortLabel: 'PRF', sortOrder: 64 },
    { moduleKey: 'settings', name: 'Menus', key: 'settings-menus', path: '/configuracoes/menus', icon: 'an an-tree-structure', shortLabel: 'MNU', sortOrder: 65 },
    { moduleKey: 'settings', name: 'Usuarios', key: 'settings-users', path: '/configuracoes/usuarios', icon: 'an an-users-three', shortLabel: 'USR', sortOrder: 66 },
  ];

  for (const routine of defaultRoutines) {
    const moduleRef = allModules.find((item) => item.key === routine.moduleKey);
    if (!moduleRef) {
      continue;
    }

    await prisma.routine.upsert({
      where: { key: routine.key },
      update: {
        moduleId: moduleRef.id,
        name: routine.name,
        path: routine.path,
        icon: routine.icon,
        shortLabel: routine.shortLabel,
        sortOrder: routine.sortOrder,
        isActive: true,
      },
      create: {
        moduleId: moduleRef.id,
        name: routine.name,
        key: routine.key,
        path: routine.path,
        icon: routine.icon,
        shortLabel: routine.shortLabel,
        sortOrder: routine.sortOrder,
        isActive: true,
      },
    });
  }

  const allRoutines = await prisma.routine.findMany({
    include: { module: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  const ensureMenu = async (key: string, data: any) => {
    const existing = await prisma.menu.findFirst({
      where: {
        OR: [
          data.routineId ? { routineId: data.routineId } : undefined,
          { link: key },
          { label: key },
        ].filter(Boolean) as any,
      },
    });

    if (existing) {
      return prisma.menu.update({
        where: { id: existing.id },
        data,
      });
    }

    return prisma.menu.create({ data });
  };

  const companiesRoutine = allRoutines.find((item) => item.key === 'companies-list');
  const professionalsRoutine = allRoutines.find((item) => item.key === 'professionals-list');
  const contractsRoutine = allRoutines.find((item) => item.key === 'contracts-list');
  const appointmentsListRoutine = allRoutines.find((item) => item.key === 'appointments-list');
  const appointmentsCalendarRoutine = allRoutines.find((item) => item.key === 'appointments-calendar');
  const settingsHomeRoutine = allRoutines.find((item) => item.key === 'settings-home');
  const settingsTenantsRoutine = allRoutines.find((item) => item.key === 'settings-tenants');
  const settingsModulesRoutine = allRoutines.find((item) => item.key === 'settings-modules');
  const settingsRoutinesRoutine = allRoutines.find((item) => item.key === 'settings-routines');
  const settingsProfilesRoutine = allRoutines.find((item) => item.key === 'settings-profiles');
  const settingsMenusRoutine = allRoutines.find((item) => item.key === 'settings-menus');
  const settingsUsersRoutine = allRoutines.find((item) => item.key === 'settings-users');

  await ensureMenu('/inicio', {
    label: 'Inicio',
    shortLabel: 'INI',
    icon: 'an an-house',
    link: '/inicio',
    sortOrder: 1,
    isActive: true,
  });

  // Menu pai "Cadastros" (sem link, sem rotina) — key = label para o findFirst pelo label
  const cadastrosMenu = await ensureMenu('Cadastros', {
    label: 'Cadastros',
    shortLabel: 'CAD',
    icon: 'an an-folder',
    link: null,
    sortOrder: 5,
    isActive: true,
  });
  const cadastrosMenuId = cadastrosMenu.id;

  if (companiesRoutine) {
    await ensureMenu(companiesRoutine.path, {
      moduleId: companiesRoutine.moduleId,
      routineId: companiesRoutine.id,
      parentId: cadastrosMenuId,
      label: companiesRoutine.name,
      shortLabel: companiesRoutine.shortLabel,
      icon: companiesRoutine.icon,
      link: companiesRoutine.path,
      sortOrder: companiesRoutine.sortOrder,
      isActive: true,
    });
  }

  if (professionalsRoutine) {
    await ensureMenu(professionalsRoutine.path, {
      moduleId: professionalsRoutine.moduleId,
      routineId: professionalsRoutine.id,
      parentId: cadastrosMenuId,
      label: professionalsRoutine.name,
      shortLabel: professionalsRoutine.shortLabel,
      icon: professionalsRoutine.icon,
      link: professionalsRoutine.path,
      sortOrder: professionalsRoutine.sortOrder,
      isActive: true,
    });
  }

  if (contractsRoutine) {
    await ensureMenu(contractsRoutine.path, {
      moduleId: contractsRoutine.moduleId,
      routineId: contractsRoutine.id,
      parentId: cadastrosMenuId,
      label: contractsRoutine.name,
      shortLabel: contractsRoutine.shortLabel,
      icon: contractsRoutine.icon,
      link: contractsRoutine.path,
      sortOrder: contractsRoutine.sortOrder,
      isActive: true,
    });
  }

  // Menu pai "Atendimentos" (sem link, sem rotina) — key = label para o findFirst pelo label
  const atendimentosMenu = await ensureMenu('Atendimentos', {
    label: 'Atendimentos',
    shortLabel: 'ATE',
    icon: 'an an-calendar-check',
    link: null,
    sortOrder: 40,
    isActive: true,
  });
  const atendimentosMenuId = atendimentosMenu.id;

  if (appointmentsListRoutine) {
    await ensureMenu(appointmentsListRoutine.path, {
      moduleId: appointmentsListRoutine.moduleId,
      routineId: appointmentsListRoutine.id,
      parentId: atendimentosMenuId,
      label: appointmentsListRoutine.name,
      shortLabel: appointmentsListRoutine.shortLabel,
      icon: appointmentsListRoutine.icon,
      link: appointmentsListRoutine.path,
      sortOrder: appointmentsListRoutine.sortOrder,
      isActive: true,
    });
  }

  if (appointmentsCalendarRoutine) {
    await ensureMenu(appointmentsCalendarRoutine.path, {
      moduleId: appointmentsCalendarRoutine.moduleId,
      routineId: appointmentsCalendarRoutine.id,
      parentId: atendimentosMenuId,
      label: appointmentsCalendarRoutine.name,
      shortLabel: appointmentsCalendarRoutine.shortLabel,
      icon: appointmentsCalendarRoutine.icon,
      link: appointmentsCalendarRoutine.path,
      sortOrder: appointmentsCalendarRoutine.sortOrder,
      isActive: true,
    });
  }

  let settingsMenuId: number | null = null;

  if (settingsHomeRoutine) {
    const settingsMenu = await ensureMenu(settingsHomeRoutine.path, {
      moduleId: settingsHomeRoutine.moduleId,
      routineId: settingsHomeRoutine.id,
      label: settingsHomeRoutine.name,
      shortLabel: settingsHomeRoutine.shortLabel,
      icon: settingsHomeRoutine.icon,
      link: null,
      sortOrder: settingsHomeRoutine.sortOrder,
      isActive: true,
    });
    settingsMenuId = settingsMenu.id;
  }

  for (const routine of [
    settingsTenantsRoutine,
    settingsModulesRoutine,
    settingsRoutinesRoutine,
    settingsProfilesRoutine,
    settingsMenusRoutine,
    settingsUsersRoutine,
  ]) {
    if (!routine) {
      continue;
    }

    await ensureMenu(routine.path, {
      moduleId: routine.moduleId,
      routineId: routine.id,
      parentId: settingsMenuId,
      label: routine.name,
      shortLabel: routine.shortLabel,
      icon: routine.icon,
      link: routine.path,
      sortOrder: routine.sortOrder,
      isActive: true,
    });
  }

  // 2. Tenant Default
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default-tenant' },
    update: {},
    create: {
      name: 'Empresa Padrão',
      slug: 'default-tenant',
    },
  });

  // 3. Perfil Administrador
  const profile = await prisma.profile.upsert({
    where: { name: 'Administrador' },
    update: {},
    create: {
      name: 'Administrador',
    },
  });

  // Vincula o perfil a todos os módulos
  for (const mod of allModules) {
    await prisma.profileModule.upsert({
      where: {
        profileId_moduleId: {
          profileId: profile.id,
          moduleId: mod.id,
        },
      },
      update: { canRead: true, canWrite: true },
      create: {
        profileId: profile.id,
        moduleId: mod.id,
        canRead: true,
        canWrite: true,
      },
    });
  }

  // 4. Usuário Admin Inicial
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@fallback.com' },
    update: {
      profileId: profile.id,
      // password: hashedPassword,
    },
    create: {
      name: 'Administrador (Fallback)',
      email: 'admin@fallback.com',
      profileId: profile.id,
      avatar: 'avatar_01.png',
      password: hashedPassword,
      isActive: true,
    },
  });

  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@fallback.com' },
  });

  if (adminUser) {
    await prisma.userTenant.upsert({
      where: {
        userId_tenantId: {
          userId: adminUser.id,
          tenantId: tenant.id,
        },
      },
      update: {
        isDefault: true,
      },
      create: {
        userId: adminUser.id,
        tenantId: tenant.id,
        isDefault: true,
      },
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
