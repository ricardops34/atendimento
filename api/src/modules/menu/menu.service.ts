import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MenuType, MenuModule } from '@prisma/client';

@Injectable()
export class MenuService implements OnModuleInit {
  private readonly logger = new Logger(MenuService.name);
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // A carga inicial agora é gerenciada pelo SystemSeedService
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
    const items = await this.prisma.menu.findMany({
      orderBy: { order: 'asc' }
    });
    return { items };
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

}
