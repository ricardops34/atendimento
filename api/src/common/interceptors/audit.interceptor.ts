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
    const { method, url, user, tenantId, ip } = request;

    return next.handle().pipe(
      tap({
        next: (data) => {
          if (['POST', 'PATCH', 'DELETE'].includes(method)) {
            this.auditService.log({
              userId: user?.id || 'ANONYMOUS',
              tenantId: tenantId || 'SYSTEM',
              action: `${method} ${url}`,
              entity: url.split('/')[1],
              details: { payload: request.body, response: 'SUCCESS' },
              ipAddress: ip
            });
          }
        },
        error: (err) => {
          this.auditService.log({
            userId: user?.id || 'ANONYMOUS',
            tenantId: tenantId || 'SYSTEM',
            action: `${method} ${url}`,
            entity: url.split('/')[1],
            details: { error: err.message, status: 'FAILURE' },
            ipAddress: ip
          });
        },
      }),
    );
  }
}
