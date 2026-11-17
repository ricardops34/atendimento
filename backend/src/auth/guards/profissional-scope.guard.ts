import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Resolve o escopo de profissionais que o usuário logado pode ver/alterar, de acordo com o
 * perfil (RBAC):
 * - Administrador: sem restrição (request.profissionalScope = null).
 * - Gerente: ele mesmo + os profissionais (Analistas) alocados (via ContratoProfissional) nos
 *   contratos em que ele é o Gerente responsável (`Contrato.gerenteId`).
 * - Qualquer outro perfil (ex: Analista) ou usuário sem Profissional vinculado: só ele mesmo,
 *   ou lista vazia se não houver Profissional vinculado ao login.
 *
 * Deve rodar depois do JwtAuthGuard/EmpresaGuard (precisa de req.user). Os Controllers/Services
 * leem `request.profissionalScope` para filtrar/validar os dados.
 */
@Injectable()
export class ProfissionalScopeGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      request.profissionalScope = null;
      return true;
    }

    const profile = user.profileId
      ? await this.prisma.profile.findUnique({ where: { id: user.profileId } })
      : null;

    if (profile?.name === 'Administrador') {
      request.profissionalScope = null;
      return true;
    }

    const profissional = await this.prisma.profissional.findFirst({ where: { userId: user.userId } });
    if (!profissional) {
      request.profissionalScope = [];
      return true;
    }

    if (profile?.name === 'Gerente') {
      const analistas = await this.prisma.contratoProfissional.findMany({
        where: { contrato: { gerenteId: profissional.id } },
        select: { profissionalId: true },
        distinct: ['profissionalId'],
      });
      request.profissionalScope = [profissional.id, ...analistas.map((a) => a.profissionalId)];
      return true;
    }

    request.profissionalScope = [profissional.id];
    return true;
  }
}
