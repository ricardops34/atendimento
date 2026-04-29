import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class AuxiliaryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca CEP: Primeiro no banco local, depois no ViaCEP
   */
  async findCep(code: string) {
    const cleanCode = code.replace(/\D/g, '');
    
    // 1. Busca Local
    let cep = await this.prisma.cep.findUnique({
      where: { code: cleanCode },
      include: { city: { include: { state: true } } }
    });

    if (cep) return cep;

    // 2. Busca Externa (ViaCEP)
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCode}/json/`);
      const data = response.data;

      if (data.erro) return null;

      // 3. Salva automaticamente se encontrar a cidade no nosso banco
      const state = await this.prisma.state.findUnique({ where: { uf: data.uf } });
      if (state) {
        let city = await this.prisma.city.findFirst({ 
          where: { name: data.localidade, stateId: state.id } 
        });

        // Se a cidade não existir, criamos (usando código IBGE do ViaCEP)
        if (!city) {
          city = await this.prisma.city.create({
            data: {
              name: data.localidade,
              code: parseInt(data.ibge),
              stateId: state.id
            }
          });
        }

        // Criamos o CEP localmente para futuras consultas
        cep = await this.prisma.cep.create({
          data: {
            code: cleanCode,
            address: data.logradouro,
            neighborhood: data.bairro,
            cityId: city.id
          },
          include: { city: { include: { state: true } } }
        });

        return cep;
      }
    } catch (error) {
      console.error('Erro ao consultar ViaCEP:', error);
    }

    return null;
  }

  // --- CRUDs Básicos para Tabelas Globais (PAGINADOS) ---

  async findAllCountries(page: number = 1, pageSize: number = 10, filter?: string) {
    const skip = (page - 1) * pageSize;
    const where = filter ? { name: { contains: filter, mode: 'insensitive' as Prisma.QueryMode } } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.country.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { name: 'asc' }
      }),
      this.prisma.country.count({ where })
    ]);

    return { items, hasNext: skip + items.length < total };
  }

  async findAllStates(page: number = 1, pageSize: number = 10, filter?: string) {
    const skip = (page - 1) * pageSize;
    const where = filter ? { 
      OR: [
        { name: { contains: filter, mode: 'insensitive' as Prisma.QueryMode } },
        { uf: { contains: filter, mode: 'insensitive' as Prisma.QueryMode } }
      ]
    } : {};

    const [items, total] = await Promise.all([
      this.prisma.state.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { uf: 'asc' }
      }),
      this.prisma.state.count({ where })
    ]);

    return { items, hasNext: skip + items.length < total };
  }

  async findAllCities(page: number = 1, pageSize: number = 10, filter?: string, stateId?: string) {
    const skip = (page - 1) * pageSize;
    const where: any = {};
    if (stateId) where.stateId = stateId;
    if (filter) {
      where.OR = [
        { name: { contains: filter, mode: 'insensitive' as Prisma.QueryMode } },
        { cnpjCode: { contains: filter } }
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.city.findMany({
        where,
        include: { state: true },
        skip,
        take: pageSize,
        orderBy: { name: 'asc' }
      }),
      this.prisma.city.count({ where })
    ]);

    return { items, hasNext: skip + items.length < total };
  }

  async findAllCnaes(page: number = 1, pageSize: number = 10, filter?: string) {
    const skip = (page - 1) * pageSize;
    const where = filter ? { 
      OR: [
        { code: { contains: filter } },
        { description: { contains: filter, mode: 'insensitive' as Prisma.QueryMode } }
      ]
    } : {};

    const [items, total] = await Promise.all([
      this.prisma.cnae.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { code: 'asc' }
      }),
      this.prisma.cnae.count({ where })
    ]);

    return { items, hasNext: skip + items.length < total };
  }
}
