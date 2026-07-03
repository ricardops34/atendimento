import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CepsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any = {}) {
    const { search, page = 1, limit = 10 } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (search) {
      where.OR = [
        { cep: { contains: search } },
        { logradouro: { contains: search, mode: 'insensitive' } },
        { bairro: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.cep.findMany({
        where,
        skip,
        take,
        include: { municipio: true, estado: true },
        orderBy: { cep: 'asc' },
      }),
      this.prisma.cep.count({ where }),
    ]);

    return { items, total, hasNext: skip + take < total };
  }

  async findOne(cep: string) {
    let cleanCep = cep.replace(/\D/g, '');
    let cepRecord = await this.prisma.cep.findUnique({
      where: { cep: cleanCep },
      include: { municipio: true, estado: true },
    });

    if (!cepRecord) {
      // Fetch from ViaCEP
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (res.ok) {
        const data = await res.json();
        if (!data.erro) {
          const municipioId = Number(data.ibge);
          const municipio = await this.prisma.municipio.findUnique({ where: { id: municipioId } });
          if (municipio) {
            cepRecord = await this.prisma.cep.create({
              data: {
                cep: cleanCep,
                logradouro: data.logradouro || '',
                bairro: data.bairro || '',
                municipioId: municipio.id,
                estadoId: municipio.estadoId,
              },
              include: { municipio: true, estado: true },
            });
          }
        }
      }
    }

    if (!cepRecord) throw new NotFoundException('CEP não encontrado');
    return cepRecord;
  }

  async create(data: { cep: string; logradouro: string; bairro: string; municipioId: number; estadoId: number }) {
    const cleanCep = data.cep.replace(/\D/g, '');
    return this.prisma.cep.create({ data: { ...data, cep: cleanCep } });
  }

  async update(cep: string, data: { logradouro?: string; bairro?: string; municipioId?: number; estadoId?: number }) {
    const cleanCep = cep.replace(/\D/g, '');
    await this.findOne(cleanCep);
    return this.prisma.cep.update({ where: { cep: cleanCep }, data });
  }

  async remove(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');
    await this.findOne(cleanCep);
    return this.prisma.cep.delete({ where: { cep: cleanCep } });
  }
}

