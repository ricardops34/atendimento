import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
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

  // --- CRUDs Básicos para Tabelas Globais ---

  async findAllCountries() {
    return this.prisma.country.findMany({ orderBy: { name: 'asc' } });
  }

  async findAllStates() {
    return this.prisma.state.findMany({ orderBy: { uf: 'asc' } });
  }

  async findAllCities(stateId?: string) {
    return this.prisma.city.findMany({
      where: stateId ? { stateId } : {},
      include: { state: true },
      orderBy: { name: 'asc' }
    });
  }

  async findAllCnaes() {
    return this.prisma.cnae.findMany({ orderBy: { code: 'asc' } });
  }
}
