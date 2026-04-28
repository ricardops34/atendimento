import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string, tenantId?: string) {
    const where: any = { email };
    if (tenantId) where.tenantId = tenantId;

    return this.prisma.user.findFirst({
      where,
      include: {
        tenant: true,
        role: true
      }
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      include: { role: true },
      orderBy: { name: 'asc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
      include: { role: true }
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password || '123456', 10);
    
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        tenant: { connect: { id: data.tenantId } },
        role: data.roleId ? { connect: { id: data.roleId } } : undefined
      }
    });
  }

  async update(id: string, tenantId: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        role: data.roleId ? { connect: { id: data.roleId } } : undefined
      }
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
