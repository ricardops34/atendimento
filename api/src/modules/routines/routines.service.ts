import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RoutinesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lista todas as rotinas disponíveis no sistema (Catálogo Global)
   */
  async findAll() {
    return this.prisma.routine.findMany({
      orderBy: [{ module: 'asc' }, { label: 'asc' }]
    });
  }

  /**
   * Obtém as rotinas ativas para um Tenant específico (Baseado no Plano)
   */
  async findByTenant(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: { include: { routines: { include: { routine: true } } } } }
    });

    if (!tenant) throw new NotFoundException('Tenant não encontrado');

    return tenant.plan.routines.map(pr => pr.routine);
  }

  /**
   * Salva ou atualiza uma permissão granular
   */
  async saveAccessControl(tenantId: string, data: any) {
    return this.prisma.accessControl.upsert({
      where: { 
        // Como o AccessControl não tem uma única PK composta óbvia no schema ainda, 
        // vamos usar o ID se fornecido ou criar um novo
        id: data.id || 'new-id' 
      },
      update: {
        canView: data.canView,
        canCreate: data.canCreate,
        canEdit: data.canEdit,
        canDelete: data.canDelete
      },
      create: {
        tenantId,
        routineId: data.routineId,
        targetType: data.targetType,
        targetId: data.targetId,
        canView: data.canView,
        canCreate: data.canCreate,
        canEdit: data.canEdit,
        canDelete: data.canDelete
      }
    });
  }

  /**
   * Semente básica para o sistema (Seed)
   */
  async seedSystemRoutines() {
    const systemRoutines = [
      { name: 'admin.tenants', label: 'Empresas', module: 'Gestão SaaS', icon: 'po-icon-company', link: '/admin/tenants', type: 'S' },
      { name: 'admin.plans', label: 'Planos', module: 'Gestão SaaS', icon: 'po-icon-finance', link: '/admin/plans', type: 'S' },
      { name: 'admin.metadata', label: 'Editor de Telas', module: 'Gestão SaaS', icon: 'po-icon-grid', link: '/admin/metadata-editor', type: 'S' },
      { name: 'app.users', label: 'Usuários', module: 'Minha Empresa', icon: 'po-icon-users', link: '/admin/users', type: 'S' },
      { name: 'app.roles', label: 'Perfis de Acesso', module: 'Minha Empresa', icon: 'po-icon-lock', link: '/admin/roles', type: 'S' },
    ];

    for (const routine of systemRoutines) {
      await this.prisma.routine.upsert({
        where: { name: routine.name },
        update: routine,
        create: routine
      });
    }
  }
}
