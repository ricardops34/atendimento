// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface EmpresaSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  name?: string;
  slug?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.empresa.create({ data });
  }

  findAll() {
    return this.prisma.empresa.findMany({ orderBy: { name: 'asc' } });
  }

  async search(query: EmpresaSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.empresa.count({ where });
    const items = await this.prisma.empresa.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.empresa.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Empresa não encontrada.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.empresa.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.empresa.delete({ where: { id } });
  }

  private buildWhere(query: EmpresaSearchQuery) {
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
