import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstadosService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any = {}) {
    const { search, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { sigla: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.estado.findMany({
        where,
        skip,
        take,
        orderBy: { nome: 'asc' },
      }),
      this.prisma.estado.count({ where }),
    ]);

    return { items, total, hasNext: skip + take < total };
  }

  async findOne(id: number) {
    const estado = await this.prisma.estado.findUnique({ where: { id } });
    if (!estado) throw new NotFoundException('Estado não encontrado');
    return estado;
  }

  async create(data: { id: number; nome: string; sigla: string }) {
    return this.prisma.estado.create({ data });
  }

  async update(id: number, data: { nome?: string; sigla?: string }) {
    await this.findOne(id);
    return this.prisma.estado.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.estado.delete({ where: { id } });
  }
}
