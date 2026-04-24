import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  /**
   * Recupera a configuração de UI para uma entidade específica e tenant
   */
  async getEntityMetadata(entity: string, tenantId: string) {
    const metadata = await this.prisma.entityMetadata.findUnique({
      where: {
        entity_tenantId: {
          entity,
          tenantId,
        },
      },
    });

    // Se não encontrar customização, retorna os campos padrão do sistema
    if (!metadata) {
      return this.generateDefaultMetadata(entity);
    }

    return metadata;
  }

  /**
   * Salva ou atualiza a customização do cliente
   */
  async saveMetadata(entity: string, tenantId: string, data: any) {
    return this.prisma.entityMetadata.upsert({
      where: {
        entity_tenantId: { entity, tenantId }
      },
      update: {
        fields: data.fields,
        tabs: data.tabs
      },
      create: {
        entity,
        tenantId,
        fields: data.fields,
        tabs: data.tabs
      }
    });
  }

  private generateDefaultMetadata(entity: string) {
    // No futuro, isso pode vir de um arquivo de configuração centralizado
    return {
      entity,
      fields: [], 
      isDefault: true
    };
  }
}
