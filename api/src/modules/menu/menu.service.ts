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

    if (!user) return { sidebar: [], toolbar: [] };

    const userRole = user.level === 9 ? 'ADMIN_SAAS' : (user.role?.name || 'USER');

    // Busca todos os menus ativos (A lógica de filtro por plano pode ser aplicada aqui depois)
    const allMenus = await this.prisma.menu.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    // Filtra por permissão básica de Role
    const allowedMenus = allMenus.filter(m => 
      userRole === 'ADMIN_SAAS' || m.roles.includes(userRole) || m.roles.includes('USER')
    );

    return {
      sidebar: this.buildRecursiveMenu(allowedMenus, 'SIDEBAR'),
      toolbar: this.buildRecursiveMenu(allowedMenus, 'TOOLBAR')
    };
  }

  private buildRecursiveMenu(menus: any[], type: MenuType, parentId: string | null = null): any[] {
    return menus
      .filter(m => m.type === type && m.parentId === parentId)
      .map(m => {
        const subItems = this.buildRecursiveMenu(menus, type, m.id);
        const item: any = {
          label: m.name,
          link: m.link || undefined,
          icon: m.icon || undefined
        };

        if (subItems.length > 0) {
          item.subItems = subItems;
        }

        return item;
      });
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
