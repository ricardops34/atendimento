// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}

  create(createEmpresaDto: CreateEmpresaDto) {
    return this.prisma.empresa.create({
      data: createEmpresaDto as any,
    });
  }

  findAll() {
    return this.prisma.empresa.findMany();
  }

  async findOne(id: number) {
    const empresa = await this.prisma.empresa.findUnique({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa não encontrada.');
    return empresa;
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    await this.findOne(id);
    return this.prisma.empresa.update({
      where: { id },
      data: updateEmpresaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.empresa.delete({ where: { id } });
  }
}
