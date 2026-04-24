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
   * Verifica o limite de usuários (Prioridade: Override > Plano)
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

    // Busca valor customizado ou usa o do plano
    const custom = tenant.customLimits as any;
    const limit = custom?.maxUsers || tenant.plan.maxUsers;

    if (tenant._count.users >= limit) {
      throw new ForbiddenException(`Limite de usuários (${limit}) atingido.`);
    }
  }

  /**
   * Verifica o limite de filiais (Prioridade: Override > Plano)
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

    const custom = tenant.customLimits as any;
    const limit = custom?.maxBranches || tenant.plan.maxBranches;

    if (tenant._count.branches >= limit) {
      throw new ForbiddenException(`Limite de filiais (${limit}) atingido.`);
    }
  }

  /**
   * Verifica funcionalidades (Combina as do Plano + as Extras do Cliente)
   */
  async isFeatureAvailable(tenantId: string, feature: string): Promise<boolean> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: true }
    });

    if (!tenant || !tenant.plan) return false;

    const planFeatures = tenant.plan.features as string[];
    const custom = tenant.customLimits as any;
    const extraFeatures = custom?.extraFeatures || [];

    return planFeatures.includes(feature) || extraFeatures.includes(feature) || planFeatures.includes('ALL');
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
    
    const custom = tenant?.customLimits as any;
    const limit = custom?.maxSessions || (tenant?.plan as any)?.maxSessions || 1;

    if (activeSessions >= limit) {
      throw new ForbiddenException(`Limite de acessos simultâneos atingido (${limit}).`);
    }

    const sessionId = Math.random().toString(36).substring(7);
    await this.redis.sadd(sessionKey, sessionId);
    await this.redis.expire(sessionKey, 86400); 

    return sessionId;
  }
}
