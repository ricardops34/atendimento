import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando semente de dados...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin_password', saltRounds);

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

  // 2. Criar o Tenant Master
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

  // 3. Criar Usuário Master com senha criptografada
  await prisma.user.upsert({
    where: { email: 'ricardo@bjsoft.com.br' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'ricardo@bjsoft.com.br',
      password: hashedPassword,
      name: 'Ricardo Admin',
      tenantId: saasAdmin.id,
    },
  });

  console.log('✅ Semente concluída! Usuário ricardo@bjsoft.com.br criado com senha criptografada.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
