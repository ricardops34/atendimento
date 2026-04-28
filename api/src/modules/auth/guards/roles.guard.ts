import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Se não houver usuário ou o perfil não estiver nas roles permitidas
    if (!user || !user.role) {
      return false;
    }

    // SUPER_ADMIN ignora qualquer restrição de role
    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
