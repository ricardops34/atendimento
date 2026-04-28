import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  findAll(tenantId: string) {
    return this.prisma.role.findMany({
      where: { tenantId },
      include: { permissions: true }
    });
  }

  create(tenantId: string, data: any) {
    return this.prisma.role.create({
      data: {
        ...data,
        tenantId
      }
    });
  }

  update(id: string, tenantId: string, data: any) {
    return this.prisma.role.update({
      where: { id, tenantId },
      data
    });
  }

  remove(id: string, tenantId: string) {
    return this.prisma.role.delete({
      where: { id, tenantId }
    });
  }
}
