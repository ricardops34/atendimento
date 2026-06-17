// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Injectable()
export class ContratosService {
  constructor(private prisma: PrismaService) {}

  create(createContratoDto: CreateContratoDto) {
    return this.prisma.contrato.create({
      data: {
        ...createContratoDto,
        cor: createContratoDto.cor || '#333333',
        isFeriado: createContratoDto.isFeriado || false,
      },
    });
  }

  findAll() {
    return this.prisma.contrato.findMany({
      include: { empresa: true },
    });
  }

  async findOne(id: number) {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id },
      include: { empresa: true, escalas: true },
    });
    if (!contrato) throw new NotFoundException('Contrato não encontrado.');
    return contrato;
  }

  async update(id: number, updateContratoDto: UpdateContratoDto) {
    await this.findOne(id);
    return this.prisma.contrato.update({
      where: { id },
      data: updateContratoDto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.contrato.delete({ where: { id } });
  }
}
