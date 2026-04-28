import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // 1. Tenta pegar o Tenant ID do Header ou do Usuário (JWT)
    const tenantId = request.headers['x-tenant-id'] || request.user?.tenantId;

    const isPublic = request.url.includes('/auth') || request.url.includes('/public');
    const isAdminRoute = request.url.startsWith('/tenants') || request.url.startsWith('/plans');
    
    // Se for um SUPER_ADMIN acessando rotas globais, permitimos sem tenantId
    if (request.user?.role === 'SUPER_ADMIN' && isAdminRoute) {
      return next.handle();
    }

    if (!tenantId && !isPublic) {
      throw new BadRequestException('Contexto de Empresa (Tenant ID) não identificado.');
    }

    request.tenantId = tenantId;
    return next.handle();
  }
}
