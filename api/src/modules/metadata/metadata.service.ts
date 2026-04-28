import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  async listEntities(tenantId: string) {
    return this.prisma.metadataEntity.findMany({
      where: { tenantId },
      orderBy: { label: 'asc' }
    });
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
    const entity = await this.prisma.metadataEntity.findUnique({
      where: { name_tenantId: { name: entityName, tenantId } },
      include: {
        fields: { orderBy: { order: 'asc' } }
      }
    });

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
        mask: f.mask
      }))
    };
  }

  async saveMetadata(entityName: string, tenantId: string, data: any) {
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
    return { name: entityName, title: entityName.toUpperCase(), fields: [], isDefault: true };
  }
}
