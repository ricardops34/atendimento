// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface RoutineSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  moduleId?: string;
  name?: string;
  key?: string;
  path?: string;
  isActive?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class RoutinesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.routine.create({
      data: {
        moduleId: Number(data.moduleId),
        name: data.name,
        key: data.key,
        path: data.path,
        icon: data.icon || null,
        shortLabel: data.shortLabel || null,
        sortOrder: Number(data.sortOrder) || 0,
        isActive: data.isActive !== false,
      },
      include: { module: true },
    });
  }

  findAll() {
    return this.prisma.routine.findMany({ include: { module: true }, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] });
  }

  async search(query: RoutineSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.routine.count({ where });
    const items = await this.prisma.routine.findMany({
      where,
      include: { module: true },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.routine.findUnique({ where: { id }, include: { module: true } });
    if (!item) throw new NotFoundException('Rotina não encontrada.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.routine.update({
      where: { id },
      data: {
        moduleId: data.moduleId ? Number(data.moduleId) : undefined,
        name: data.name,
        key: data.key,
        path: data.path,
        icon: data.icon,
        shortLabel: data.shortLabel,
        sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : undefined,
        isActive: data.isActive,
      },
      include: { module: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.routine.delete({ where: { id } });
  }

  private buildWhere(query: RoutineSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim();
    if (search) {
      andFilters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { key: { contains: search, mode: 'insensitive' } },
          { path: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (query.moduleId) andFilters.push({ moduleId: Number(query.moduleId) });
    if (query.name?.trim()) andFilters.push({ name: { contains: query.name.trim(), mode: 'insensitive' } });
    if (query.key?.trim()) andFilters.push({ key: { contains: query.key.trim(), mode: 'insensitive' } });
    if (query.path?.trim()) andFilters.push({ path: { contains: query.path.trim(), mode: 'insensitive' } });
    if (query.isActive === 'true' || query.isActive === 'false') andFilters.push({ isActive: query.isActive === 'true' });
    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    if (sortProperty === 'module.name') return { module: { name: direction } };
    const map: Record<string, string> = { key: 'key', path: 'path', sortOrder: 'sortOrder', isActive: 'isActive', name: 'name' };
    return { [map[sortProperty || 'name'] || 'name']: direction };
  }
}
