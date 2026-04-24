import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BillingInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'];

    // Se não for uma rota administrativa do SaaS e tiver tenantId
    if (tenantId && !request.url.startsWith('/admin')) {
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { status: true }
      });

      if (tenant?.status === 'SUSPENDED') {
        throw new ForbiddenException(
          'Acesso Suspenso: Existem pendências financeiras em sua conta. Entre em contato com o suporte.'
        );
      }
    }

    return next.handle();
  }
}
