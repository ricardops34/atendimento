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
  userName?: string;
  sortProperty?: string;
  sortDirection?: string;
}

const userSelect = { select: { id: true, name: true } } as const;

@Injectable()
export class ProfissionaisService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProfissionalDto, empresaId: number) {
    return this.prisma.profissional.create({
      data: { ...dto, empresaId },
      include: { user: userSelect },
    });
  }

  findAll(empresaId: number) {
    return this.prisma.profissional.findMany({
      where: { empresaId },
      orderBy: { nome: 'asc' },
      include: { user: userSelect },
    });
  }

  async search(query: ProfissionalSearchQuery, empresaId: number) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query, empresaId);
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

  async findOne(id: number, empresaId?: number) {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const profissional = await this.prisma.profissional.findFirst({
      where,
      include: { user: userSelect },
    });
    if (!profissional) throw new NotFoundException('Profissional não encontrado.');
    return profissional;
  }

  async update(id: number, dto: UpdateProfissionalDto, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.profissional.update({
      where: { id },
      data: dto,
      include: { user: userSelect },
    });
  }

  async remove(id: number, empresaId?: number) {
    await this.findOne(id, empresaId);
    return this.prisma.profissional.delete({ where: { id } });
  }

  private buildWhere(query: ProfissionalSearchQuery, empresaId?: number) {
    const where: any = {};
    if (empresaId) where.empresaId = empresaId;

    if (query.id) {
      where.id = Number(query.id);
      return where;
    }
    const nome = query.nome?.trim() || query.search?.trim();
    if (nome) where.nome = { contains: nome, mode: 'insensitive' as const };
    if (query.userName?.trim()) {
      where.user = {
        name: { contains: query.userName.trim(), mode: 'insensitive' as const },
      };
    }
    return where;
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty === 'id' ? 'id' : 'nome';
    return { [property]: direction };
  }
}
