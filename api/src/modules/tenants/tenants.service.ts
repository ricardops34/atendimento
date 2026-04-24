import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Plan } from '@prisma/client';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TenantCreateInput) {
    const existing = await this.prisma.tenant.findUnique({
      where: { domain: data.domain },
    });

    if (existing) {
      throw new ConflictException('Domínio já está em uso.');
    }

    return this.prisma.tenant.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.tenant.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.tenant.findUnique({
      where: { id },
      include: { users: true }
    });
  }

  async update(id: string, data: Prisma.TenantUpdateInput) {
    return this.prisma.tenant.update({
      where: { id },
      data,
    });
  }
}
