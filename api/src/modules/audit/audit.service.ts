import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Registra uma atividade no log de auditoria real no banco
   */
  async log(data: {
    userId: string;
    tenantId: string;
    action: string;
    entity?: string;
    details: any;
    ipAddress?: string;
  }) {
    try {
      await this.prisma.auditLog.create({
        data: {
          action: data.action,
          entity: data.entity,
          details: data.details,
          userId: data.userId,
          tenantId: data.tenantId,
          ipAddress: data.ipAddress
        }
      });
      
      this.logger.log(`[AUDIT] Ação ${data.action} gravada para o Tenant ${data.tenantId}`);
    } catch (error) {
      this.logger.error('Falha ao gravar log de auditoria', error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleLogRetention() {
    this.logger.log('🧹 Iniciando limpeza de logs baseada em planos...');
    // Lógica de retenção...
  }
}
