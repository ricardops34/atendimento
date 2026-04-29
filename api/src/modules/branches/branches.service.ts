import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.branch.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.branch.findFirst({
      where: { id, tenantId },
      include: { cnaes: true }
    });
  }

  async create(data: any, tenantId: string) {
    return this.prisma.branch.create({
      data: {
        ...data,
        tenantId
      }
    });
  }

  async update(id: string, data: any, tenantId: string) {
    return this.prisma.branch.update({
      where: { id },
      data: {
        ...data,
        tenantId // Garantir que não mude o tenantId
      }
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.branch.delete({
      where: { id }
    });
  }
}
