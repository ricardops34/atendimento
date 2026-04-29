
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando Seed de Tenant Mestre...');

  // 1. Criar Plano Padrão se não existir
  const plan = await prisma.plan.upsert({
    where: { name: 'Plano Pro' },
    update: {},
    create: {
      name: 'Plano Pro',
      description: 'Plano completo para gestão empresarial',
      maxUsers: 10,
      maxBranches: 3,
      maxRecords: 10000,
    }
  });

  // 2. Criar Tenant (Empresa do Usuário)
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'bjsoft.com.br' },
    update: {
      name: 'B. J. INFORMATICA',
      email: 'conasci@gmail.com',
    },
    create: {
      name: 'B. J. INFORMATICA',
      domain: 'bjsoft.com.br',
      email: 'conasci@gmail.com',
      status: 'ACTIVE',
      planId: plan.id,
    }
  });

  // 3. Criar Filial Principal (Matriz)
  await prisma.branch.upsert({
    where: { document: '19654062000145' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'RICARDO PATAY SOTOMAYOR',
      tradeName: 'B. J. INFORMATICA',
      document: '19654062000145',
      isMain: true,
      email: 'conasci@gmail.com',
      phone: '(67) 3029-2680',
      zipCode: '79117130',
      address: 'R JOAO GUIMARAES ROSA',
      number: '459',
      neighborhood: 'VILA NASSER',
      city: 'CAMPO GRANDE',
      state: 'MS'
    }
  });

  // 4. Criar CNAEs Globais para evitar erro de integridade
  await prisma.cnae.upsert({
    where: { code: '6209100' },
    update: {},
    create: { code: '6209100', description: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação' }
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
