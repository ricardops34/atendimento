import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PlanCreateInput) {
    return this.prisma.plan.create({ data });
  }

  async findAll() {
    return this.prisma.plan.findMany({
      include: {
        _count: {
          select: { tenants: true }
        }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.plan.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.PlanUpdateInput) {
    return this.prisma.plan.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.plan.delete({ where: { id } });
  }
}
