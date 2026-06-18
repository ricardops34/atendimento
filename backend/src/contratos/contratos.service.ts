// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

interface ContratoSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  descricao?: string;
  empresaId?: string;
  isFeriado?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class ContratosService {
  constructor(private prisma: PrismaService) {}

  create(createContratoDto: CreateContratoDto) {
    return this.prisma.contrato.create({
      data: {
        ...createContratoDto,
        cor: createContratoDto.cor || '#333333',
        isFeriado: createContratoDto.isFeriado || false,
      },
    });
  }

  findAll() {
    return this.prisma.contrato.findMany({
      include: { empresa: true },
    });
  }

  async search(query: ContratoSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.contrato.count({ where });
    const items = await this.prisma.contrato.findMany({
      where,
      include: { empresa: true },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id },
      include: { empresa: true, escalas: true },
    });
    if (!contrato) throw new NotFoundException('Contrato não encontrado.');
    return contrato;
  }

  async update(id: number, updateContratoDto: UpdateContratoDto) {
    await this.findOne(id);
    return this.prisma.contrato.update({
      where: { id },
      data: updateContratoDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.contrato.delete({ where: { id } });
  }

  private buildWhere(query: ContratoSearchQuery) {
    const andFilters: object[] = [];
    const search = query.search?.trim() || query.descricao?.trim();

    if (search) {
      andFilters.push({
        OR: [
          { descricao: { contains: search, mode: 'insensitive' } },
          { empresa: { nome: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }

    if (query.empresaId) {
      andFilters.push({ empresaId: Number(query.empresaId) });
    }

    if (query.isFeriado === 'true' || query.isFeriado === 'false') {
      andFilters.push({ isFeriado: query.isFeriado === 'true' });
    }

    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';

    if (sortProperty === 'empresa.nome') {
      return { empresa: { nome: direction } };
    }

    const propertyMap: Record<string, string> = {
      id: 'id',
      cor: 'cor',
      isFeriado: 'isFeriado',
      descricao: 'descricao',
    };

    const property = propertyMap[sortProperty || 'descricao'] || 'descricao';
    return { [property]: direction };
  }
}
