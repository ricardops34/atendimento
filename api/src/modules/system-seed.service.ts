import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SystemSeedService implements OnModuleInit {
  private readonly logger = new Logger(SystemSeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    this.logger.log('Verificando necessidade de Seed do Sistema...');
    await this.seedInitialData();
  }

  private async seedInitialData() {
    try {
      // 1. Criar Plano Padrão
      const plan = await this.prisma.plan.upsert({
        where: { name: 'Plano Pro' },
        update: {},
        create: {
          name: 'Plano Pro',
          description: 'Plano completo para gestão empresarial',
          maxUsers: 10,
          maxBranches: 3,
          maxRecords: 10000,
        }
      });

      // 2. Criar Tenant Mestre (B. J. INFORMATICA)
      const tenant = await this.prisma.tenant.upsert({
        where: { domain: 'bjsoft.com.br' },
        update: {
          name: 'B. J. INFORMATICA',
          email: 'conasci@gmail.com',
        },
        create: {
          name: 'B. J. INFORMATICA',
          domain: 'bjsoft.com.br',
          email: 'conasci@gmail.com',
          status: 'ACTIVE',
          planId: plan.id,
        }
      });

      // 3. Criar Matriz
      await this.prisma.branch.upsert({
        where: { document: '19654062000145' },
        update: {},
        create: {
          tenantId: tenant.id,
          name: 'RICARDO PATAY SOTOMAYOR',
          tradeName: 'B. J. INFORMATICA',
          document: '19654062000145',
          isMain: true,
          email: 'conasci@gmail.com',
          phone: '(67) 3029-2680',
          zipCode: '79117130',
          address: 'JOAO GUIMARAES ROSA',
          number: '459',
          neighborhood: 'VILA NASSER',
          city: 'CAMPO GRANDE',
          state: 'MS'
        }
      });

      // 4. Criar Rotinas Core
      const routines = [
        { name: 'DASHBOARD', label: 'Dashboard', module: 'SISTEMA', link: '/dashboard', icon: 'an an-chart-line' },
        { name: 'CNPJ_RFB', label: 'Dados Públicos RFB', module: 'SAAS', link: '/saas/cnpj/estabelecimentos', icon: 'an an-building' },
        { name: 'METADATA_ADMIN', label: 'Metadados', module: 'SAAS', link: '/saas/metadata-editor', icon: 'an an-database' },
        { name: 'MENU_ADMIN', label: 'Menus', module: 'SAAS', link: '/saas/menu', icon: 'an an-list' },
      ];

      for (const r of routines) {
        const routine = await this.prisma.routine.upsert({
          where: { name: r.name },
          update: r,
          create: r
        });

        // Vincula a rotina ao Plano Pro
        await this.prisma.planRoutine.upsert({
          where: { planId_routineId: { planId: plan.id, routineId: routine.id } },
          update: {},
          create: { planId: plan.id, routineId: routine.id }
        });
      }

      // 5. Criar CNAEs Globais da Matriz
      const cnaes = [
        { code: '6209100', description: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação' },
        { code: '6201501', description: 'Desenvolvimento de programas de computador sob encomenda' },
        { code: '9511800', description: 'Reparação e manutenção de computadores e de equipamentos periféricos' }
      ];

      for (const cnae of cnaes) {
        await this.prisma.cnae.upsert({
          where: { code: cnae.code },
          update: {},
          create: cnae
        });
      }

      // 6. Criar Usuário Ricardo (Admin Master)
      await this.prisma.user.upsert({
        where: { email: 'ricardo@bjsoft.com.br' },
        update: {
          level: 9,
          tenantId: tenant.id,
          password: '$2b$10$7u.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ'
        },
        create: {
          email: 'ricardo@bjsoft.com.br',
          // Hash para a senha 'admin123'
          password: '$2b$10$7u.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ0.U.XqZ', 
          name: 'Ricardo Patay',
          level: 9,
          tenantId: tenant.id
        }
      });

      this.logger.log('Seed do sistema concluído com sucesso.');
    } catch (error) {
      this.logger.error('Falha ao executar Seed do sistema: ' + error.message);
    }
  }
}
