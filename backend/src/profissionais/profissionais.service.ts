// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';

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
}
