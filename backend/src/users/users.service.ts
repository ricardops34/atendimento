// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

interface UserSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  empresaId?: string;
  profileId?: string;
  name?: string;
  email?: string;
  isActive?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const password = await bcrypt.hash(data.password || 'admin123', 10);
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          profileId: Number(data.profileId),
          avatar: data.avatar || 'avatar_01.png',
          password,
          isActive: data.isActive !== false,
        },
      });

      await this.syncEmpresaLinks(tx, user.id, data.empresaLinks || []);

      return tx.user.findUnique({
        where: { id: user.id },
        include: { profile: true, userEmpresas: { include: { empresa: true } } },
        omit: { password: true },
      });
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { profile: true, userEmpresas: { include: { empresa: true } } },
      omit: { password: true },
      orderBy: { name: 'asc' },
    });
  }

  async search(query: UserSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.user.count({ where });
    const items = await this.prisma.user.findMany({
      where,
      include: { profile: true, userEmpresas: { include: { empresa: true } } },
      omit: { password: true },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true, userEmpresas: { include: { empresa: true } } },
      omit: { password: true },
    });
    if (!item) throw new NotFoundException('Usuário não encontrado.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    const payload: any = {
      name: data.name,
      email: data.email,
      profileId: data.profileId ? Number(data.profileId) : undefined,
      avatar: data.avatar,
      isActive: data.isActive,
    };
    if (data.password?.trim()) {
      payload.password = await bcrypt.hash(data.password.trim(), 10);
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: payload,
      });

      if (Array.isArray(data.empresaLinks)) {
        await tx.userEmpresa.deleteMany({ where: { userId: id } });
        await this.syncEmpresaLinks(tx, id, data.empresaLinks);
      }

      return tx.user.findUnique({
        where: { id },
        include: { profile: true, userEmpresas: { include: { empresa: true } } },
        omit: { password: true },
      });
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }

  private async syncEmpresaLinks(tx: any, userId: number, empresaLinks: any[]) {
    const normalizedLinks = (empresaLinks || [])
      .filter((item) => item?.empresaId)
      .map((item, index) => ({
        empresaId: Number(item.empresaId),
        isDefault: !!item.isDefault || index === 0,
      }));

    const defaultEmpresaId =
      normalizedLinks.find((item) => item.isDefault)?.empresaId ?? normalizedLinks[0]?.empresaId ?? null;

    for (const link of normalizedLinks) {
      await tx.userEmpresa.create({
        data: {
          userId,
          empresaId: link.empresaId,
          isDefault: link.empresaId === defaultEmpresaId,
        },
      });
    }
  }

  private buildWhere(query: UserSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim();
    if (search) {
      andFilters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { userEmpresas: { some: { empresa: { name: { contains: search, mode: 'insensitive' } } } } },
          { profile: { name: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }
    if (query.empresaId) andFilters.push({ userEmpresas: { some: { empresaId: Number(query.empresaId) } } });
    if (query.profileId) andFilters.push({ profileId: Number(query.profileId) });
    if (query.name?.trim()) andFilters.push({ name: { contains: query.name.trim(), mode: 'insensitive' } });
    if (query.email?.trim()) andFilters.push({ email: { contains: query.email.trim(), mode: 'insensitive' } });
    if (query.isActive === 'true' || query.isActive === 'false') andFilters.push({ isActive: query.isActive === 'true' });
    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const map: Record<string, string> = { email: 'email', isActive: 'isActive', id: 'id', name: 'name' };
    return { [map[sortProperty || 'name'] || 'name']: direction };
  }
}
