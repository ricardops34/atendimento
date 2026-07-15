import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_MENU_ROUTINE_KEY } from '../decorators/require-menu.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoutineKey = this.reflector.getAllAndOverride<string>(REQUIRE_MENU_ROUTINE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoutineKey) {
      return true; // Rota não exige menu específico
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.profileId) {
      throw new ForbiddenException('Acesso negado: Perfil não identificado.');
    }

    const menu = await this.prisma.menu.findFirst({
      where: { routine: { key: requiredRoutineKey } },
    });

    if (!menu) {
      throw new ForbiddenException(`Acesso negado: Menu para a rotina '${requiredRoutineKey}' não encontrado.`);
    }

    const profileMenu = await this.prisma.profileMenu.findFirst({
      where: {
        profileId: user.profileId,
        menuId: menu.id,
        canRead: true,
      },
    });

    if (!profileMenu) {
      throw new ForbiddenException(`Acesso negado: Você não possui permissão para '${requiredRoutineKey}'.`);
    }

    return true;
  }
}
