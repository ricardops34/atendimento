import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando semente de dados...');

  // 1. Criar Planos Dinâmicos
  const standard = await prisma.plan.upsert({
    where: { name: 'Standard' },
    update: {},
    create: {
      name: 'Standard',
      description: 'Plano básico para pequenas empresas',
      maxUsers: 5,
      maxBranches: 1,
      maxRecords: 5000,
      features: ['DASHBOARD_BASIC'],
    },
  });

  const enterprise = await prisma.plan.upsert({
    where: { name: 'Enterprise' },
    update: {},
    create: {
      name: 'Enterprise',
      description: 'Plano ilimitado para grandes corporações',
      maxUsers: 999,
      maxBranches: 999,
      maxRecords: 999999,
      features: ['ALL'],
    },
  });

  // 2. Criar o Tenant Master (Seu Negócio)
  const saasAdmin = await prisma.tenant.upsert({
    where: { domain: 'admin' },
    update: {},
    create: {
      name: 'Sistema Control Panel',
      domain: 'admin',
      planId: enterprise.id,
      status: 'ACTIVE',
    },
  });

  // 3. Criar Usuário Master
  await prisma.user.upsert({
    where: { email: 'admin@saas.com' },
    update: {},
    create: {
      email: 'admin@saas.com',
      password: 'admin_password', // Em produção usaríamos hash
      name: 'Ricardo Admin',
      tenantId: saasAdmin.id,
    },
  });

  console.log('✅ Semente concluída! Planos e Usuário Master criados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
