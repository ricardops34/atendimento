import { PrismaClient, MenuType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Carga Inicial Completa...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('bjsoft2026', saltRounds);

  // 1. Criar Plano
  const plan = await prisma.plan.upsert({
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

  // 2. Criar o Grupo (Tenant Master)
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'bjsoft.com.br' },
    update: { name: 'BJSOFT SISTEMAS' },
    create: {
      name: 'BJSOFT SISTEMAS',
      domain: 'bjsoft.com.br',
      planId: plan.id,
      status: 'ACTIVE',
    },
  });

  // 3. Criar a Empresa
  const company = await prisma.company.upsert({
    where: { document: '19654062000145' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'RICARDO PATAY SOTOMAYOR LTDA',
      tradeName: 'BJSOFT MATRIZ',
      document: '19654062000145',
      status: 'ACTIVE'
    }
  });

  // 4. Criar a Filial
  const branch = await prisma.branch.upsert({
    where: { document: '19654062000145' }, // Usando o mesmo pra exemplo
    update: {},
    create: {
      tenantId: tenant.id,
      companyId: company.id,
      name: 'BJSOFT - FILIAL CAMPO GRANDE',
      document: '19654062000145',
      city: 'Campo Grande',
      state: 'MS',
      isMain: true
    }
  });

  // 5. Criar Perfis
  const superAdminRole = await prisma.role.upsert({
    where: { name_tenantId: { name: 'SUPER_ADMIN', tenantId: tenant.id } },
    update: {},
    create: { name: 'SUPER_ADMIN', tenantId: tenant.id }
  });

  // 6. Criar Usuário Mestre
  const user = await prisma.user.upsert({
    where: { email: 'ricardo@bjsoft.com.br' },
    update: {
      password: hashedPassword,
      roleId: superAdminRole.id,
      level: 9,
      status: 'ACTIVE'
    },
    create: {
      email: 'ricardo@bjsoft.com.br',
      login: 'ricardo@bjsoft.com.br',
      password: hashedPassword,
      name: 'Ricardo Patay Sotomayor',
      tenantId: tenant.id,
      roleId: superAdminRole.id,
      level: 9,
      status: 'ACTIVE'
    },
  });

  // Vincular Usuário à Empresa e Filial (N:N)
  await prisma.usersOnCompanies.upsert({
    where: { userId_companyId: { userId: user.id, companyId: company.id } },
    update: {},
    create: { userId: user.id, companyId: company.id, isDefault: true }
  });

  await prisma.usersOnBranches.upsert({
    where: { userId_branchId: { userId: user.id, branchId: branch.id } },
    update: {},
    create: { userId: user.id, branchId: branch.id, isDefault: true }
  });

  // 7. Criar Menus Iniciais
  const menuData = [
    { module: 'SISTEMA', type: MenuType.SIDEBAR, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USER', 'SUPER_ADMIN'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Administração', name: 'Usuários', link: '/app/users', icon: 'an an-user', order: 10, roles: ['SUPER_ADMIN'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Administração', name: 'Perfis', link: '/app/roles', icon: 'an an-users-three', order: 11, roles: ['SUPER_ADMIN'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Empresas', link: '/app/companies', icon: 'an an-briefcase', order: 20, roles: ['SUPER_ADMIN'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Filiais', link: '/app/branches', icon: 'an an-tree-structure', order: 21, roles: ['SUPER_ADMIN'] },
  ];

  for (const m of menuData) {
    const menu = await prisma.menu.upsert({
      where: { name_module_type: { name: m.name, module: m.module, type: m.type } },
      update: m,
      create: m
    });

    // Vincular menu ao usuário (opcional se o papel já permitir, mas garante acesso)
    await prisma.usersOnMenus.upsert({
      where: { userId_menuId: { userId: user.id, menuId: menu.id } },
      update: {},
      create: { userId: user.id, menuId: menu.id }
    });
  }

  console.log('✅ Carga inicial concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
