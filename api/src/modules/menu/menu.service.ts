import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gera a estrutura de menu filtrada pelas permissões do usuário
   */
  async getTenantMenu(tenantId: string, userPermissions: string[]) {
    // 1. Definição Base do Menu com as permissões requeridas
    const menuStructure = [
      { 
        label: 'Dashboard', 
        link: '/dashboard', 
        icon: 'po-icon-home', 
        permission: 'VIEW_DASHBOARD' 
      },
      { 
        label: 'SaaS Admin', 
        icon: 'po-icon-settings', 
        permission: 'SAAS_ADMIN', // Só para o dono do SaaS
        subItems: [
          { label: 'Clientes (Tenants)', link: '/tenants', icon: 'po-icon-company', permission: 'MANAGE_TENANTS' },
        ]
      },
      { 
        label: 'Minha Empresa', 
        icon: 'po-icon-company', 
        permission: 'VIEW_COMPANY',
        subItems: [
          { label: 'Usuários', link: '/users', icon: 'po-icon-users', permission: 'MANAGE_USERS' },
          { label: 'Papéis e Acesso', link: '/roles', icon: 'po-icon-lock', permission: 'MANAGE_ROLES' }
        ]
      }
    ];

    // 2. Busca Entidades Virtuais
    const customEntities = await this.prisma.dynamicEntity.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' }
    });

    if (customEntities.length > 0) {
      const dynamicGroup = {
        label: 'Módulos Customizados',
        icon: 'po-icon-grid',
        permission: 'VIEW_CUSTOM_MODULES',
        subItems: customEntities.map(entity => ({
          label: entity.name,
          link: `/dynamic/${entity.slug}`,
          icon: 'po-icon-pushcart',
          permission: `VIEW_${entity.slug.toUpperCase()}`
        }))
      };
      menuStructure.push(dynamicGroup);
    }

    // 3. FILTRAGEM: Remove o que o usuário não tem permissão de ver
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
      .filter(item => !item.subItems || item.subItems.length > 0); // Remove grupos vazios
  }
}
