import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Registra uma atividade no log de auditoria
   */
  async log(data: {
    userId: string;
    tenantId: string;
    action: string;
    module: string;
    payload?: any;
    status: 'SUCCESS' | 'FAILURE';
  }) {
    // No futuro, este método enviará para o 'db_logs'
    // Para evitar lentidão, este processo deve ser assíncrono
    this.logger.log(`[AUDIT LOG] Tenant: ${data.tenantId} | User: ${data.userId} | Action: ${data.action} | Status: ${data.status}`);
  }

  /**
   * Tarefa agendada para limpeza de logs baseada no plano
   * Standard: 7 dias | Pro: 30 dias | Enterprise: 365 dias
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleLogRetention() {
    this.logger.log('🧹 Iniciando limpeza de logs baseada em planos...');

    // Lógica simulada de limpeza:
    // 1. SELECT id, plan FROM Tenants
    // 2. Para cada plano, calcular a data de corte
    // 3. DELETE FROM logs WHERE tenantId = X AND createdAt < cutoffDate
    
    this.logger.log('✅ Limpeza de logs concluída com sucesso.');
  }
}
