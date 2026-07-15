import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { REQUIRE_MENU_ROUTINE_KEY } from '../decorators/require-menu.decorator';

@Injectable()
export class MenuGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoutineKey = this.reflector.getAllAndOverride<string>(REQUIRE_MENU_ROUTINE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoutineKey) return true;

    const user = context.switchToHttp().getRequest().user;
    if (!user?.profileId) throw new ForbiddenException('Acesso negado: perfil nao identificado.');

    const menuItem = await this.prisma.menuItem.findFirst({
      where: {
        isActive: true,
        routine: { key: requiredRoutineKey, isActive: true },
        menu: {
          isActive: true,
          profiles: { some: { id: user.profileId } },
        },
      },
    });

    if (!menuItem) {
      throw new ForbiddenException(`Acesso negado: voce nao possui permissao para '${requiredRoutineKey}'.`);
    }
    return true;
  }
}
