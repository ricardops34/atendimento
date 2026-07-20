import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ClienteContextGuard } from './cliente-context.guard';

describe('ClienteContextGuard', () => {
  const guard = new ClienteContextGuard();

  const contextWithUser = (user: any): ExecutionContext => {
    const request: any = { user };
    return {
      switchToHttp: () => ({ getRequest: () => request }),
    } as ExecutionContext;
  };

  it('blocks when user has no clienteId', () => {
    expect(() => guard.canActivate(contextWithUser({ empresaId: 1 }))).toThrow(ForbiddenException);
  });

  it('blocks when there is no user at all', () => {
    expect(() => guard.canActivate(contextWithUser(undefined))).toThrow(ForbiddenException);
  });

  it('allows and exposes request.clienteId when user has clienteId', () => {
    const request: any = { user: { empresaId: 1, clienteId: 15 } };
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
    expect(request.clienteId).toBe(15);
  });
});
