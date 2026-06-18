// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface MenuSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  moduleId?: string;
  routineId?: string;
  parentId?: string;
  label?: string;
  link?: string;
  isActive?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.menu.create({
      data: this.mapPayload(data),
      include: { module: true, routine: true, parent: true },
    });
  }

  findAll() {
    return this.prisma.menu.findMany({
      include: { module: true, routine: true, parent: true },
      orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
    });
  }

  async search(query: MenuSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.menu.count({ where });
    const items = await this.prisma.menu.findMany({
      where,
      include: { module: true, routine: true, parent: true },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.menu.findUnique({ where: { id }, include: { module: true, routine: true, parent: true } });
    if (!item) throw new NotFoundException('Menu não encontrado.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.menu.update({
      where: { id },
      data: this.mapPayload(data),
      include: { module: true, routine: true, parent: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id } });
  }

  private mapPayload(data: any) {
    return {
      moduleId: data.moduleId ? Number(data.moduleId) : null,
      routineId: data.routineId ? Number(data.routineId) : null,
      parentId: data.parentId ? Number(data.parentId) : null,
      label: data.label,
      shortLabel: data.shortLabel || null,
      icon: data.icon || null,
      link: data.link || null,
      sortOrder: Number(data.sortOrder) || 0,
      isActive: data.isActive !== false,
    };
  }

  private buildWhere(query: MenuSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim();
    if (search) {
      andFilters.push({
        OR: [
          { label: { contains: search, mode: 'insensitive' } },
          { link: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (query.moduleId) andFilters.push({ moduleId: Number(query.moduleId) });
    if (query.routineId) andFilters.push({ routineId: Number(query.routineId) });
    if (query.parentId) andFilters.push({ parentId: Number(query.parentId) });
    if (query.label?.trim()) andFilters.push({ label: { contains: query.label.trim(), mode: 'insensitive' } });
    if (query.link?.trim()) andFilters.push({ link: { contains: query.link.trim(), mode: 'insensitive' } });
    if (query.isActive === 'true' || query.isActive === 'false') andFilters.push({ isActive: query.isActive === 'true' });
    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    if (sortProperty === 'module.name') return { module: { name: direction } };
    if (sortProperty === 'routine.name') return { routine: { name: direction } };
    if (sortProperty === 'parent.label') return { parent: { label: direction } };
    const map: Record<string, string> = { label: 'label', link: 'link', sortOrder: 'sortOrder', isActive: 'isActive' };
    return { [map[sortProperty || 'label'] || 'label']: direction };
  }
}
