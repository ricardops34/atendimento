import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function checkLogin() {
  try {
    const email = 'admin@fallback.com';
    const password = 'admin123';
    
    console.log('Buscando usuario...');
    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        profile: {
          include: {
            profileModules: { include: { module: true } },
          },
        },
        userEmpresas: {
          include: { empresa: true },
        },
      },
    });

    if (!user) {
      console.log('Usuario nao encontrado');
      return;
    }

    console.log('Usuario encontrado:', user.email, 'isActive:', user.isActive);
    console.log('Qtd Tenants:', user.userEmpresas?.length);
    console.log('Hash da senha:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Senha confere?', isMatch);

    // Simulando login
    const empresaId = user.userEmpresas[0].empresaId;
    const modules = (user.profile?.profileModules || [])
      .filter((pm: any) => pm.canRead)
      .map((pm: any) => pm.module.key);

    console.log('Modulos:', modules);

    const allowedModuleKeys = modules.filter(Boolean);
    const items = await prisma.menu.findMany({
      where: {
        isActive: true,
        OR: [
          {
            moduleId: null,
            routineId: null,
          },
          { module: { key: { in: allowedModuleKeys } } },
          { routine: { module: { key: { in: allowedModuleKeys } } } },
        ],
      },
      include: {
        routine: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
    });

    console.log('Menus carregados:', items.length);

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkLogin();
