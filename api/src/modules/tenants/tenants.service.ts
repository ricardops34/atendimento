import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { planId, ...rest } = data;
    
    const existing = await this.prisma.tenant.findUnique({
      where: { domain: data.domain },
    });

    if (existing) {
      throw new ConflictException('Domínio já está em uso.');
    }

    return this.prisma.tenant.create({
      data: {
        ...rest,
        plan: { connect: { id: planId } }
      },
    });
  }

  async findAll() {
    return this.prisma.tenant.findMany({
      include: {
        plan: { select: { name: true } },
        _count: {
          select: { users: true }
        }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.tenant.findUnique({
      where: { id },
      include: { 
        plan: true,
        users: true 
      }
    });
  }

  async update(id: string, data: any) {
    const { planId, ...rest } = data;
    
    return this.prisma.tenant.update({
      where: { id },
      data: {
        ...rest,
        ...(planId && { plan: { connect: { id: planId } } })
      },
    });
  }

  async remove(id: string) {
    return this.prisma.tenant.delete({
      where: { id }
    });
  }
}
