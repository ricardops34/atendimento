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

  create(dto: CreateEmpresaDto) {
    return this.prisma.empresa.create({
      data: { ...dto, tenantId: 1 },
    });
  }

  findAll() {
    return this.prisma.empresa.findMany({ orderBy: { nome: 'asc' } });
  }

  async search(query: EmpresaSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.empresa.count({ where });
    const items = await this.prisma.empresa.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const empresa = await this.prisma.empresa.findUnique({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa não encontrada.');
    return empresa;
  }

  async update(id: number, dto: UpdateEmpresaDto) {
    await this.findOne(id);
    return this.prisma.empresa.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.empresa.delete({ where: { id } });
  }

  private buildWhere(query: EmpresaSearchQuery) {
    if (query.id) {
      return { id: Number(query.id) };
    }
    const nome = query.nome?.trim() || query.search?.trim();
    if (!nome) return {};
    return { nome: { contains: nome, mode: 'insensitive' as const } };
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty === 'id' ? 'id' : 'nome';
    return { [property]: direction };
  }
}
