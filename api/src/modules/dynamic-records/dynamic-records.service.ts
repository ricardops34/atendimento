import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DynamicRecordsService {
  constructor(private prisma: PrismaService) {}

  async findAll(entitySlug: string, tenantId: string) {
    // Busca a entidade pelo slug (ex: 'products')
    const entity = await this.prisma.dynamicEntity.findUnique({
      where: { slug_tenantId: { slug: entitySlug, tenantId } }
    });

    if (!entity) return [];

    const records = await this.prisma.dynamicRecord.findMany({
      where: { entityId: entity.id, tenantId }
    });

    // Mapeia para retornar apenas o campo 'data' (JSONB) mas mantendo o ID
    return records.map(r => ({
      id: r.id,
      ...(r.data as object)
    }));
  }

  async create(entitySlug: string, tenantId: string, data: any) {
    const entity = await this.prisma.dynamicEntity.findUnique({
      where: { slug_tenantId: { slug: entitySlug, tenantId } }
    });

    if (!entity) throw new NotFoundException('Entidade não cadastrada.');

    return this.prisma.dynamicRecord.create({
      data: {
        entityId: entity.id,
        tenantId,
        data
      }
    });
  }

  async update(id: string, tenantId: string, data: any) {
    return this.prisma.dynamicRecord.update({
      where: { id, tenantId },
      data: { data }
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.dynamicRecord.delete({
      where: { id, tenantId }
    });
  }
}
