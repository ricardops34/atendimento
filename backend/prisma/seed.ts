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
    { moduleKey: 'companies', name: 'Empresas', key: 'companies-list', path: '/empresas', icon: 'an an-buildings', shortLabel: 'EMP', sortOrder: 10 },
    { moduleKey: 'professionals', name: 'Profissionais', key: 'professionals-list', path: '/profissionais', icon: 'an an-user', shortLabel: 'PRO', sortOrder: 20 },
    { moduleKey: 'contracts', name: 'Contratos', key: 'contracts-list', path: '/contratos', icon: 'an an-file-text', shortLabel: 'CON', sortOrder: 30 },
    { moduleKey: 'appointments-list', name: 'Lista de Atendimentos', key: 'appointments-list', path: '/agendamentos/lista', icon: 'an an-list-dashes', shortLabel: 'LST', sortOrder: 40 },
    { moduleKey: 'appointments-calendar', name: 'Calendario', key: 'appointments-calendar', path: '/agendamentos/calendario', icon: 'an an-calendar-blank', shortLabel: 'CAL', sortOrder: 50 },
    { moduleKey: 'settings', name: 'Configuracoes', key: 'settings-home', path: '/configuracoes', icon: 'an an-gear', shortLabel: 'CFG', sortOrder: 60 },
    { moduleKey: 'settings', name: 'Tenants', key: 'settings-tenants', path: '/configuracoes/tenants', icon: 'an an-buildings', shortLabel: 'TEN', sortOrder: 61 },
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

  // 2. Tenant Default
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default' },
    update: {},
    create: {
      name: 'Default Tenant',
      slug: 'default',
    },
  });

  // 3. Perfil Administrador
  const profile = await prisma.profile.upsert({
    where: {
      tenantId_name: {
        tenantId: tenant.id,
        name: 'Administrador',
      },
    },
    update: {},
    create: {
      tenantId: tenant.id,
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
    where: {
      tenantId_email: {
        tenantId: tenant.id,
        email: 'admin@fallback.com',
      },
    },
    update: {
      // password: hashedPassword, // Uncomment if you want to force reset password
    },
    create: {
      tenantId: tenant.id,
      profileId: profile.id,
      name: 'Administrador (Fallback)',
      email: 'admin@fallback.com',
      password: hashedPassword,
      isActive: true,
    },
  });

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
