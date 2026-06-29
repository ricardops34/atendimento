import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocalidadesService {
  constructor(private prisma: PrismaService) {}

  findPaises() {
    return this.prisma.pais.findMany({ orderBy: { nome: 'asc' } });
  }

  findEstados(paisId?: number) {
    return this.prisma.estado.findMany({
      where: paisId ? { paisId } : undefined,
      orderBy: { nome: 'asc' },
    });
  }

  findMunicipios(params: { estadoId?: number; sigla?: string; search?: string }) {
    const where: any = {};
    if (params.estadoId) where.estadoId = params.estadoId;
    if (params.sigla) {
      const estado = { sigla: { equals: params.sigla.toUpperCase() } };
      where.estado = estado;
    }
    if (params.search?.trim()) {
      where.nome = { contains: params.search.trim(), mode: 'insensitive' as const };
    }
    return this.prisma.municipio.findMany({
      where,
      include: { estado: { select: { sigla: true } } },
      orderBy: { nome: 'asc' },
      take: params.search ? 100 : undefined,
    });
  }
}
