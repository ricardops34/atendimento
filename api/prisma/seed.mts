import { PrismaClient, MenuType, MenuModule } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Carga de Menus Hierárquicos (SAAS ADMIN)...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('bjsoft2026', saltRounds);

  // 1. Setup Base
  const plan = await prisma.plan.upsert({
    where: { name: 'Plano Pro' },
    update: {},
    create: { name: 'Plano Pro', maxUsers: 10, maxBranches: 3 }
  });

  const tenant = await prisma.tenant.upsert({
    where: { domain: 'bjsoft.com.br' },
    update: { name: 'B. J. INFORMATICA' },
    create: { name: 'B. J. INFORMATICA', domain: 'bjsoft.com.br', planId: plan.id }
  });

  const superAdminRole = await prisma.role.upsert({
    where: { name_tenantId: { name: 'ADMIN_SAAS', tenantId: tenant.id } },
    update: {},
    create: { name: 'ADMIN_SAAS', tenantId: tenant.id }
  });

  const user = await prisma.user.upsert({
    where: { email: 'ricardo@bjsoft.com.br' },
    update: { level: 9 },
    create: {
      email: 'ricardo@bjsoft.com.br',
      login: 'ricardo@bjsoft.com.br',
      password: hashedPassword,
      name: 'Ricardo Patay Sotomayor',
      tenantId: tenant.id,
      roleId: superAdminRole.id,
      level: 9
    }
  });

  // 2. Função Auxiliar
  const createMenu = async (m: any) => {
    return prisma.menu.upsert({
      where: { name_module_type: { name: m.name, module: m.module, type: m.type } },
      update: m,
      create: m
    });
  };

  // --- MÓDULO SAAS (ROOT) ---
  const saasRoot = await createMenu({ 
    module: MenuModule.SAAS, 
    type: MenuType.SIDEBAR, 
    name: 'Administração SaaS', 
    icon: 'an an-gear', 
    order: 1,
    roles: ['ADMIN_SAAS']
  });

  // --- GRUPO: SEGURANÇA ---
  const saasSeg = await createMenu({ 
    module: MenuModule.SAAS, 
    type: MenuType.SIDEBAR, 
    name: 'Segurança', 
    parentId: saasRoot.id, 
    order: 1,
    roles: ['ADMIN_SAAS']
  });
  
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Usuários', link: '/app/users', parentId: saasSeg.id, icon: 'an an-user', order: 1, roles: ['ADMIN_SAAS'] });
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Perfis de Acesso', link: '/app/roles', parentId: saasSeg.id, icon: 'an an-users-three', order: 2, roles: ['ADMIN_SAAS'] });
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Log de Auditoria', link: '/saas/audit', parentId: saasSeg.id, icon: 'an an-shield-check', order: 3, roles: ['ADMIN_SAAS'] });

  // --- GRUPO: ESTRUTURA ---
  const saasEst = await createMenu({ 
    module: MenuModule.SAAS, 
    type: MenuType.SIDEBAR, 
    name: 'Estrutura', 
    parentId: saasRoot.id, 
    order: 2,
    roles: ['ADMIN_SAAS']
  });

  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Empresas (Tenants)', link: '/app/companies', parentId: saasEst.id, icon: 'an an-briefcase', order: 1, roles: ['ADMIN_SAAS'] });
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Filiais', link: '/app/branches', parentId: saasEst.id, icon: 'an an-tree-structure', order: 2, roles: ['ADMIN_SAAS'] });
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Planos', link: '/saas/plans', parentId: saasEst.id, icon: 'an an-tag', order: 3, roles: ['ADMIN_SAAS'] });

  // --- GRUPO: CUSTOMIZAÇÃO ---
  const saasCust = await createMenu({ 
    module: MenuModule.SAAS, 
    type: MenuType.SIDEBAR, 
    name: 'Customização', 
    parentId: saasRoot.id, 
    order: 3,
    roles: ['ADMIN_SAAS']
  });

  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Metadados', link: '/saas/metadata-editor', parentId: saasCust.id, icon: 'an an-database', order: 1, roles: ['ADMIN_SAAS'] });
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Gestão de Menus', link: '/saas/menu', parentId: saasCust.id, icon: 'an an-list', order: 2, roles: ['ADMIN_SAAS'] });

  // --- GRUPO: DADOS PÚBLICOS ---
  const saasDados = await createMenu({ 
    module: MenuModule.SAAS, 
    type: MenuType.SIDEBAR, 
    name: 'Dados Públicos', 
    parentId: saasRoot.id, 
    order: 10,
    roles: ['ADMIN_SAAS', 'USUARIO']
  });

  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Empresas (RFB)', link: '/saas/cnpj/estabelecimentos', parentId: saasDados.id, icon: 'an an-buildings', order: 1, roles: ['ADMIN_SAAS', 'USUARIO'] });

  // --- MÓDULO SISTEMA ---
  await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USUARIO', 'ADMIN_SAAS'] });

  console.log('✅ Carga de Menus SAAS finalizada!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
