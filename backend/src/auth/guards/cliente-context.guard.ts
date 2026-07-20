import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ClienteContextGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.clienteId) {
      throw new ForbiddenException('Acesso negado: usuário sem vínculo com um Cliente.');
    }

    // Vincula o clienteId diretamente no request para facilitar o acesso em Controllers
    request.clienteId = user.clienteId;

    return true;
  }
}
