// @ts-nocheck
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const items = this.mapMenuItemsPayload(data.items);
    await this.validateRoutineDetails(items);

    return this.prisma.$transaction(async (tx: any) => {
      const menu = await tx.menu.create({ data: this.mapMenuPayload(data) });
      if (items.length) {
        await tx.menuItem.createMany({
          data: items.map((item: any) => ({ ...item, menuId: menu.id })),
        });
      }
      const saved = await tx.menu.findUnique({ where: { id: menu.id }, include: this.menuWithItemsInclude() });
      return this.mapMenuWithItems(saved);
    });
  }

  findAll() {
    return this.prisma.menu.findMany({ orderBy: { title: 'asc' } });
  }

  async search(query: Record<string, string | undefined>) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const filters: any[] = [];
    const search = query.search?.trim() || query.title?.trim();
    if (search) filters.push({ title: { contains: search, mode: 'insensitive' } });
    if (query.isActive === 'true' || query.isActive === 'false') filters.push({ isActive: query.isActive === 'true' });
    const where = filters.length ? { AND: filters } : {};
    const total = await this.prisma.menu.count({ where });
    const items = await this.prisma.menu.findMany({
      where,
      orderBy: { title: query.sortDirection === 'descending' ? 'desc' : 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.menu.findUnique({ where: { id }, include: this.menuWithItemsInclude() });
    if (!item) throw new NotFoundException('Menu nao encontrado.');
    return this.mapMenuWithItems(item);
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    const items = this.mapMenuItemsPayload(data.items);
    await this.validateRoutineDetails(items);

    return this.prisma.$transaction(async (tx: any) => {
      await tx.menu.update({ where: { id }, data: this.mapMenuPayload(data) });
      await tx.menuItem.deleteMany({ where: { menuId: id } });
      if (items.length) {
        await tx.menuItem.createMany({
          data: items.map((item: any) => ({ menuId: id, ...item })),
        });
      }
      const saved = await tx.menu.findUnique({ where: { id }, include: this.menuWithItemsInclude() });
      return this.mapMenuWithItems(saved);
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const profiles = await this.prisma.profile.count({ where: { menuId: id } });
    if (profiles > 0) throw new ConflictException('Este menu esta associado a um perfil.');
    return this.prisma.menu.delete({ where: { id } });
  }

  async createRoutineLink(data: any) {
    await this.validateMenuAndRoutine(Number(data.menuId), Number(data.routineId));
    const item = await this.prisma.menuItem.create({
      data: {
        menuId: Number(data.menuId),
        routineId: Number(data.routineId),
        sortOrder: Number(data.sortOrder) || 0,
        isActive: data.isActive !== false,
      },
      include: this.menuItemInclude(),
    });
    return this.mapMenuItem(item);
  }

  async searchRoutineLinks(query: Record<string, string | undefined>) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const filters: any[] = [];
    const search = query.search?.trim();
    if (search) {
      filters.push({ OR: [
        { menu: { title: { contains: search, mode: 'insensitive' } } },
        { routine: { name: { contains: search, mode: 'insensitive' } } },
        { routine: { module: { name: { contains: search, mode: 'insensitive' } } } },
      ] });
    }
    if (query.menu?.trim()) filters.push({ menu: { title: { contains: query.menu.trim(), mode: 'insensitive' } } });
    if (query.module?.trim()) filters.push({ routine: { module: { name: { contains: query.module.trim(), mode: 'insensitive' } } } });
    if (query.routine?.trim()) filters.push({ routine: { name: { contains: query.routine.trim(), mode: 'insensitive' } } });
    const where = filters.length ? { AND: filters } : {};
    const total = await this.prisma.menuItem.count({ where });
    const records = await this.prisma.menuItem.findMany({
      where,
      include: this.menuItemInclude(),
      orderBy: this.menuItemOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const items = records.map((item: any) => this.mapMenuItem(item));
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findRoutineLink(id: number) {
    const item = await this.prisma.menuItem.findUnique({ where: { id }, include: this.menuItemInclude() });
    if (!item) throw new NotFoundException('Item de menu nao encontrado.');
    return this.mapMenuItem(item);
  }

  async updateRoutineLink(id: number, data: any) {
    await this.findRoutineLink(id);
    await this.validateMenuAndRoutine(Number(data.menuId), Number(data.routineId));
    const item = await this.prisma.menuItem.update({
      where: { id },
      data: {
        menuId: Number(data.menuId),
        routineId: Number(data.routineId),
        sortOrder: Number(data.sortOrder) || 0,
        isActive: data.isActive !== false,
      },
      include: this.menuItemInclude(),
    });
    return this.mapMenuItem(item);
  }

  async removeRoutineLink(id: number) {
    await this.findRoutineLink(id);
    return this.prisma.menuItem.delete({ where: { id } });
  }

  private async validateMenuAndRoutine(menuId: number, routineId: number) {
    const [menu, routine] = await Promise.all([
      this.prisma.menu.findUnique({ where: { id: menuId } }),
      this.prisma.routine.findUnique({ where: { id: routineId } }),
    ]);
    if (!menu) throw new NotFoundException('Menu nao encontrado.');
    if (!routine) throw new NotFoundException('Rotina nao encontrada.');
    if (routine.key === 'dashboard-home') {
      throw new ConflictException('O Dashboard e acessado pelo Inicio e nao pode ser item de menu.');
    }
  }

  private mapMenuPayload(data: any) {
    return { title: data.title?.trim(), isActive: data.isActive !== false };
  }

  private mapMenuItemsPayload(items: any[] | undefined) {
    return (items || []).map((item) => ({
      routineId: Number(item.routineId),
      sortOrder: Number(item.sortOrder) || 0,
      isActive: item.isActive !== false,
    }));
  }

  private async validateRoutineDetails(items: any[]) {
    const routineIds = items.map((item) => item.routineId);
    if (new Set(routineIds).size !== routineIds.length) {
      throw new ConflictException('Uma rotina nao pode aparecer duas vezes no mesmo menu.');
    }
    if (!routineIds.length) return;

    const routines = await this.prisma.routine.findMany({
      where: { id: { in: routineIds } },
      select: { id: true, key: true },
    });
    if (routines.length !== routineIds.length) throw new NotFoundException('Rotina nao encontrada.');
    if (routines.some((routine: any) => routine.key === 'dashboard-home')) {
      throw new ConflictException('O Dashboard e acessado pelo Inicio e nao pode ser item de menu.');
    }
  }

  private menuWithItemsInclude() {
    return {
      items: {
        include: this.menuItemInclude(),
        orderBy: { sortOrder: 'asc' },
      },
    };
  }

  private mapMenuWithItems(menu: any) {
    return {
      id: menu.id,
      title: menu.title,
      isActive: menu.isActive,
      items: (menu.items || []).map((item: any) => this.mapMenuItem(item)),
    };
  }

  private menuItemInclude() {
    return { menu: true, routine: { include: { module: true } } };
  }

  private mapMenuItem(item: any) {
    return {
      id: item.id,
      menuId: item.menuId,
      routineId: item.routineId,
      menu: item.menu.title,
      moduleId: item.routine.moduleId,
      module: item.routine.module.name,
      routine: item.routine.name,
      routineKey: item.routine.key,
      link: item.routine.path,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    };
  }

  private menuItemOrderBy(property?: string, direction?: string) {
    const order = direction === 'descending' ? 'desc' : 'asc';
    if (property === 'menu') return { menu: { title: order } };
    if (property === 'module') return { routine: { module: { name: order } } };
    if (property === 'routine') return { routine: { name: order } };
    return { sortOrder: order };
  }
}
