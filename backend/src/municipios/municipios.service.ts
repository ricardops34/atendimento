import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MunicipiosService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any = {}) {
    const { search, estadoId, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (search) {
      where.nome = { contains: search, mode: 'insensitive' };
    }
    if (estadoId) {
      where.estadoId = Number(estadoId);
    }

    const [items, total] = await Promise.all([
      this.prisma.municipio.findMany({
        where,
        skip,
        take,
        include: { estado: true },
        orderBy: { nome: 'asc' },
      }),
      this.prisma.municipio.count({ where }),
    ]);

    return { items, total, hasNext: skip + take < total };
  }

  async findOne(id: number) {
    const municipio = await this.prisma.municipio.findUnique({
      where: { id },
      include: { estado: true },
    });
    if (!municipio) throw new NotFoundException('Município não encontrado');
    return municipio;
  }

  async create(data: { id: number; nome: string; estadoId: number }) {
    return this.prisma.municipio.create({ data });
  }

  async update(id: number, data: { nome?: string; estadoId?: number }) {
    await this.findOne(id);
    return this.prisma.municipio.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.municipio.delete({ where: { id } });
  }
}

