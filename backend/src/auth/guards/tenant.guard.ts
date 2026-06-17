import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.tenantId) {
      throw new ForbiddenException('Acesso negado: Contexto de Tenant não encontrado no token JWT.');
    }

    // Vincula o tenantId diretamente no request para facilitar o acesso em Controllers
    request.tenantId = user.tenantId;

    return true;
  }
}
