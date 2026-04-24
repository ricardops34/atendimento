import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  /**
   * Fornece um contexto completo para Agentes de IA entenderem o sistema
   */
  async getAiContext(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: true }
    });

    if (!tenant) throw new NotFoundException('Tenant não encontrado');

    // Busca as rotinas customizadas que a IA pode disparar
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
      instructions: "Você é um assistente integrado ao sistema SaaS da BJSoft. Use as APIs documentadas em /docs para realizar CRUDs. Respeite sempre o isolamento do tenantId fornecido.",
      discoveryUrl: "https://api.sistema.bjsoft.com.br/docs-json"
    };
  }

  async getEntityMetadata(entity: string, tenantId: string) {
    const metadata = await this.prisma.entityMetadata.findUnique({
      where: { entity_tenantId: { entity, tenantId } }
    });
    if (!metadata) return this.generateDefaultMetadata(entity);
    return metadata;
  }

  async saveMetadata(entity: string, tenantId: string, data: any) {
    return this.prisma.entityMetadata.upsert({
      where: { entity_tenantId: { entity, tenantId } },
      update: { fields: data.fields, tabs: data.tabs },
      create: { entity, tenantId, fields: data.fields, tabs: data.tabs }
    });
  }

  private generateDefaultMetadata(entity: string) {
    return { entity, fields: [], isDefault: true };
  }
}
