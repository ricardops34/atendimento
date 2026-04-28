import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // 1. Tenta pegar o Tenant ID do Header (enviado pelo nosso interceptor do Angular)
    // 2. Se não houver no header, tenta pegar do usuário autenticado (JWT)
    const tenantId = request.headers['x-tenant-id'] || request.user?.tenantId;

    // Se não for uma rota pública e não houver tenantId, bloqueamos por segurança
    const isPublic = request.url.includes('/auth') || request.url.includes('/public');
    
    if (!tenantId && !isPublic) {
      throw new BadRequestException('Contexto de Empresa (Tenant ID) não identificado.');
    }

    // Injeta o tenantId no request para que os serviços possam usá-lo facilmente
    request.tenantId = tenantId;

    return next.handle();
  }
}
