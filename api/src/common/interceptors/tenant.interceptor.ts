import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId) {
      // Para rotas públicas (como login), poderíamos pular esta validação
      // mas para o core do sistema, o tenantId é obrigatório.
      return next.handle(); 
    }

    // Armazena o tenantId no objeto da requisição para ser usado pelos serviços
    request.tenantId = tenantId;
    return next.handle();
  }
}
