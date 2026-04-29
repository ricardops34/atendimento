import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../../modules/audit/audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, ip } = request;

    // Só auditamos operações de escrita (POST, PUT, PATCH, DELETE)
    const isWriteOperation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    
    // Evitamos auditar logs de auditoria ou rotas públicas
    const isExcluded = url.includes('/audit') || url.includes('/auth') || url.includes('/public');

    return next.handle().pipe(
      tap(async (data) => {
        if (isWriteOperation && !isExcluded && user) {
          try {
            await this.auditService.log({
              userId: user.id,
              tenantId: user.tenantId,
              action: `${method}_${this.extractEntityFromUrl(url)}`,
              details: {
                url,
                payload: body,
                response: data ? 'SUCCESS' : 'NO_CONTENT'
              },
              ipAddress: ip
            });
          } catch (error) {
            console.error('Falha ao gravar log de auditoria:', error);
          }
        }
      }),
    );
  }

  private extractEntityFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[1]?.toUpperCase() || 'UNKNOWN';
  }
}
