// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface ProfileSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  tenantId?: string;
  name?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: { tenantId: Number(data.tenantId), name: data.name },
      });
      const moduleIds = Array.isArray(data.moduleIds) ? data.moduleIds.map((id) => Number(id)) : [];
      if (moduleIds.length > 0) {
        await tx.profileModule.createMany({
          data: moduleIds.map((moduleId) => ({
            profileId: profile.id,
            moduleId,
            canRead: true,
            canWrite: true,
          })),
        });
      }
      return tx.profile.findUnique({
        where: { id: profile.id },
        include: { tenant: true, profileModules: { include: { module: true } } },
      });
    });
  }

  findAll() {
    return this.prisma.profile.findMany({
      include: { tenant: true, profileModules: { include: { module: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async search(query: ProfileSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.profile.count({ where });
    const items = await this.prisma.profile.findMany({
      where,
      include: { tenant: true, profileModules: { include: { module: true } } },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.profile.findUnique({
      where: { id },
      include: { tenant: true, profileModules: { include: { module: true } } },
    });
    if (!item) throw new NotFoundException('Perfil não encontrado.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.$transaction(async (tx) => {
      await tx.profile.update({
        where: { id },
        data: {
          tenantId: data.tenantId ? Number(data.tenantId) : undefined,
          name: data.name,
        },
      });
      if (Array.isArray(data.moduleIds)) {
        await tx.profileModule.deleteMany({ where: { profileId: id } });
        const moduleIds = data.moduleIds.map((moduleId) => Number(moduleId));
        if (moduleIds.length > 0) {
          await tx.profileModule.createMany({
            data: moduleIds.map((moduleId) => ({
              profileId: id,
              moduleId,
              canRead: true,
              canWrite: true,
            })),
          });
        }
      }
      return tx.profile.findUnique({
        where: { id },
        include: { tenant: true, profileModules: { include: { module: true } } },
      });
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profile.delete({ where: { id } });
  }

  private buildWhere(query: ProfileSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim();
    if (search) {
      andFilters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { tenant: { name: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }
    if (query.tenantId) andFilters.push({ tenantId: Number(query.tenantId) });
    if (query.name?.trim()) andFilters.push({ name: { contains: query.name.trim(), mode: 'insensitive' } });
    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    if (sortProperty === 'tenant.name') return { tenant: { name: direction } };
    return { [sortProperty === 'id' ? 'id' : 'name']: direction };
  }
}
