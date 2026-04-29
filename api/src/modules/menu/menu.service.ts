import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedInitialMenus();
  }

  async getMenuByRole(role: string) {
    const allItems = await this.prisma.menu.findMany({
      where: {
        active: true,
        roles: { has: role }
      },
      orderBy: { order: 'asc' }
    });

    const sidebarItems = allItems.filter(i => i.type === 'SIDEBAR');
    const toolbarItems = allItems.filter(i => i.type === 'TOOLBAR');

    return {
      menus: this.buildMenuTree(sidebarItems),
      actions: toolbarItems.map(i => ({
        label: i.name,
        icon: i.icon,
        action: i.link ? () => {} : undefined, // No front trataremos o link
        url: i.link
      }))
    };
  }

  private buildMenuTree(items: any[]) {
    const menuTree: any[] = [];
    const groups: { [key: string]: any } = {};

    items.forEach(item => {
      // Se não tem grupo, é um item raiz
      if (!item.group) {
        menuTree.push({
          label: item.name,
          link: item.link,
          icon: item.icon,
          badge: item.isCloud ? { value: 'Nuvem', color: 'color-01' } : undefined
        });
        return;
      }

      // Se tem grupo, organiza em sub-itens
      if (!groups[item.group]) {
        groups[item.group] = {
          label: item.group,
          icon: 'an an-folder',
          subItems: []
        };
        menuTree.push(groups[item.group]);
      }

      // Suporte básico a subgrupo (nível 3)
      if (item.subGroup) {
        let subGroup = groups[item.group].subItems.find(s => s.label === item.subGroup);
        if (!subGroup) {
          subGroup = { label: item.subGroup, subItems: [] };
          groups[item.group].subItems.push(subGroup);
        }
        subGroup.subItems.push({
          label: item.name,
          link: item.link,
          icon: item.icon
        });
      } else {
        groups[item.group].subItems.push({
          label: item.name,
          link: item.link,
          icon: item.icon
        });
      }
    });

    return menuTree;
  }

  async seedInitialMenus() {
    const count = await this.prisma.menu.count();
    if (count > 0) return;

    await this.prisma.menu.createMany({
      data: [
        // Sidebar
        { module: 'SISTEMA', type: 'SIDEBAR', group: null, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USER', 'ADMIN', 'SUPER_ADMIN'] },
        
        // Toolbar (Header Moderno)
        { module: 'SISTEMA', type: 'TOOLBAR', name: 'Configurações', link: '/settings', icon: 'an an-gear', order: 1, roles: ['ADMIN', 'SUPER_ADMIN'] },
        { module: 'SISTEMA', type: 'TOOLBAR', name: 'Apps', link: null, icon: 'an an-grid-four', order: 2, roles: ['USER', 'ADMIN', 'SUPER_ADMIN'] },
        { module: 'SISTEMA', type: 'TOOLBAR', name: 'Notificações', link: '/notifications', icon: 'an an-bell', order: 3, roles: ['USER', 'ADMIN', 'SUPER_ADMIN'] },

        // Dados Públicos (Unificados)
        { module: 'SAAS', type: 'SIDEBAR', group: 'Dados Públicos RFB', name: 'Empresas (RFB)', link: '/saas/cnpj/estabelecimentos', icon: 'an an-building', order: 100, roles: ['SUPER_ADMIN'] },
      ]
    });
  }
}
