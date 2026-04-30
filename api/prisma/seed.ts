import { PrismaClient, MenuType, MenuModule } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Carga de Menus Hierárquicos...');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('bjsoft2026', saltRounds);

  // 1. Setup Base (Plano, Tenant, User)
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

  // 2. Função Auxiliar para criar menus com hierarquia
  const createMenu = async (m: any) => {
    return prisma.menu.upsert({
      where: { name_module_type: { name: m.name, module: m.module, type: m.type } },
      update: m,
      create: m
    });
  };

  // --- MÓDULO SAAS ---
  const saasRoot = await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Gestão SaaS', icon: 'an an-database', order: 1 });
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Usuários', link: '/app/users', parentId: saasRoot.id, icon: 'an an-user', order: 1 });
  await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Menus', link: '/saas/menu', parentId: saasRoot.id, icon: 'an an-list', order: 2 });

  // --- MÓDULO SISTEMA (Exemplo Financeiro solicitado) ---
  const financeiro = await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Financeiro', icon: 'an an-money', order: 10 });
  
  // Nível 2: Atualizações, Consultas, Relatórios
  const finAtu = await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Atualizações', parentId: financeiro.id, order: 1 });
  const finCon = await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Consultas', parentId: financeiro.id, order: 2 });
  const finRel = await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Relatórios', parentId: financeiro.id, order: 3 });
  const finMisc = await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Miscelâneas', parentId: financeiro.id, order: 4 });

  // Nível 3: Cadastros dentro de Atualizações
  const finAtuCad = await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Cadastros (Financeiro)', parentId: finAtu.id, order: 1 });
  const finAtuPagar = await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Contas a Pagar', parentId: finAtu.id, order: 2 });

  // Nível 4: Rotinas Finais
  await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Clientes', link: '/fin/clientes', parentId: finAtuCad.id, order: 1 });
  await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Fornecedores', link: '/fin/fornecedores', parentId: finAtuCad.id, order: 2 });
  await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Funções Contas a Pagar', link: '/fin/pagar', parentId: finAtuPagar.id, order: 1 });
  await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Borderô', link: '/fin/bordero', parentId: finAtuPagar.id, order: 2 });

  // Reprocessamento em Miscelâneas
  await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Reprocessamento', link: '/fin/misc/reprocessar', parentId: finMisc.id, order: 1 });

  console.log('✅ Carga de Menus Hierárquicos concluída!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
