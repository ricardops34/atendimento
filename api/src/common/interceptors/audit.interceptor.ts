import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../../modules/audit/audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, tenantId } = request;

    // Só logamos métodos que alteram dados (POST, PUT, DELETE) 
    // ou conforme o plano do cliente
    return next.handle().pipe(
      tap({
        next: (data) => {
          if (['POST', 'PUT', 'DELETE'].includes(method)) {
            this.auditService.log({
              userId: user?.id || 'ANONYMOUS',
              tenantId: tenantId || 'SYSTEM',
              action: `${method} ${url}`,
              module: url.split('/')[1],
              status: 'SUCCESS',
              payload: request.body,
            });
          }
        },
        error: (err) => {
          this.auditService.log({
            userId: user?.id || 'ANONYMOUS',
            tenantId: tenantId || 'SYSTEM',
            action: `${method} ${url}`,
            module: url.split('/')[1],
            status: 'FAILURE',
          });
        },
      }),
    );
  }
}
