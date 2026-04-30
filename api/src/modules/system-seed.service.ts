import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuType } from '@prisma/client';

@Injectable()
export class SystemSeedService implements OnModuleInit {
  private readonly logger = new Logger(SystemSeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.logger.log('Sincronizando Catálogo de Menus e Estrutura...');
    await this.seedInitialData();
  }

  private async seedInitialData() {
    try {
      // 1. Plano e Tenant
      const plan = await this.prisma.plan.upsert({
        where: { name: 'Plano Pro' },
        update: {},
        create: { name: 'Plano Pro', description: 'Plano Master', maxUsers: 10, maxBranches: 3 }
      });

      const tenant = await this.prisma.tenant.upsert({
        where: { domain: 'bjsoft.com.br' },
        update: { name: 'B. J. INFORMATICA', email: 'conasci@gmail.com' },
        create: { name: 'B. J. INFORMATICA', domain: 'bjsoft.com.br', email: 'conasci@gmail.com', status: 'ACTIVE', planId: plan.id }
      });

      // 2. Empresa e Filial
      const company = await this.prisma.company.upsert({
        where: { document: '19654062000145' },
        update: { name: 'RICARDO PATAY SOTOMAYOR' },
        create: { tenantId: tenant.id, name: 'RICARDO PATAY SOTOMAYOR', tradeName: 'B. J. INFORMATICA', document: '19654062000145', status: 'ACTIVE' }
      });

      const branch = await this.prisma.branch.upsert({
        where: { document: '19654062000145' },
        update: {},
        create: { 
          tenantId: tenant.id, 
          companyId: company.id, 
          name: 'MATRIZ - CAMPO GRANDE', 
          document: '19654062000145', 
          isMain: true,
          city: 'CAMPO GRANDE',
          state: 'MS',
          status: 'ACTIVE'
        }
      });

      // 3. Usuário Ricardo
      const user = await this.prisma.user.upsert({
        where: { email: 'ricardo@bjsoft.com.br' },
        update: { level: 9, status: 'ACTIVE' },
        create: {
          email: 'ricardo@bjsoft.com.br',
          login: 'ricardo@bjsoft.com.br',
          password: '$2b$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // admin123
          name: 'Ricardo Patay Sotomayor',
          level: 9,
          tenantId: tenant.id,
          status: 'ACTIVE'
        }
      });

      // 4. Menus Detalhados
      const menus = [
        { module: 'SISTEMA', type: MenuType.SIDEBAR, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USUARIO', 'ADMIN_SAAS'] },
        
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Segurança', name: 'Usuários', link: '/app/users', icon: 'an an-user', order: 10, roles: ['ADMIN_SAAS'] },
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Segurança', name: 'Perfis de Acesso', link: '/app/roles', icon: 'an an-users-three', order: 11, roles: ['ADMIN_SAAS'] },
        
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Empresas', link: '/app/companies', icon: 'an an-briefcase', order: 20, roles: ['ADMIN_SAAS'] },
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Filiais', link: '/app/branches', icon: 'an an-tree-structure', order: 21, roles: ['ADMIN_SAAS'] },
        
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Customização', name: 'Metadados', link: '/saas/metadata-editor', icon: 'an an-database', order: 30, roles: ['ADMIN_SAAS'] },
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Customização', name: 'Gestão de Menus', link: '/saas/menu', icon: 'an an-list', order: 31, roles: ['ADMIN_SAAS'] },

        { module: 'SISTEMA', type: MenuType.TOOLBAR, name: 'Configurações', link: '/settings', icon: 'an an-gear', order: 1, roles: ['ADMIN_SAAS'] },
      ];

      for (const m of menus) {
        await this.prisma.menu.upsert({
          where: { name_module_type: { name: m.name, module: m.module, type: m.type as any } },
          update: m as any,
          create: m as any
        });
      }

      this.logger.log('Carga de menus finalizada com sucesso.');
    } catch (error) {
      this.logger.error('Erro na carga de menus: ' + error.message);
    }
  }
}
