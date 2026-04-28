import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  async getAiContext(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: true }
    });

    if (!tenant) throw new NotFoundException('Tenant não encontrado');

    const routines = await this.prisma.customRoutine.findMany({
      where: { tenantId, isActive: true },
      select: { hookName: true, description: true }
    });

    return {
      agentRole: 'SaaS Business Intelligence Assistant',
      context: {
        organization: tenant.name,
        currentPlan: tenant.plan.name,
        restrictions: {
          maxUsers: tenant.plan.maxUsers,
          maxBranches: tenant.plan.maxBranches
        },
        activeModules: [
          'User Management',
          'Billing & Subscription',
          'Custom Reporting (jsreport)',
          ...routines.map(r => r.hookName)
        ]
      },
      instructions: "Você é um assistente integrado ao sistema SaaS da BJSoft. Use as APIs documentadas em /docs para realizar CRUDs.",
      discoveryUrl: "https://api.sistema.bjsoft.com.br/docs-json"
    };
  }

  async getEntityMetadata(entity: string, tenantId: string, userLevel: number = 1) {
    const metadata = await this.prisma.entityMetadata.findUnique({
      where: { entity_tenantId: { entity, tenantId } }
    });

    const config = metadata ? metadata : this.generateDefaultMetadata(entity);
    
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
          { 
            property: 'planId', 
            label: 'Plano Assinado', 
            type: 'lookup',
            searchService: '/plans',
            fieldLabel: 'name', 
            fieldValue: 'id',
            gridColumns: 6, 
            required: true 
          },
          { property: 'isActive', label: 'Status Ativo', type: 'boolean', gridColumns: 2, defaultValue: true },
          { property: 'createdAt', label: 'Data de Cadastro', type: 'date', visible: true, allowEdit: false }
        ]
      },
      'plans': {
        title: 'Planos do Sistema',
        fields: [
          { property: 'id', key: true, visible: false },
          { property: 'name', label: 'Nome do Plano', filter: true, gridColumns: 6, required: true },
          { property: 'maxUsers', label: 'Usuários Máx.', type: 'number', gridColumns: 3 },
          { property: 'maxRecords', label: 'Registros Máx.', type: 'number', gridColumns: 3 }
        ]
      },
      'users': {
        title: 'Gestão de Usuários',
        fields: [
          { property: 'id', key: true, visible: false },
          { property: 'name', label: 'Nome Completo', filter: true, gridColumns: 6, required: true },
          { property: 'email', label: 'E-mail / Login', filter: true, gridColumns: 6, required: true },
          { 
            property: 'roleId', 
            label: 'Perfil', 
            type: 'lookup', 
            searchService: '/roles', 
            fieldLabel: 'name', 
            fieldValue: 'id', 
            gridColumns: 6 
          }
        ]
      },
      'roles': {
        title: 'Perfis de Acesso',
        fields: [
          { property: 'id', key: true, visible: false },
          { property: 'name', label: 'Nome do Perfil', filter: true, gridColumns: 6, required: true },
          { property: 'createdAt', label: 'Criado em', type: 'date', visible: true, allowEdit: false }
        ]
      }
    };

    return defaults[entity] || { entity, fields: [], isDefault: true };
  }
}
