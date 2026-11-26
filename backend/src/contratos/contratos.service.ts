import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

interface ContratoSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  descricao?: string;
  clienteNome?: string;
  clienteId?: string;
  tipo?: string;
  dtInicio?: string;
  dtFim?: string;
  isFeriado?: string;
  bloqueado?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class ContratosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContratoDto, empresaId: number) {
    const { profissionais, escalas, adiantamentos, ...contratoData } = dto as any;
    return this.prisma.$transaction(async (tx) => {
      const contrato = await tx.contrato.create({
        data: {
          ...contratoData,
          dtInicio: new Date(contratoData.dtInicio),
          dtFim: new Date(contratoData.dtFim),
          cor: contratoData.cor || '#333333',
          isFeriado: contratoData.isFeriado ?? false,
          empresaId,
        },
      });
      if (profissionais?.length) {
        await tx.contratoProfissional.createMany({
          data: profissionais.map((p: any) => ({
            contratoId: contrato.id,
            profissionalId: p.profissionalId,
            valorHora: p.valorHora ?? null,
            valorFixo: p.valorFixo ?? null,
            maxHorasMes: p.maxHorasMes ?? null,
            modoExcedente: p.modoExcedente ?? null,
            codigoProjeto: p.codigoProjeto ?? null,
            nomeProjeto: p.nomeProjeto ?? null,
          })),
          skipDuplicates: true,
        });
      }
      if (escalas?.length) {
        await tx.contratoItem.createMany({
          data: escalas.map((e: any) => ({ ...e, contratoId: contrato.id })),
        });
      }
      if (adiantamentos?.length) {
        await tx.contratoAdiantamento.createMany({
          data: adiantamentos.map((a: any) => ({ 
            ...a, 
            dataInicio: new Date(a.dataInicio),
            contratoId: contrato.id 
          })),
        });
      }
      return contrato;
    });
  }

  findAll(empresaId: number, bloqueado?: boolean, profissionalScope?: number[] | null) {
    const where: any = { empresaId };
    if (bloqueado !== undefined) {
      where.bloqueado = bloqueado;
    }
    if (profissionalScope) {
      where.profissionais = { some: { profissionalId: { in: profissionalScope } } };
    }
    return this.prisma.contrato.findMany({ where, include: { cliente: true } });
  }

  async search(query: ContratoSearchQuery, empresaId: number, profissionalScope?: number[] | null) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, empresaId, profissionalScope);
    const total = await this.prisma.contrato.count({ where });
    const items = await this.prisma.contrato.findMany({
      where,
      include: {
        cliente: true,
        _count: { select: { agendamentos: true } },
      },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const mappedItems = items.map(({ _count, ...item }) => ({
      ...item,
      bloqueadoStatus: item.bloqueado ? 'Sim' : 'Não',
      temAgendamentos: _count.agendamentos > 0,
    }));

    return { items: mappedItems, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, empresaId?: number, profissionalScope?: number[] | null) {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const contrato = await this.prisma.contrato.findFirst({
      where,
      include: {
        cliente: true,
        gerente: true,
        profissionais: { include: { profissional: true } },
        escalas: { include: { profissional: true } },
        adiantamentos: true,
      },
    });
    if (!contrato) throw new NotFoundException('Contrato não encontrado.');
    if (
      profissionalScope &&
      !contrato.profissionais.some((p) => profissionalScope.includes(p.profissionalId))
    ) {
      throw new ForbiddenException('Você não tem acesso a este contrato.');
    }
    return contrato;
  }

  async update(id: number, dto: UpdateContratoDto, empresaId?: number, profissionalScope?: number[] | null) {
    await this.findOne(id, empresaId, profissionalScope);
    const { profissionais, escalas, adiantamentos, ...contratoData } = dto as any;
    return this.prisma.$transaction(async (tx) => {
      if (contratoData.dtInicio) contratoData.dtInicio = new Date(contratoData.dtInicio);
      if (contratoData.dtFim) contratoData.dtFim = new Date(contratoData.dtFim);

      const contrato = await tx.contrato.update({ where: { id }, data: contratoData });
      if (profissionais !== undefined) {
        // Upsert em vez de deleteMany+createMany: preserva o saldoBancoHoras e o histórico
        // dos profissionais mantidos. Só remove (e cascateia o histórico) quem saiu da lista.
        const existentes = await tx.contratoProfissional.findMany({ where: { contratoId: id } });
        const idsInformados = new Set(profissionais.map((p: any) => p.profissionalId));
        const removidos = existentes.filter((e) => !idsInformados.has(e.profissionalId));
        if (removidos.length) {
          await tx.contratoProfissional.deleteMany({
            where: { id: { in: removidos.map((r) => r.id) } },
          });
        }
        for (const p of profissionais) {
          await tx.contratoProfissional.upsert({
            where: { contratoId_profissionalId: { contratoId: id, profissionalId: p.profissionalId } },
            create: {
              contratoId: id,
              profissionalId: p.profissionalId,
              valorHora: p.valorHora ?? null,
              valorFixo: p.valorFixo ?? null,
              maxHorasMes: p.maxHorasMes ?? null,
              modoExcedente: p.modoExcedente ?? null,
              codigoProjeto: p.codigoProjeto ?? null,
              nomeProjeto: p.nomeProjeto ?? null,
            },
            update: {
              valorHora: p.valorHora ?? null,
              valorFixo: p.valorFixo ?? null,
              maxHorasMes: p.maxHorasMes ?? null,
              modoExcedente: p.modoExcedente ?? null,
              codigoProjeto: p.codigoProjeto ?? null,
              nomeProjeto: p.nomeProjeto ?? null,
            },
          });
        }
      }
      if (escalas !== undefined) {
        await tx.contratoItem.deleteMany({ where: { contratoId: id } });
        if (escalas.length) {
          await tx.contratoItem.createMany({
            data: escalas.map((e: any) => ({ ...e, contratoId: id })),
          });
        }
      }
      if (adiantamentos !== undefined) {
        await tx.contratoAdiantamento.deleteMany({ where: { contratoId: id } });
        if (adiantamentos.length) {
          await tx.contratoAdiantamento.createMany({
            data: adiantamentos.map((a: any) => ({ 
              ...a, 
              dataInicio: new Date(a.dataInicio),
              contratoId: id 
            })),
          });
        }
      }
      return contrato;
    });
  }

  async remove(id: number, empresaId?: number, profissionalScope?: number[] | null) {
    await this.findOne(id, empresaId, profissionalScope);
    const totalAgendamentos = await this.prisma.agendamento.count({
      where: { contratoId: id },
    });
    if (totalAgendamentos > 0) {
      throw new ConflictException(
        'Contrato com agendamentos lançados não pode ser excluído. Bloqueie o contrato.',
      );
    }
    return this.prisma.contrato.delete({ where: { id } });
  }

  private buildWhere(query: ContratoSearchQuery, empresaId?: number, profissionalScope?: number[] | null) {
    const andFilters: object[] = [];
    if (empresaId) andFilters.push({ empresaId });
    if (profissionalScope) {
      andFilters.push({ profissionais: { some: { profissionalId: { in: profissionalScope } } } });
    }

    const search = query.search?.trim() || query.descricao?.trim();

    if (search) {
      andFilters.push({
        OR: [
          { descricao: { contains: search, mode: 'insensitive' } },
          { cliente: { nome: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }

    if (query.clienteId) {
      andFilters.push({ clienteId: Number(query.clienteId) });
    }

    if (query.clienteNome?.trim()) {
      andFilters.push({
        cliente: {
          nome: { contains: query.clienteNome.trim(), mode: 'insensitive' },
        },
      });
    }

    if (query.tipo) {
      andFilters.push({ tipo: query.tipo });
    }

    if (query.dtInicio) {
      andFilters.push({ dtInicio: new Date(query.dtInicio) });
    }

    if (query.dtFim) {
      andFilters.push({ dtFim: new Date(query.dtFim) });
    }

    if (query.isFeriado === 'true' || query.isFeriado === 'false') {
      andFilters.push({ isFeriado: query.isFeriado === 'true' });
    }

    if (query.bloqueado === 'true' || query.bloqueado === 'false') {
      andFilters.push({ bloqueado: query.bloqueado === 'true' });
    }

    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';

    if (sortProperty === 'cliente.nome') {
      return { cliente: { nome: direction as Prisma.SortOrder } };
    }

    const propertyMap: Record<string, string> = {
      id: 'id',
      cor: 'cor',
      tipo: 'tipo',
      dtInicio: 'dtInicio',
      dtFim: 'dtFim',
      isFeriado: 'isFeriado',
      descricao: 'descricao',
    };

    const property = propertyMap[sortProperty || 'descricao'] || 'descricao';
    return { [property]: direction as Prisma.SortOrder };
  }
}
