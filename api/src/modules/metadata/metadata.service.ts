import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  async getAiContext(tenantId: string) {
    // ... (mantido como estava)
    return {}; 
  }

  async getEntityMetadata(entity: string, tenantId: string, userLevel: number = 1) {
    const metadata = await this.prisma.entityMetadata.findUnique({
      where: { entity_tenantId: { entity, tenantId } }
    });

    const config = metadata ? metadata : this.generateDefaultMetadata(entity);
    
    // FILTRO DE SEGURANÇA: Remove campos onde o nível do usuário é inferior ao exigido
    if (config.fields && Array.isArray(config.fields)) {
      config.fields = config.fields.filter((field: any) => {
        const minLevel = field.minLevel || 0;
        return userLevel >= minLevel;
      });
    }

    return config;
  }

  async saveMetadata(entity: string, tenantId: string, data: any) {
    return this.prisma.entityMetadata.upsert({
      where: { entity_tenantId: { entity, tenantId } },
      update: { fields: data.fields, tabs: data.tabs },
      create: { entity, tenantId, fields: data.fields, tabs: data.tabs }
    });
  }

  private generateDefaultMetadata(entity: string) {
    const defaults: Record<string, any> = {
      'tenants': {
        title: 'Gestão de Empresas',
        fields: [
          { property: 'id', key: true, visible: false },
          { property: 'name', label: 'Nome da Empresa', filter: true, gridColumns: 6, required: true },
          { property: 'domain', label: 'Subdomínio (URL)', filter: true, gridColumns: 6, required: true },
          { property: 'planId', label: 'Plano Assinado', gridColumns: 6, required: true, minLevel: 5 }, // Só nível 5+ vê o Plano
          { property: 'isActive', label: 'Status Ativo', type: 'boolean', gridColumns: 2, defaultValue: true },
          { property: 'createdAt', label: 'Data de Cadastro', type: 'date', visible: true, allowEdit: false }
        ]
      },
      'users': {
        title: 'Gestão de Usuários',
        fields: [
          { property: 'id', key: true, visible: false },
          { property: 'name', label: 'Nome Completo', filter: true, gridColumns: 6, required: true },
          { property: 'email', label: 'E-mail / Login', filter: true, gridColumns: 6, required: true },
          { property: 'password', label: 'Senha', type: 'password', gridColumns: 6, required: true, visible: false, allowEdit: true, minLevel: 8 }, // Senha só visível/editável para nível 8+
          { property: 'level', label: 'Nível de Acesso', type: 'number', gridColumns: 2, defaultValue: 1, minLevel: 9 }, // Só nível 9+ altera o nível dos outros
          { property: 'roleId', label: 'Perfil de Acesso', gridColumns: 4, required: true },
          { property: 'createdAt', label: 'Data de Cadastro', type: 'date', visible: true, allowEdit: false }
        ]
      }
    };

    return defaults[entity] || { entity, fields: [], isDefault: true };
  }
}
