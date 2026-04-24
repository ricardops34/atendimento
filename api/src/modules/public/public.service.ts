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
      include: {
        plan: true
      }
    });

    if (!tenant) {
      throw new NotFoundException('Empresa não encontrada para este domínio.');
    }

    // Regra de Negócio: Customização de Login apenas para PRO e ENTERPRISE
    // O plano Standard não permite mudar imagem de fundo e textos do login
    const hasCustomLogin = tenant.plan.name !== 'Standard';

    return {
      id: tenant.id,
      name: tenant.name,
      logoUrl: tenant.logoUrl,
      // Só envia as configurações de fundo e textos se o plano permitir
      loginConfig: hasCustomLogin ? tenant.themeConfig : null,
      planName: tenant.plan.name
    };
  }
}
