import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const systemRoutines = [
    { name: 'admin.tenants', label: 'Empresas', module: 'Gestão SaaS', icon: 'po-icon-company', link: '/admin/tenants', type: 'S' },
    { name: 'admin.plans', label: 'Planos', module: 'Gestão SaaS', icon: 'po-icon-finance', link: '/admin/plans', type: 'S' },
    { name: 'admin.metadata', label: 'Editor de Telas', module: 'Gestão SaaS', icon: 'po-icon-grid', link: '/admin/metadata-editor', type: 'S' },
    { name: 'app.users', label: 'Usuários', module: 'Minha Empresa', icon: 'po-icon-users', link: '/admin/users', type: 'S' },
    { name: 'app.roles', label: 'Perfis de Acesso', module: 'Minha Empresa', icon: 'po-icon-lock', link: '/admin/roles', type: 'S' },
  ];

  console.log('Semeando rotinas do sistema...');

  for (const routine of systemRoutines) {
    await prisma.routine.upsert({
      where: { name: routine.name },
      update: routine,
      create: routine
    });
  }

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
