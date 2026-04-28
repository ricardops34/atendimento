import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gera a estrutura de menu filtrada pelas permissões do usuário e customizações do Tenant
   */
  async getTenantMenu(tenantId: string, userPermissions: string[]) {
    // 1. Definição Base do Menu
    const menuStructure: any[] = [
      { 
        label: 'Dashboard', 
        link: '/app/dashboard', 
        icon: 'po-icon-home', 
        permission: 'VIEW_DASHBOARD' 
      },
      { 
        label: 'Gestão SaaS', 
        icon: 'po-icon-settings', 
        permission: 'SAAS_ADMIN',
        subItems: [
          { label: 'Empresas', link: '/admin/tenants', icon: 'po-icon-company', permission: 'MANAGE_TENANTS' },
          { label: 'Planos', link: '/admin/plans', icon: 'po-icon-finance', permission: 'MANAGE_PLANS' },
          { label: 'Editor de Telas', link: '/admin/metadata-editor', icon: 'po-icon-grid', permission: 'MANAGE_METADATA' },
        ]
      },
      { 
        label: 'Minha Empresa', 
        icon: 'po-icon-company', 
        permission: 'VIEW_COMPANY',
        subItems: [
          { label: 'Usuários', link: '/app/users', icon: 'po-icon-users', permission: 'MANAGE_USERS' },
          { label: 'Perfis de Acesso', link: '/app/roles', icon: 'po-icon-lock', permission: 'MANAGE_ROLES' }
        ]
      }
    ];

    // 2. Busca Entidades Virtuais (Tabelas dinâmicas)
    const customEntities = await this.prisma.dynamicEntity.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' }
    });

    if (customEntities.length > 0) {
      menuStructure.push({
        label: 'Módulos Customizados',
        icon: 'po-icon-grid',
        permission: 'VIEW_CUSTOM_MODULES',
        subItems: customEntities.map(entity => ({
          label: entity.name,
          link: `/app/dynamic/${entity.slug}`,
          icon: 'po-icon-pushcart',
          permission: `VIEW_${entity.slug.toUpperCase()}`
        }))
      });
    }

    // 3. Busca Rotinas Customizadas (Scripts/Funcionalidades extras)
    const customRoutines = await this.prisma.customRoutine.findMany({
      where: { tenantId, isActive: true },
      orderBy: { hookName: 'asc' }
    });

    if (customRoutines.length > 0) {
      menuStructure.push({
        label: 'Rotinas Customizadas',
        icon: 'po-icon-xml',
        permission: 'VIEW_CUSTOM_ROUTINES',
        subItems: customRoutines.map(routine => ({
          label: routine.hookName,
          link: `/app/routines/${routine.id}`,
          icon: 'po-icon-execute',
          permission: `EXEC_${routine.hookName.toUpperCase()}`
        }))
      });
    }

    // 4. FILTRAGEM: Remove o que o usuário não tem permissão de ver
    return this.filterMenu(menuStructure, userPermissions);
  }

  private filterMenu(items: any[], permissions: string[]) {
    return items
      .filter(item => !item.permission || permissions.includes(item.permission) || permissions.includes('SUPER_ADMIN'))
      .map(item => {
        if (item.subItems) {
          return { ...item, subItems: this.filterMenu(item.subItems, permissions) };
        }
        return item;
      })
      .filter(item => !item.subItems || item.subItems.length > 0);
  }
}
