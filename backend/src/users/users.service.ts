// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

interface UserSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  tenantId?: string;
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
    return this.prisma.user.create({
      data: {
        tenantId: Number(data.tenantId),
        profileId: Number(data.profileId),
        name: data.name,
        email: data.email,
        password,
        isActive: data.isActive !== false,
      },
      include: { tenant: true, profile: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { tenant: true, profile: true },
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
      include: { tenant: true, profile: true },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const item = await this.prisma.user.findUnique({
      where: { id },
      include: { tenant: true, profile: true },
    });
    if (!item) throw new NotFoundException('Usuário não encontrado.');
    return item;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    const payload: any = {
      tenantId: data.tenantId ? Number(data.tenantId) : undefined,
      profileId: data.profileId ? Number(data.profileId) : undefined,
      name: data.name,
      email: data.email,
      isActive: data.isActive,
    };
    if (data.password?.trim()) {
      payload.password = await bcrypt.hash(data.password.trim(), 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: payload,
      include: { tenant: true, profile: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }

  private buildWhere(query: UserSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim();
    if (search) {
      andFilters.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { tenant: { name: { contains: search, mode: 'insensitive' } } },
          { profile: { name: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }
    if (query.tenantId) andFilters.push({ tenantId: Number(query.tenantId) });
    if (query.profileId) andFilters.push({ profileId: Number(query.profileId) });
    if (query.name?.trim()) andFilters.push({ name: { contains: query.name.trim(), mode: 'insensitive' } });
    if (query.email?.trim()) andFilters.push({ email: { contains: query.email.trim(), mode: 'insensitive' } });
    if (query.isActive === 'true' || query.isActive === 'false') andFilters.push({ isActive: query.isActive === 'true' });
    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    if (sortProperty === 'tenant.name') return { tenant: { name: direction } };
    if (sortProperty === 'profile.name') return { profile: { name: direction } };
    const map: Record<string, string> = { email: 'email', isActive: 'isActive', id: 'id', name: 'name' };
    return { [map[sortProperty || 'name'] || 'name']: direction };
  }
}
