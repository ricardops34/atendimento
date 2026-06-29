import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class EmpresaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.empresaId) {
      throw new ForbiddenException('Acesso negado: Contexto de Empresa não encontrado no token JWT.');
    }

    // Vincula o empresaId diretamente no request para facilitar o acesso em Controllers
    request.empresaId = user.empresaId;

    return true;
  }
}
