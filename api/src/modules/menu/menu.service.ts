import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService implements OnModuleInit {
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

    const menus = await this.prisma.menu.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    // Filtra por permissão (ADMIN_SAAS vê tudo, outros conforme o banco)
    const filteredMenus = menus.filter((menu) => 
      userRole === 'ADMIN_SAAS' || menu.roles.includes(userRole) || menu.roles.includes('USER')
    );

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
    // Limpa menus do CNPJ para garantir unificação
    await this.prisma.menu.deleteMany({
      where: { group: 'Dados Públicos RFB' }
    });

    const count = await this.prisma.menu.count();
    
    // Se já existem outros menus, apenas garante o unificado do CNPJ (evitando duplicidade)
    if (count > 0) {
      const exists = await this.prisma.menu.findFirst({
        where: { name: 'Empresas (RFB)', group: 'Dados Públicos RFB' }
      });

      if (!exists) {
        await this.prisma.menu.create({
          data: { module: 'SAAS', type: 'SIDEBAR', group: 'Dados Públicos RFB', name: 'Empresas (RFB)', link: '/saas/cnpj/estabelecimentos', icon: 'an an-building', order: 100, roles: ['USER', 'ADMIN', 'ADMIN_SAAS'] }
        });
      }
      return;
    }

    // Se estiver vazio, cria tudo
    await this.prisma.menu.createMany({
      data: [
        { module: 'SISTEMA', type: 'SIDEBAR', group: null, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USER', 'ADMIN', 'ADMIN_SAAS'] },
        { module: 'SISTEMA', type: 'TOOLBAR', name: 'Configurações', link: '/settings', icon: 'an an-gear', order: 1, roles: ['ADMIN', 'ADMIN_SAAS'] },
        { module: 'SISTEMA', type: 'TOOLBAR', name: 'Apps', link: null, icon: 'an an-grid-four', order: 2, roles: ['USER', 'ADMIN', 'ADMIN_SAAS'] },
        { module: 'SAAS', type: 'SIDEBAR', group: 'Gestão SaaS', name: 'Metadados', link: '/saas/metadata-editor', icon: 'an an-database', order: 10, roles: ['ADMIN_SAAS'] },
        { module: 'SAAS', type: 'SIDEBAR', group: 'Gestão SaaS', name: 'Menus', link: '/saas/menu', icon: 'an an-list', order: 11, roles: ['ADMIN_SAAS'] },
        { module: 'SAAS', type: 'SIDEBAR', group: 'Dados Públicos RFB', name: 'Empresas (RFB)', link: '/saas/cnpj/estabelecimentos', icon: 'an an-building', order: 100, roles: ['USER', 'ADMIN', 'ADMIN_SAAS'] },
      ]
    });
  }
}
