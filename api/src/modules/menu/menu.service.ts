import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MenuType } from '@prisma/client';

@Injectable()
export class MenuService implements OnModuleInit {
  private readonly logger = new Logger(MenuService.name);
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedInitialMenus();
  }

  async getMenu(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) return [];

    const userRole = user.level === 9 ? 'ADMIN_SAAS' : (user.role?.name || 'USER');

    // Busca o plano do tenant e suas rotinas ativas
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: user.tenantId },
      include: {
        plan: {
          include: { routines: { include: { routine: true } } }
        }
      }
    });

    const allowedRoutineLinks = tenant?.plan.routines.map(pr => pr.routine.link) || [];

    const menus = await this.prisma.menu.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    // Filtra por permissão e por disponibilidade no Plano
    const filteredMenus = menus.filter((menu) => {
      // ADMIN_SAAS sempre vê tudo
      if (userRole === 'ADMIN_SAAS') return true;

      // Verifica se o perfil tem acesso
      const hasRoleAccess = menu.roles.includes(userRole) || menu.roles.includes('USER');
      if (!hasRoleAccess) return false;

      // Se o menu tem um link, verifica se esse link está no catálogo de rotinas do Plano
      if (menu.link && menu.link !== '/dashboard') {
        return allowedRoutineLinks.some(link => link && menu.link!.startsWith(link));
      }

      return true;
    });

    // Agrupa por módulo e grupos
    return this.buildMenuTree(filteredMenus);
  }

  private buildMenuTree(menus: any[]) {
    const menuTree: any = {
      sidebar: [],
      toolbar: []
    };

    menus.forEach(menu => {
      if (menu.type === 'SIDEBAR') {
        if (menu.group) {
          let group = menuTree.sidebar.find((i: any) => i.label === menu.group);
          if (!group) {
            group = { label: menu.group, icon: 'an an-folder', subItems: [] };
            menuTree.sidebar.push(group);
          }
          group.subItems.push({
            label: menu.name,
            link: menu.link,
            icon: menu.icon
          });
        } else {
          menuTree.sidebar.push({
            label: menu.name,
            link: menu.link,
            icon: menu.icon
          });
        }
      } else {
        menuTree.toolbar.push({
          label: menu.name,
          link: menu.link,
          icon: menu.icon
        });
      }
    });

    return menuTree;
  }

  async findAll() {
    return this.prisma.menu.findMany({
      orderBy: { order: 'asc' }
    });
  }

  async create(data: any) {
    return this.prisma.menu.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.menu.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.menu.delete({
      where: { id }
    });
  }

  async seedInitialMenus() {
    const menus = [
      { module: 'SISTEMA', type: MenuType.SIDEBAR, group: null, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USER', 'ADMIN', 'ADMIN_SAAS'] },
      { module: 'SISTEMA', type: MenuType.TOOLBAR, name: 'Configurações', link: '/settings', icon: 'an an-gear', order: 1, roles: ['ADMIN', 'ADMIN_SAAS'] },
      { module: 'SISTEMA', type: MenuType.TOOLBAR, name: 'Apps', link: null, icon: 'an an-grid-four', order: 2, roles: ['USER', 'ADMIN', 'ADMIN_SAAS'] },
      { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Gestão SaaS', name: 'Metadados', link: '/saas/metadata-editor', icon: 'an an-database', order: 10, roles: ['ADMIN_SAAS'] },
      { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Gestão SaaS', name: 'Menus', link: '/saas/menu', icon: 'an an-list', order: 11, roles: ['ADMIN_SAAS'] },
      { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Dados Públicos RFB', name: 'Empresas (RFB)', link: '/saas/cnpj/estabelecimentos', icon: 'an an-building', order: 100, roles: ['USER', 'ADMIN', 'ADMIN_SAAS'] },
    ];

    try {
      for (const m of menus) {
        await this.prisma.menu.upsert({
          where: { name_module_type: { name: m.name, module: m.module, type: m.type as any } },
          update: m as any,
          create: m as any
        });
      }
      this.logger.log('Menus iniciais sincronizados com sucesso.');
    } catch (error) {
      this.logger.error('Falha ao sincronizar menus iniciais. Certifique-se de rodar npx prisma db push.', error.stack);
    }
  }
}
