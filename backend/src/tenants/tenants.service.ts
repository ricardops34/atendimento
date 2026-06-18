// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface TenantSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  name?: string;
  slug?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.tenant.create({ data });
  }

  findAll() {
    return this.prisma.tenant.findMany({ orderBy: { name: 'asc' } });
  }

  async search(query: TenantSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.tenant.count({ where });
    const items = await this.prisma.tenant.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.tenant.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Tenant não encontrado.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.tenant.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tenant.delete({ where: { id } });
  }

  private buildWhere(query: TenantSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim();

    if (search) {
      andFilters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (query.name?.trim()) andFilters.push({ name: { contains: query.name.trim(), mode: 'insensitive' } });
    if (query.slug?.trim()) andFilters.push({ slug: { contains: query.slug.trim(), mode: 'insensitive' } });

    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty === 'slug' ? 'slug' : 'name';
    return { [property]: direction };
  }
}
