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

  // 3. Criar Usuário Master (Atualizado para Ricardo)
  await prisma.user.upsert({
    where: { email: 'ricardo@bjsoft.com.br' },
    update: {},
    create: {
      email: 'ricardo@bjsoft.com.br',
      password: 'admin_password', // Recomendado trocar para algo seguro após o primeiro login
      name: 'Ricardo Admin',
      tenantId: saasAdmin.id,
    },
  });

  console.log('✅ Semente concluída! Planos e Usuário Master (ricardo@bjsoft.com.br) criados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
