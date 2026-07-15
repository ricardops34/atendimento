// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.profile.create({
      data: { name: data.name, menuId: data.menuId ? Number(data.menuId) : null },
      include: { menu: true },
    });
  }

  findAll() {
    return this.prisma.profile.findMany({ include: { menu: true }, orderBy: { name: 'asc' } });
  }

  async search(query: Record<string, string | undefined>) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const filters: any[] = [];
    const search = query.search?.trim() || query.name?.trim();
    if (search) filters.push({ name: { contains: search, mode: 'insensitive' } });
    const where = filters.length ? { AND: filters } : {};
    const total = await this.prisma.profile.count({ where });
    const items = await this.prisma.profile.findMany({
      where,
      include: { menu: true },
      orderBy: { name: query.sortDirection === 'descending' ? 'desc' : 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.profile.findUnique({ where: { id }, include: { menu: true } });
    if (!item) throw new NotFoundException('Perfil nao encontrado.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.profile.update({
      where: { id },
      data: { name: data.name, menuId: data.menuId ? Number(data.menuId) : null },
      include: { menu: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profile.delete({ where: { id } });
  }
}
