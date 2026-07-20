// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface ModuleSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  name?: string;
  key?: string;
  sortOrder?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class SystemModulesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.module.create({ data: this.mapPayload(data) });
  }

  findAll() {
    return this.prisma.module.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] });
  }

  async search(query: ModuleSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.module.count({ where });
    const items = await this.prisma.module.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.module.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Módulo não encontrado.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.module.update({ where: { id }, data: this.mapPayload(data) });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.module.delete({ where: { id } });
  }

  private buildWhere(query: ModuleSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim();

    if (search) {
      andFilters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { key: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (query.name?.trim()) andFilters.push({ name: { contains: query.name.trim(), mode: 'insensitive' } });
    if (query.key?.trim()) andFilters.push({ key: { contains: query.key.trim(), mode: 'insensitive' } });
    if (query.sortOrder !== undefined && query.sortOrder !== '') andFilters.push({ sortOrder: Number(query.sortOrder) });

    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    if (sortProperty === 'key') return [{ key: direction }, { name: 'asc' }];
    if (sortProperty === 'name') return [{ name: direction }];
    return [{ sortOrder: direction }, { name: 'asc' }];
  }

  private mapPayload(data: any) {
    return {
      name: data.name?.trim(),
      key: data.key?.trim(),
      sortOrder: Number(data.sortOrder) || 0,
      icon: data.icon?.trim() || null,
    };
  }
}
