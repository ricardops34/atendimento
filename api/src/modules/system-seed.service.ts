import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuType, MenuModule } from '@prisma/client';

@Injectable()
export class SystemSeedService implements OnModuleInit {
  private readonly logger = new Logger(SystemSeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.logger.log('Sincronizando Hierarquia SAAS Admin...');
    await this.seedInitialData();
  }

  private async seedInitialData() {
    try {
      // 1. Setup Base
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

      // 2. Função Auxiliar Interna
      const createMenu = async (m: any) => {
        return this.prisma.menu.upsert({
          where: { name_module_type: { name: m.name, module: m.module as any, type: m.type as any } },
          update: m as any,
          create: m as any
        });
      };

      // --- MÓDULO SAAS (ROOT) ---
      const saasRoot = await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Administração SaaS', icon: 'an an-gear', order: 1, roles: ['ADMIN_SAAS'] });

      // --- GRUPOS ---
      const saasSeg = await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Segurança', parentId: saasRoot.id, order: 1, roles: ['ADMIN_SAAS'] });
      const saasEst = await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Estrutura', parentId: saasRoot.id, order: 2, roles: ['ADMIN_SAAS'] });
      const saasCust = await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Customização', parentId: saasRoot.id, order: 3, roles: ['ADMIN_SAAS'] });

      // --- ROTINAS ---
      await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Usuários', link: '/app/users', parentId: saasSeg.id, icon: 'an an-user', order: 1, roles: ['ADMIN_SAAS'] });
      await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Empresas', link: '/app/companies', parentId: saasEst.id, icon: 'an an-briefcase', order: 1, roles: ['ADMIN_SAAS'] });
      await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Metadados', link: '/saas/metadata-editor', parentId: saasCust.id, icon: 'an an-database', order: 1, roles: ['ADMIN_SAAS'] });
      await createMenu({ module: MenuModule.SAAS, type: MenuType.SIDEBAR, name: 'Gestão de Menus', link: '/saas/menu', parentId: saasCust.id, icon: 'an an-list', order: 2, roles: ['ADMIN_SAAS'] });

      // --- MÓDULO SISTEMA ---
      await createMenu({ module: MenuModule.SISTEMA, type: MenuType.SIDEBAR, name: 'Dashboard', link: '/dashboard', icon: 'an an-chart-line', order: 1, roles: ['USUARIO', 'ADMIN_SAAS'] });

      this.logger.log('Hierarquia SAAS Admin sincronizada com sucesso.');
    } catch (error) {
      this.logger.error('Erro na sincronização de menus: ' + error.message);
    }
  }
}
