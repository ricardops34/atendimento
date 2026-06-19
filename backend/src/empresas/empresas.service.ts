import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

interface EmpresaSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  id?: string;
  nome?: string;
  sortProperty?: string;
  sortDirection?: string;
}

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmpresaDto, tenantId: number) {
    return this.prisma.cliente.create({
      data: { ...dto, tenantId },
    });
  }

  findAll(tenantId: number) {
    return this.prisma.cliente.findMany({ where: { tenantId }, orderBy: { nome: 'asc' } });
  }

  async search(query: EmpresaSearchQuery, tenantId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, tenantId);
    const total = await this.prisma.cliente.count({ where });
    const items = await this.prisma.cliente.findMany({
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

    const cliente = await this.prisma.cliente.findFirst({ where });
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    return cliente;
  }

  async update(id: number, dto: UpdateEmpresaDto, tenantId?: number) {
    await this.findOne(id, tenantId);
    return this.prisma.cliente.update({ where: { id }, data: dto });
  }

  async remove(id: number, tenantId?: number) {
    await this.findOne(id, tenantId);
    return this.prisma.cliente.delete({ where: { id } });
  }

  private buildWhere(query: EmpresaSearchQuery, tenantId?: number) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;

    if (query.id) {
      where.id = Number(query.id);
      return where;
    }
    const nome = query.nome?.trim() || query.search?.trim();
    if (!nome) return where;
    where.nome = { contains: nome, mode: 'insensitive' as const };
    return where;
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty === 'id' ? 'id' : 'nome';
    return { [property]: direction };
  }
}
