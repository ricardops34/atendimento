import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando semente de dados...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin_password', saltRounds);

  // 1. Criar Planos
  const enterprise = await prisma.plan.upsert({
    where: { name: 'Enterprise' },
    update: {},
    create: {
      name: 'Enterprise',
      description: 'Plano ilimitado',
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

  // 3. Criar a Role de SUPER_ADMIN
  const superAdminRole = await prisma.role.upsert({
    where: { 
      name_tenantId: {
        name: 'SUPER_ADMIN',
        tenantId: saasAdmin.id
      }
    },
    update: {},
    create: {
      name: 'SUPER_ADMIN',
      tenantId: saasAdmin.id
    }
  });

  // 4. Criar Usuário Master com a Role vinculada
  await prisma.user.upsert({
    where: { email: 'ricardo@bjsoft.com.br' },
    update: {
      password: hashedPassword,
      roleId: superAdminRole.id
    },
    create: {
      email: 'ricardo@bjsoft.com.br',
      password: hashedPassword,
      name: 'Ricardo Admin',
      tenantId: saasAdmin.id,
      roleId: superAdminRole.id
    },
  });

  console.log('✅ Semente concluída! Ricardo agora é SUPER_ADMIN.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
