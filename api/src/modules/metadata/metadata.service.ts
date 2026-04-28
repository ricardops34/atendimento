import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  async listEntities(tenantId: string) {
    // 1. Entidades fixas do sistema
    const systemEntities = [
      { name: 'tenants', label: 'Empresas', type: 'SISTEMA', description: 'Gestão de clientes do SaaS' },
      { name: 'plans', label: 'Planos', type: 'SISTEMA', description: 'Configuração de assinaturas' },
      { name: 'users', label: 'Usuários', type: 'SISTEMA', description: 'Membros da equipe' },
      { name: 'roles', label: 'Perfis de Acesso', type: 'SISTEMA', description: 'Segurança e permissões' },
    ];

    // 2. Entidades dinâmicas criadas pelo usuário
    const customEntities = await this.prisma.dynamicEntity.findMany({
      where: { tenantId },
      select: { slug: true, name: true, createdAt: true }
    });

    const userEntities = customEntities.map(e => ({
      name: e.slug,
      label: e.name,
      type: 'USUARIO',
      description: 'Módulo customizado'
    }));

    return [...systemEntities, ...userEntities];
  }

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
      // Ordenação garantida pela propriedade 'order'
      config.fields.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

      config.fields = config.fields.filter((field: any) => {
        const minLevel = field.minLevel || 0;
        return userLevel >= minLevel;
      });
    }

    return config;
  }

  async saveMetadata(entity: string, tenantId: string, data: any) {
    // Garantir que a ordem seja salva
    const fieldsWithOrder = data.fields.map((f: any, index: number) => ({
      ...f,
      order: f.order !== undefined ? f.order : index
    }));

    return this.prisma.entityMetadata.upsert({
      where: { entity_tenantId: { entity, tenantId } },
      update: { fields: fieldsWithOrder, tabs: data.tabs },
      create: { entity, tenantId, fields: fieldsWithOrder, tabs: data.tabs }
    });
  }

  private generateDefaultMetadata(entity: string) {
    const defaults: Record<string, any> = {
      'tenants': {
        title: 'Gestão de Empresas',
        fields: [
          { property: 'id', key: true, visible: false, order: 0 },
          { property: 'name', label: 'Nome da Empresa', filter: true, gridColumns: 6, required: true, order: 1 },
          { property: 'domain', label: 'Subdomínio (URL)', filter: true, gridColumns: 6, required: true, order: 2 },
          { 
            property: 'planId', 
            label: 'Plano Assinado', 
            type: 'lookup',
            searchService: '/plans',
            fieldLabel: 'name', 
            fieldValue: 'id',
            gridColumns: 6, 
            required: true,
            order: 3
          },
          { property: 'isActive', label: 'Status Ativo', type: 'boolean', gridColumns: 2, defaultValue: true, order: 4 },
          { property: 'createdAt', label: 'Data de Cadastro', type: 'date', visible: true, allowEdit: false, order: 5 }
        ]
      },
      'plans': {
        title: 'Planos do Sistema',
        fields: [
          { property: 'id', key: true, visible: false, order: 0 },
          { property: 'name', label: 'Nome do Plano', filter: true, gridColumns: 6, required: true, order: 1 },
          { property: 'maxUsers', label: 'Usuários Máx.', type: 'number', gridColumns: 3, order: 2 },
          { property: 'maxRecords', label: 'Registros Máx.', type: 'number', gridColumns: 3, order: 3 }
        ]
      },
      'users': {
        title: 'Gestão de Usuários',
        fields: [
          { property: 'id', key: true, visible: false, order: 0 },
          { property: 'name', label: 'Nome Completo', filter: true, gridColumns: 6, required: true, order: 1 },
          { property: 'email', label: 'E-mail / Login', filter: true, gridColumns: 6, required: true, order: 2 },
          { 
            property: 'roleId', 
            label: 'Perfil', 
            type: 'lookup', 
            searchService: '/roles', 
            fieldLabel: 'name', 
            fieldValue: 'id', 
            gridColumns: 6,
            order: 3
          }
        ]
      }
    };

    return defaults[entity] || { entity, fields: [], isDefault: true };
  }
}
