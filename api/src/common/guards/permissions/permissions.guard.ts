import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    
    // Se a rota não exige permissão específica, permite o acesso
    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Se o usuário não estiver logado ou não tiver permissões no token
    if (!user || !user.permissions) {
      throw new ForbiddenException('Acesso negado: Falha na identificação de permissões.');
    }

    // SUPER_ADMIN tem acesso total
    if (user.permissions.includes('SUPER_ADMIN')) {
      return true;
    }

    // Verifica se o usuário tem TODAS as permissões requeridas para a rota
    const hasPermission = requiredPermissions.every((permission) =>
      user.permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Acesso negado: Você não possui a permissão necessária para esta ação.');
    }

    return true;
  }
}
