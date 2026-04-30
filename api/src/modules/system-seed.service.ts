import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuType } from '@prisma/client';

@Injectable()
export class SystemSeedService implements OnModuleInit {
  private readonly logger = new Logger(SystemSeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.logger.log('Sincronizando Carga Inicial Automática...');
    await this.seedInitialData();
  }

  private async seedInitialData() {
    try {
      // 1. Plano e Tenant
      const plan = await this.prisma.plan.upsert({
        where: { name: 'Enterprise' },
        update: {},
        create: { name: 'Enterprise', description: 'Plano Master', maxUsers: 999, maxBranches: 999 }
      });

      const tenant = await this.prisma.tenant.upsert({
        where: { domain: 'bjsoft.com.br' },
        update: { name: 'BJSOFT SISTEMAS' },
        create: { name: 'BJSOFT SISTEMAS', domain: 'bjsoft.com.br', status: 'ACTIVE', planId: plan.id }
      });

      // 2. Empresa e Filial
      const company = await this.prisma.company.upsert({
        where: { document: '19654062000145' },
        update: {},
        create: { tenantId: tenant.id, name: 'BJSOFT MATRIZ', document: '19654062000145', status: 'ACTIVE' }
      });

      const branch = await this.prisma.branch.upsert({
        where: { document: '19654062000145' },
        update: {},
        create: { 
          tenantId: tenant.id, 
          companyId: company.id, 
          name: 'MATRIZ CG', 
          document: '19654062000145', 
          isMain: true,
          city: 'Campo Grande',
          state: 'MS'
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

      // Vínculos N:N
      await this.prisma.usersOnCompanies.upsert({
        where: { userId_companyId: { userId: user.id, companyId: company.id } },
        update: {},
        create: { userId: user.id, companyId: company.id, isDefault: true }
      });

      await this.prisma.usersOnBranches.upsert({
        where: { userId_branchId: { userId: user.id, branchId: branch.id } },
        update: {},
        create: { userId: user.id, branchId: branch.id, isDefault: true }
      });

      // 4. Menus Core
      const menus = [
        { module: 'SISTEMA', type: MenuType.SIDEBAR, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USER', 'ADMIN_SAAS'] },
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Gestão', name: 'Usuários', link: '/app/users', icon: 'an an-user', order: 10, roles: ['ADMIN_SAAS'] },
        { module: 'SAAS', type: MenuType.SIDEBAR, group: 'Estrutura', name: 'Empresas', link: '/app/companies', icon: 'an an-briefcase', order: 20, roles: ['ADMIN_SAAS'] },
      ];

      for (const m of menus) {
        await this.prisma.menu.upsert({
          where: { name_module_type: { name: m.name, module: m.module, type: m.type as any } },
          update: m as any,
          create: m as any
        });
      }

      this.logger.log('Carga inicial concluída com sucesso.');
    } catch (error) {
      this.logger.error('Erro na carga inicial: ' + error.message);
    }
  }
}
