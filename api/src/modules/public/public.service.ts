import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca as informações de marca baseadas no domínio/subdomínio
   */
  async getTenantBranding(domain: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { domain },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        themeConfig: true,
        plan: true
      }
    });

    if (!tenant) {
      throw new NotFoundException('Empresa não encontrada para este domínio.');
    }

    // Regra de Negócio: Customização de Login apenas para PRO e ENTERPRISE
    const hasCustomLogin = tenant.plan !== 'STANDARD';

    return {
      id: tenant.id,
      name: tenant.name,
      logoUrl: tenant.logoUrl,
      // Só envia as configurações de fundo e textos se o plano permitir
      loginConfig: hasCustomLogin ? tenant.themeConfig : null,
      plan: tenant.plan
    };
  }
}
