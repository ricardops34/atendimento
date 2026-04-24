import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gera a estrutura de menu personalizada para o tenant logado
   */
  async getTenantMenu(tenantId: string) {
    // 1. Itens Estáticos (Core do Sistema)
    const menu = [
      { label: 'Dashboard', link: '/dashboard', icon: 'po-icon-home' },
      
      { 
        label: 'Minha Empresa', 
        icon: 'po-icon-company', 
        subItems: [
          { label: 'Usuários', link: '/users', icon: 'po-icon-users' },
          { label: 'Papéis e Acesso', link: '/roles', icon: 'po-icon-lock' }
        ]
      }
    ];

    // 2. Busca Entidades Virtuais Criadas pelo Cliente
    const customEntities = await this.prisma.dynamicEntity.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' }
    });

    // 3. Adiciona as Entidades Virtuais ao Menu em um grupo específico
    if (customEntities.length > 0) {
      const dynamicGroup = {
        label: 'Módulos Customizados',
        icon: 'po-icon-grid',
        subItems: customEntities.map(entity => ({
          label: entity.name,
          link: `/dynamic/${entity.slug}`,
          icon: 'po-icon-pushcart'
        }))
      };
      menu.push(dynamicGroup);
    }

    // 4. Retorna o menu completo
    return menu;
  }
}
