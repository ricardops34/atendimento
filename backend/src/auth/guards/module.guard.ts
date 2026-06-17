import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_MODULE_KEY } from '../decorators/require-module.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ModuleGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredModule = this.reflector.getAllAndOverride<string>(REQUIRE_MODULE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredModule) {
      return true; // Rota não exige módulo específico
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.profileId) {
      throw new ForbiddenException('Acesso negado: Perfil não identificado.');
    }

    const profileModule = await this.prisma.profileModule.findFirst({
      where: {
        profileId: user.profileId,
        module: { key: requiredModule },
        canRead: true,
      },
    });

    if (!profileModule) {
      throw new ForbiddenException(`Acesso negado: Você não possui permissão para o módulo '${requiredModule}'.`);
    }

    return true;
  }
}
