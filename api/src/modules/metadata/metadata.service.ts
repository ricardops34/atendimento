import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  private readonly PROTECTED_ENTITIES = [
    'users', 'roles', 'permissions', 'plans', 'tenants', 'branches', 
    'auditLogs', 'importStatus', 'accessControls', 'routines',
    'parameters', 'triggers', 'reports', 'billing'
  ];

  async listEntities(tenantId: string) {
    const entities = await this.prisma.metadataEntity.findMany({
      where: { tenantId },
      orderBy: { label: 'asc' }
    });

    // Filtra para remover entidades protegidas que possam estar no banco
    return entities.filter(e => !this.PROTECTED_ENTITIES.includes(e.name));
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
        activeModules: ['User Management', 'Billing & Subscription', ...routines.map(r => r.hookName)]
      },
      discoveryUrl: "https://api.sistema.bjsoft.com.br/docs-json"
    };
  }

  async getEntityMetadata(entityName: string, tenantId: string, userLevel: number = 1) {
    // 1. Tenta buscar metadados específicos do Tenant
    let entity = await this.prisma.metadataEntity.findUnique({
      where: { name_tenantId: { name: entityName, tenantId } },
      include: {
        fields: { orderBy: { order: 'asc' } }
      }
    });

    // 2. Se não encontrar, tenta buscar metadados "Globais" (Tenant Mestre ou sem tenantId se permitido)
    if (!entity) {
      entity = await this.prisma.metadataEntity.findFirst({
        where: { name: entityName, type: 'S' }, // 'S' de System/Global
        include: {
          fields: { orderBy: { order: 'asc' } }
        }
      });
    }

    if (!entity) return this.generateDefaultMetadata(entityName);

    return {
      id: entity.id,
      name: entity.name,
      title: entity.label,
      fields: entity.fields.map(f => ({
        property: f.name,
        label: f.titleList || f.titleForm,
        type: this.mapTypeToPoUi(f.type),
        order: f.order,
        gridColumns: 6,
        visible: f.isActiveList === 'S',
        required: f.isActiveForm === 'S',
        help: f.helpText,
        mask: f.mask,
        filter: true // Habilita filtro por padrão para metadados de sistema
      }))
    };
  }

  async saveMetadata(entityName: string, tenantId: string, data: any) {
    if (this.PROTECTED_ENTITIES.includes(entityName)) {
      throw new Error(`A entidade ${entityName} é protegida pelo sistema e não pode ser customizada.`);
    }
    const entity = await this.prisma.metadataEntity.upsert({
      where: { name_tenantId: { name: entityName, tenantId } },
      update: { label: data.title || entityName },
      create: { name: entityName, label: data.title || entityName, tenantId, type: 'U' }
    });

    await this.prisma.metadataField.deleteMany({ where: { entityId: entity.id } });

    const fieldCreates = data.fields.map((f: any, index: number) => ({
      entityId: entity.id,
      tenantId: tenantId,
      name: f.property,
      type: this.mapPoUiToType(f.type),
      titleForm: f.label,
      titleList: f.label,
      order: f.order ?? index,
      isActiveForm: f.required ? 'S' : 'N',
      isActiveList: f.visible ? 'S' : 'N',
      isSystem: 'U'
    }));

    await this.prisma.metadataField.createMany({ data: fieldCreates });
    return this.getEntityMetadata(entityName, tenantId);
  }

  private mapTypeToPoUi(dbType: string): string {
    const map: any = { 'C': 'string', 'D': 'date', 'N': 'number', 'L': 'boolean', 'M': 'textarea' };
    return map[dbType] || 'string';
  }

  private mapPoUiToType(poType: string): string {
    const map: any = { 'string': 'C', 'date': 'D', 'number': 'N', 'boolean': 'L', 'textarea': 'M' };
    return map[poType] || 'C';
  }

  private generateDefaultMetadata(entityName: string) {
    const defaults: any = {
      users: [
        { property: 'id', key: true, visible: false },
        { property: 'name', label: 'Nome', filter: true, gridColumns: 6 },
        { property: 'email', label: 'E-mail', filter: true, gridColumns: 6 },
        { property: 'level', label: 'Nível', type: 'number', filter: true },
        { property: 'createdAt', label: 'Criado em', type: 'date' }
      ],
      plans: [
        { property: 'id', key: true, visible: false },
        { property: 'name', label: 'Nome do Plano', filter: true },
        { property: 'maxUsers', label: 'Limite Usuários', type: 'number' },
        { property: 'maxBranches', label: 'Limite Filiais', type: 'number' },
        { property: 'createdAt', label: 'Criado em', type: 'date' }
      ],
      tenants: [
        { property: 'id', key: true, visible: false },
        { property: 'name', label: 'Nome da Organização', filter: true },
        { property: 'domain', label: 'Domínio', filter: true },
        { property: 'status', label: 'Status', filter: true },
        { property: 'createdAt', label: 'Desde', type: 'date' }
      ],
      cnaes: [
        { property: 'code', label: 'Código CNAE', filter: true, key: true },
        { property: 'description', label: 'Descrição da Atividade', filter: true }
      ],
      countries: [
        { property: 'code', label: 'Código BACEN', filter: true, key: true },
        { property: 'name', label: 'Nome do País', filter: true },
        { property: 'isoCode', label: 'ISO (Alpha-3)', filter: true }
      ]
    };

    return {
      name: entityName,
      title: entityName.toUpperCase(),
      fields: defaults[entityName] || [],
      isDefault: true
    };
  }
}
