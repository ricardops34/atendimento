import { PrismaClient, Plan } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seed...');

  // 1. Criar Tenant Master
  const masterTenant = await prisma.tenant.upsert({
    where: { domain: 'master.alvorada.com' },
    update: {},
    create: {
      name: 'Alvorada Veículos - Admin',
      domain: 'master.alvorada.com',
      plan: Plan.ENTERPRISE,
    },
  });

  // 2. Criar Role de Super Admin
  const adminRole = await prisma.role.upsert({
    where: { 
      name_tenantId: { 
        name: 'SUPER_ADMIN', 
        tenantId: masterTenant.id 
      } 
    },
    update: {},
    create: {
      name: 'SUPER_ADMIN',
      description: 'Acesso total ao sistema SaaS',
      tenantId: masterTenant.id,
    },
  });

  // 3. Criar Usuário Super Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@alvorada.com' },
    update: {},
    create: {
      email: 'admin@alvorada.com',
      password: hashedPassword,
      name: 'Ricardo - Super Admin',
      tenantId: masterTenant.id,
      roleId: adminRole.id,
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
