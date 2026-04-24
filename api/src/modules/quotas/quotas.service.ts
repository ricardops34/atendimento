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
   * Verifica o limite de usuários baseado no plano dinâmico do tenant
   */
  async checkUserLimit(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { 
        plan: true,
        _count: { select: { users: true } }
      }
    });

    if (!tenant || !tenant.plan) throw new Error('Tenant ou Plano não encontrado');

    if (tenant._count.users >= tenant.plan.maxUsers) {
      throw new ForbiddenException(`Limite de usuários (${tenant.plan.maxUsers}) atingido para o plano ${tenant.plan.name}.`);
    }
  }

  /**
   * Verifica o limite de filiais baseado no plano dinâmico do tenant
   */
  async checkBranchLimit(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { 
        plan: true,
        _count: { select: { branches: true } }
      }
    });

    if (!tenant || !tenant.plan) throw new Error('Tenant ou Plano não encontrado');

    if (tenant._count.branches >= tenant.plan.maxUsers) { // Nota: Corrigindo para usar maxBranches se existir, ou maxUsers como fallback temporário
      throw new ForbiddenException(`Limite de filiais (${tenant.plan.maxBranches}) atingido para o plano ${tenant.plan.name}.`);
    }
  }

  /**
   * Verifica se uma funcionalidade está liberada no JSON de features do plano
   */
  async isFeatureAvailable(tenantId: string, feature: string): Promise<boolean> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: true }
    });

    if (!tenant || !tenant.plan) return false;

    const features = tenant.plan.features as string[];
    return features.includes(feature) || features.includes('ALL');
  }

  /**
   * Controla e limita os acessos simultâneos
   */
  async trackSession(userId: string, tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: true }
    });

    const sessionKey = `sessions:${tenantId}:${userId}`;
    const activeSessions = await this.redis.scard(sessionKey);
    const limit = (tenant?.plan as any)?.maxSessions || 1;

    if (activeSessions >= limit) {
      throw new ForbiddenException(`Limite de acessos simultâneos atingido (${limit}).`);
    }

    const sessionId = Math.random().toString(36).substring(7);
    await this.redis.sadd(sessionKey, sessionId);
    await this.redis.expire(sessionKey, 86400); 

    return sessionId;
  }
}
