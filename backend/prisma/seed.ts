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
  ];

  for (const key of moduleKeys) {
    await prisma.module.upsert({
      where: { key },
      update: {},
      create: { key, name: key },
    });
  }
  const allModules = await prisma.module.findMany();

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
