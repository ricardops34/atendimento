import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class QuotasService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis
  ) {}

  /**
   * Verifica se o tenant ainda pode criar novos usuários
   */
  async checkUserLimit(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { plan: true, _count: { select: { users: true } } }
    });

    if (!tenant) throw new Error('Tenant não encontrado');

    const limits = {
      STANDARD: 5,
      PRO: 20,
      ENTERPRISE: 999
    };

    if (tenant._count.users >= limits[tenant.plan]) {
      throw new ForbiddenException(`Limite de usuários (${limits[tenant.plan]}) atingido para o seu plano.`);
    }
  }

  /**
   * Verifica se o tenant ainda pode criar novas filiais
   */
  async checkBranchLimit(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { plan: true, _count: { select: { branches: true } } }
    });

    if (!tenant) throw new Error('Tenant não encontrado');

    const limits = {
      STANDARD: 1,
      PRO: 5,
      ENTERPRISE: 999
    };

    if (tenant._count.branches >= limits[tenant.plan]) {
      throw new ForbiddenException(`Limite de filiais (${limits[tenant.plan]}) atingido para o seu plano.`);
    }
  }

  /**
   * Controla e limita os acessos simultâneos por usuário
   */
  async trackSession(userId: string, tenantId: string, plan: string) {
    const sessionKey = `sessions:${tenantId}:${userId}`;
    const activeSessions = await this.redis.scard(sessionKey);

    const sessionLimits = {
      STANDARD: 1,
      PRO: 3,
      ENTERPRISE: 10
    };

    if (activeSessions >= sessionLimits[plan]) {
      // Aqui poderíamos remover a sessão mais antiga ou bloquear
      throw new ForbiddenException(`Limite de acessos simultâneos atingido para o seu plano (${sessionLimits[plan]}).`);
    }

    // Adiciona a nova sessão ao Redis (expira em 24h)
    const sessionId = Math.random().toString(36).substring(7);
    await this.redis.sadd(sessionKey, sessionId);
    await this.redis.expire(sessionKey, 86400); 

    return sessionId;
  }
}
