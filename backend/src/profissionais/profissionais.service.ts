// @ts-nocheck
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

@Injectable()
export class ProfissionaisService {
  constructor(private prisma: PrismaService) {}

  create(createProfissionalDto: CreateProfissionalDto) {
    return this.prisma.profissional.create({
      data: createProfissionalDto as any,
    });
  }

  findAll() {
    return this.prisma.profissional.findMany();
  }

  async search(query: ProfissionalSearchQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.pageSize) || 20, 1);
    const where = this.buildWhere(query);
    const total = await this.prisma.profissional.count({ where });
    const items = await this.prisma.profissional.findMany({
      where,
      orderBy: this.buildOrderBy(query.sortProperty, query.sortDirection),
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number) {
    const profissional = await this.prisma.profissional.findUnique({ where: { id } });
    if (!profissional) throw new NotFoundException('Profissional não encontrado.');
    return profissional;
  }

  async update(id: number, updateProfissionalDto: UpdateProfissionalDto) {
    await this.findOne(id);
    return this.prisma.profissional.update({
      where: { id },
      data: updateProfissionalDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profissional.delete({ where: { id } });
  }

  private buildWhere(query: ProfissionalSearchQuery) {
    if (query.id) {
      return { id: Number(query.id) };
    }

    const nome = query.nome?.trim() || query.search?.trim();
    if (!nome) {
      return {};
    }

    return {
      nome: { contains: nome, mode: 'insensitive' },
    };
  }

  private buildOrderBy(sortProperty?: string, sortDirection?: string) {
    const direction = sortDirection === 'descending' ? 'desc' : 'asc';
    const property = sortProperty === 'id' ? 'id' : 'nome';
    return { [property]: direction };
  }
}
