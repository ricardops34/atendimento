// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface ProfileSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
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
        data: { name: data.name },
      });
      const menuIds = Array.isArray(data.menuIds) ? data.menuIds.map((id) => Number(id)) : [];
      if (menuIds.length > 0) {
        await tx.profileMenu.createMany({
          data: menuIds.map((menuId) => ({
            profileId: profile.id,
            menuId,
            canRead: true,
            canWrite: true,
          })),
        });
      }
      return tx.profile.findUnique({
        where: { id: profile.id },
        include: { profileMenus: { include: { menu: true } } },
      });
    });
  }

  findAll() {
    return this.prisma.profile.findMany({
      include: { profileMenus: { include: { menu: true } } },
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
      include: { profileMenus: { include: { menu: true } } },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.profile.findUnique({
      where: { id },
      include: { profileMenus: { include: { menu: true } } },
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
          name: data.name,
        },
      });
      if (Array.isArray(data.menuIds)) {
        await tx.profileMenu.deleteMany({ where: { profileId: id } });
        const menuIds = data.menuIds.map((menuId) => Number(menuId));
        if (menuIds.length > 0) {
          await tx.profileMenu.createMany({
            data: menuIds.map((menuId) => ({
              profileId: id,
              menuId,
              canRead: true,
              canWrite: true,
            })),
          });
        }
      }
      return tx.profile.findUnique({
        where: { id },
        include: { profileMenus: { include: { menu: true } } },
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
        ],
      });
    }
    if (query.name?.trim()) andFilters.push({ name: { contains: query.name.trim(), mode: 'insensitive' } });
    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    return { [sortProperty === 'id' ? 'id' : 'name']: direction };
  }
}
