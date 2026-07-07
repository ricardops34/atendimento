import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaisesService {
  constructor(private prisma: PrismaService) {}

  async create(createPaisDto: CreatePaisDto) {
    const exists = await this.prisma.pais.findUnique({
      where: { sigla: createPaisDto.sigla },
    });
    if (exists) {
      throw new ConflictException('Já existe um país com esta sigla.');
    }

    const idExists = await this.prisma.pais.findUnique({
      where: { id: createPaisDto.id },
    });
    if (idExists) {
      throw new ConflictException('Já existe um país com este código IBGE/Bacen.');
    }

    return this.prisma.pais.create({
      data: createPaisDto,
    });
  }

  async findAll() {
    return this.search({ page: 1, pageSize: 9999 });
  }

  async search(query: { page?: number; pageSize?: number; search?: string }) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.PaisWhereInput = query.search
      ? {
          OR: [
            { nome: { contains: query.search, mode: 'insensitive' } },
            { sigla: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      this.prisma.pais.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { nome: 'asc' },
      }),
      this.prisma.pais.count({ where }),
    ]);

    return {
      items,
      total,
      hasNext: skip + pageSize < total,
      page,
      pageSize,
    };
  }

  async findOne(id: number) {
    const pais = await this.prisma.pais.findUnique({ where: { id } });
    if (!pais) {
      throw new NotFoundException(`País com ID ${id} não encontrado.`);
    }
    return pais;
  }

  async update(id: number, updatePaisDto: UpdatePaisDto) {
    const pais = await this.findOne(id);

    if (updatePaisDto.sigla && updatePaisDto.sigla !== pais.sigla) {
      const exists = await this.prisma.pais.findUnique({
        where: { sigla: updatePaisDto.sigla },
      });
      if (exists) {
        throw new ConflictException('Já existe um país com esta sigla.');
      }
    }

    return this.prisma.pais.update({
      where: { id },
      data: updatePaisDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pais.delete({ where: { id } });
  }
}
