import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

interface ContratoSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  descricao?: string;
  clienteId?: string;
  tipo?: string;
  dtInicio?: string;
  dtFim?: string;
  isFeriado?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class ContratosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContratoDto, empresaId: number) {
    const { profissionalIds, escalas, ...contratoData } = dto;
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
      if (profissionalIds?.length) {
        await tx.contratoProfissional.createMany({
          data: profissionalIds.map((id) => ({ contratoId: contrato.id, profissionalId: id })),
          skipDuplicates: true,
        });
      }
      if (escalas?.length) {
        await tx.contratoItem.createMany({
          data: escalas.map((e) => ({ ...e, contratoId: contrato.id })),
        });
      }
      return contrato;
    });
  }

  findAll(empresaId: number) {
    return this.prisma.contrato.findMany({ where: { empresaId }, include: { cliente: true } });
  }

  async search(query: ContratoSearchQuery, empresaId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, empresaId);
    const total = await this.prisma.contrato.count({ where });
    const items = await this.prisma.contrato.findMany({
      where,
      include: { cliente: true },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, empresaId?: number) {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const contrato = await this.prisma.contrato.findFirst({
      where,
      include: {
        cliente: true,
        profissionais: { include: { profissional: true } },
        escalas: { include: { profissional: true } },
      },
    });
    if (!contrato) throw new NotFoundException('Contrato não encontrado.');
    return contrato;
  }

  async update(id: number, dto: UpdateContratoDto, empresaId?: number) {
    await this.findOne(id, empresaId);
    const { profissionalIds, escalas, ...contratoData } = dto as any;
    return this.prisma.$transaction(async (tx) => {
      if (contratoData.dtInicio) contratoData.dtInicio = new Date(contratoData.dtInicio);
      if (contratoData.dtFim) contratoData.dtFim = new Date(contratoData.dtFim);
      
      const contrato = await tx.contrato.update({ where: { id }, data: contratoData });
      if (profissionalIds !== undefined) {
        await tx.contratoProfissional.deleteMany({ where: { contratoId: id } });
        if (profissionalIds.length) {
          await tx.contratoProfissional.createMany({
            data: profissionalIds.map((pid: number) => ({ contratoId: id, profissionalId: pid })),
            skipDuplicates: true,
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
      return contrato;
    });
  }

  async remove(id: number, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.contrato.delete({ where: { id } });
  }

  private buildWhere(query: ContratoSearchQuery, empresaId?: number) {
    const andFilters: object[] = [];
    if (empresaId) andFilters.push({ empresaId });

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
