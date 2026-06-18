import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';

interface ProfissionalSearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  id?: string;
  nome?: string;
  sortProperty?: string;
  sortDirection?: string;
}

const userSelect = { select: { id: true, name: true } } as const;

@Injectable()
export class ProfissionaisService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProfissionalDto) {
    return this.prisma.profissional.create({
      data: { ...dto, tenantId: 1 },
      include: { user: userSelect },
    });
  }

  findAll() {
    return this.prisma.profissional.findMany({
      orderBy: { nome: 'asc' },
      include: { user: userSelect },
    });
  }

  async search(query: ProfissionalSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.profissional.count({ where });
    const items = await this.prisma.profissional.findMany({
      where,
      include: { user: userSelect },
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { id },
      include: { user: userSelect },
    });
    if (!profissional) throw new NotFoundException('Profissional não encontrado.');
    return profissional;
  }

  async update(id: number, dto: UpdateProfissionalDto) {
    await this.findOne(id);
    return this.prisma.profissional.update({
      where: { id },
      data: dto,
      include: { user: userSelect },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profissional.delete({ where: { id } });
  }

  private buildWhere(query: ProfissionalSearchQuery) {
    if (query.id) return { id: Number(query.id) };
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
