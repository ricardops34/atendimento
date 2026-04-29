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
        link: '/dashboard', 
        icon: 'po-icon-home', 
        permission: 'VIEW_DASHBOARD' 
      },
      { 
        label: 'Administração SaaS', 
        icon: 'po-icon-settings', 
        permission: 'SAAS_ADMIN',
        subItems: [
          { label: 'Empresas', link: '/saas/tenants', icon: 'po-icon-company', permission: 'MANAGE_TENANTS' },
          { label: 'Planos', link: '/saas/plans', icon: 'po-icon-finance', permission: 'MANAGE_PLANS' },
          { label: 'Matriz de Recursos', link: '/saas/plans/matrix', icon: 'po-icon-grid', permission: 'MANAGE_PLANS' },
          { label: 'Catálogo de Rotinas', link: '/saas/routines', icon: 'po-icon-xml', permission: 'MANAGE_ROUTINES' },
          { label: 'Editor de Telas', link: '/saas/metadata-editor', icon: 'po-icon-grid', permission: 'MANAGE_METADATA' },
        ]
      },
      { 
        label: 'Minha Empresa', 
        icon: 'po-icon-company', 
        permission: 'VIEW_COMPANY',
        subItems: [
          { label: 'Unidades / Filiais', link: '/app/branches', icon: 'po-icon-company', permission: 'MANAGE_BRANCHES' },
          { label: 'Usuários', link: '/app/users', icon: 'po-icon-users', permission: 'MANAGE_USERS' },
          { label: 'Perfis de Acesso', link: '/app/roles', icon: 'po-icon-lock', permission: 'MANAGE_ROLES' }
        ]
      }
    ];

    // 2. Busca Entidades Virtuais
    const customEntities = await this.prisma.metadataEntity.findMany({
      where: { tenantId },
      orderBy: { label: 'asc' }
    });

    if (customEntities.length > 0) {
      menuStructure.push({
        label: 'Módulos de Negócio',
        icon: 'po-icon-grid',
        permission: 'VIEW_CUSTOM_MODULES',
        subItems: customEntities.map(entity => ({
          label: entity.label || entity.name,
          link: `/app/dynamic/${entity.name}`,
          icon: 'po-icon-pushcart',
          permission: `VIEW_${entity.name.toUpperCase()}`
        }))
      });
    }

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
