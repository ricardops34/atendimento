import { PrismaClient, MenuType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Carga de Menus e Estrutura Completa...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('bjsoft2026', saltRounds);

  // 1. Plano Pro
  const plan = await prisma.plan.upsert({
    where: { name: 'Plano Pro' },
    update: {},
    create: {
      name: 'Plano Pro',
      description: 'Plano completo para gestão empresarial',
      maxUsers: 10,
      maxBranches: 3,
      maxRecords: 10000,
      features: ['ALL'],
    },
  });

  // 2. Grupo (Tenant Master)
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'bjsoft.com.br' },
    update: { 
      name: 'B. J. INFORMATICA',
      email: 'conasci@gmail.com'
    },
    create: {
      name: 'B. J. INFORMATICA',
      domain: 'bjsoft.com.br',
      email: 'conasci@gmail.com',
      planId: plan.id,
      status: 'ACTIVE',
    },
  });

  // 3. Empresa Matriz
  const company = await prisma.company.upsert({
    where: { document: '19654062000145' },
    update: { name: 'RICARDO PATAY SOTOMAYOR' },
    create: {
      tenantId: tenant.id,
      name: 'RICARDO PATAY SOTOMAYOR',
      tradeName: 'B. J. INFORMATICA',
      document: '19654062000145',
      status: 'ACTIVE'
    }
  });

  // 4. Filial Principal
  const branch = await prisma.branch.upsert({
    where: { document: '19654062000145' },
    update: {},
    create: {
      tenantId: tenant.id,
      companyId: company.id,
      name: 'MATRIZ - CAMPO GRANDE',
      document: '19654062000145',
      city: 'CAMPO GRANDE',
      state: 'MS',
      zipCode: '79117130',
      address: 'R JOAO GUIMARAES ROSA',
      number: '459',
      neighborhood: 'VILA NASSER',
      isMain: true,
      status: 'ACTIVE'
    }
  });

  // 5. Grupos Padrão (Perfis)
  const roles = [
    { name: 'ADMIN_SAAS', description: 'Administrador Total do Sistema (BJSoft)' },
    { name: 'ADMIN_SISTEMA', description: 'Administrador da Empresa Cliente' },
    { name: 'USUARIO', description: 'Usuário Operacional' }
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name_tenantId: { name: r.name, tenantId: tenant.id } },
      update: { description: r.description },
      create: { ...r, tenantId: tenant.id }
    });
  }

  const superAdminRole = await prisma.role.findFirst({ 
    where: { name: 'ADMIN_SAAS', tenantId: tenant.id } 
  });

  // 6. Usuário Ricardo
  const user = await prisma.user.upsert({
    where: { email: 'ricardo@bjsoft.com.br' },
    update: {
      password: hashedPassword,
      roleId: superAdminRole?.id,
      level: 9,
      status: 'ACTIVE'
    },
    create: {
      email: 'ricardo@bjsoft.com.br',
      login: 'ricardo@bjsoft.com.br',
      password: hashedPassword,
      name: 'Ricardo Patay Sotomayor',
      tenantId: tenant.id,
      roleId: superAdminRole?.id,
      level: 9,
      status: 'ACTIVE'
    },
  });

  // Vínculos N:N
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

  // 7. Menus Detalhados (SAAS, SISTEMA e TOOLBAR)
  const menuData = [
    // --- MÓDULO SISTEMA (SIDEBAR) ---
    { module: 'SISTEMA', type: MenuType.SIDEBAR, group: null, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USUARIO', 'ADMIN_SISTEMA', 'ADMIN_SAAS'] },
    
    // --- MÓDULO SAAS (SIDEBAR) ---
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Segurança', name: 'Usuários', link: '/app/users', icon: 'an an-user', order: 10, roles: ['ADMIN_SAAS'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Segurança', name: 'Perfis de Acesso', link: '/app/roles', icon: 'an an-users-three', order: 11, roles: ['ADMIN_SAAS'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Segurança', name: 'Log de Auditoria', link: '/saas/audit', icon: 'an an-shield-check', order: 12, roles: ['ADMIN_SAAS'] },
    
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Empresas (Tenants)', link: '/app/companies', icon: 'an an-briefcase', order: 20, roles: ['ADMIN_SAAS'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Filiais', link: '/app/branches', icon: 'an an-tree-structure', order: 21, roles: ['ADMIN_SAAS'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Planos', link: '/saas/plans', icon: 'an an-tag', order: 22, roles: ['ADMIN_SAAS'] },
    
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Customização', name: 'Metadados', link: '/saas/metadata-editor', icon: 'an an-database', order: 30, roles: ['ADMIN_SAAS'] },
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Customização', name: 'Gestão de Menus', link: '/saas/menu', icon: 'an an-list', order: 31, roles: ['ADMIN_SAAS'] },
    
    { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Dados Públicos', name: 'Empresas (RFB)', link: '/saas/cnpj/estabelecimentos', icon: 'an an-buildings', order: 100, roles: ['USUARIO', 'ADMIN_SAAS'] },

    // --- TOOLBAR (Ações Rápidas) ---
    { module: 'SISTEMA', type: MenuType.TOOLBAR, name: 'Configurações', link: '/settings', icon: 'an an-gear', order: 1, roles: ['ADMIN_SISTEMA', 'ADMIN_SAAS'] },
    { module: 'SISTEMA', type: MenuType.TOOLBAR, name: 'Notificações', link: '/notifications', icon: 'an an-bell', order: 2, roles: ['USUARIO', 'ADMIN_SISTEMA', 'ADMIN_SAAS'] }
  ];

  for (const m of menuData) {
    const menu = await prisma.menu.upsert({
      where: { name_module_type: { name: m.name, module: m.module, type: m.type } },
      update: m,
      create: m
    });

    // Vincular menu ao usuário mestre para garantir
    await prisma.usersOnMenus.upsert({
      where: { userId_menuId: { userId: user.id, menuId: menu.id } },
      update: {},
      create: { userId: user.id, menuId: menu.id }
    });
  }

  console.log('✅ Carga completa (Menus/Roles/Estrutura) finalizada!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
