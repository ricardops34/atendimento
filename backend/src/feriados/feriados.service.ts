import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeriadoDto } from './dto/create-feriado.dto';
import { UpdateFeriadoDto } from './dto/update-feriado.dto';

interface FeriadoSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  id?: string;
  descricao?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class FeriadosService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFeriadoDto, tenantId: number) {
    return this.prisma.feriado.create({
      data: {
        tenantId,
        data: new Date(dto.data),
        descricao: dto.descricao,
        tipo: dto.tipo,
        fixo: dto.fixo ?? true,
        municipio: dto.municipio,
      },
    });
  }

  findAll(tenantId: number) {
    return this.prisma.feriado.findMany({ 
      where: { tenantId }, 
      orderBy: { data: 'asc' } 
    });
  }

  async search(query: FeriadoSearchQuery, tenantId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, tenantId);
    
    const total = await this.prisma.feriado.count({ where });
    const items = await this.prisma.feriado.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, tenantId?: number) {
    const where: any = { id };
    if (tenantId) where.tenantId = tenantId;

    const feriado = await this.prisma.feriado.findFirst({ where });
    if (!feriado) throw new NotFoundException('Feriado não encontrado.');
    return feriado;
  }

  async update(id: number, dto: UpdateFeriadoDto, tenantId?: number) {
    await this.findOne(id, tenantId);
    return this.prisma.feriado.update({ 
      where: { id }, 
      data: {
        data: dto.data ? new Date(dto.data) : undefined,
        descricao: dto.descricao,
        tipo: dto.tipo,
        fixo: dto.fixo,
        municipio: dto.municipio,
      } 
    });
  }

  async remove(id: number, tenantId?: number) {
    await this.findOne(id, tenantId);
    return this.prisma.feriado.delete({ where: { id } });
  }

  private buildWhere(query: FeriadoSearchQuery, tenantId?: number) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;

    if (query.id) {
      where.id = Number(query.id);
      return where;
    }
    
    const descricao = query.descricao?.trim() || query.search?.trim();
    if (!descricao) return where;
    where.descricao = { contains: descricao, mode: 'insensitive' as const };
    return where;
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty || 'data';
    return { [property]: direction };
  }
}
