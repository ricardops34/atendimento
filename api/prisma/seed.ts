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
      name: 'Painel de Controle SaaS',
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

  // 4. Criar Usuário Master
  const user = await prisma.user.upsert({
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

  // 5. EXEMPLO DINÂMICO: Criar Entidade "Veículos"
  const veiculos = await prisma.dynamicEntity.upsert({
    where: { slug_tenantId: { slug: 'veiculos', tenantId: saasAdmin.id } },
    update: {},
    create: {
      name: 'Cadastro de Veículos',
      slug: 'veiculos',
      tenantId: saasAdmin.id,
      fields: {} // Campos crus
    }
  });

  // 6. Configurar Metadados da Tela (O que o PO-UI vai mostrar)
  const meta = await prisma.metadataEntity.upsert({
    where: { name_tenantId: { name: 'veiculos', tenantId: saasAdmin.id } },
    update: {},
    create: {
      name: 'veiculos',
      label: 'Veículos',
      tenantId: saasAdmin.id,
      type: 'U'
    }
  });

  await prisma.metadataField.deleteMany({ where: { entityId: meta.id } });
  await prisma.metadataField.createMany({
    data: [
      { entityId: meta.id, tenantId: saasAdmin.id, name: 'placa', titleList: 'Placa do Veículo', type: 'C', order: 1 },
      { entityId: meta.id, tenantId: saasAdmin.id, name: 'modelo', titleList: 'Marca/Modelo', type: 'C', order: 2 },
      { entityId: meta.id, tenantId: saasAdmin.id, name: 'cor', titleList: 'Cor Predominante', type: 'C', order: 3 },
      { entityId: meta.id, tenantId: saasAdmin.id, name: 'ano', titleList: 'Ano de Fabricação', type: 'N', order: 4 }
    ]
  });

  console.log('✅ Semente concluída! Ricardo é Admin e a tela dinâmica de Veículos está pronta.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
