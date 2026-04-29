import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CnpjService {
  constructor(private prisma: PrismaService) {}

  async findAllEmpresas(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    
    const where = filter ? {
      OR: [
        { cnpjBasico: { contains: filter, mode: 'insensitive' as const } },
        { razaoSocial: { contains: filter, mode: 'insensitive' as const } }
      ]
    } : {};

    const [items, total] = await Promise.all([
      this.prisma.cnpjEmpresa.findMany({
        skip: skip || 0,
        take: take || 10,
        where,
        orderBy: { cnpjBasico: 'asc' }
      }),
      this.prisma.cnpjEmpresa.count({ where })
    ]);

    return { items, total };
  }

  async findAllEstabelecimentos(params: { 
    skip?: number; 
    take?: number; 
    filter?: string;
    situacao?: string;
    uf?: string;
    municipio?: string;
    cnae?: string;
    cep?: string;
  }) {
    const { skip, take, filter, situacao, uf, municipio, cnae, cep } = params;
    
    const where: any = { AND: [] };

    // Filtros Fixos
    if (situacao) where.AND.push({ situacaoCadastral: situacao });
    if (uf) where.AND.push({ uf });
    if (municipio) where.AND.push({ municipio: { contains: municipio, mode: 'insensitive' } });
    if (cep) where.AND.push({ cep: { contains: cep.replace(/\D/g, '') } });
    if (cnae) {
      where.AND.push({
        OR: [
          { cnaeFiscalPrincipal: { contains: cnae } },
          { cnaeFiscalSecundario: { contains: cnae } }
        ]
      });
    }

    // Busca Global (OR)
    if (filter) {
      where.AND.push({
        OR: [
          { cnpjFull: { contains: filter } },
          { nomeFantasia: { contains: filter, mode: 'insensitive' } },
          { logradouro: { contains: filter, mode: 'insensitive' } },
          { bairro: { contains: filter, mode: 'insensitive' } },
          { empresa: { razaoSocial: { contains: filter, mode: 'insensitive' } } }
        ]
      });
    }

    if (where.AND.length === 0) delete where.AND;

    const [items, total] = await Promise.all([
      this.prisma.cnpjEstabelecimento.findMany({
        skip: skip || 0,
        take: take || 10,
        where,
        include: { empresa: true },
        orderBy: { id: 'asc' }
      }),
      this.prisma.cnpjEstabelecimento.count({ where })
    ]);

    return { items, total };
  }

  async findOne(cnpjBasico: string) {
    return this.prisma.cnpjEmpresa.findUnique({
      where: { cnpjBasico },
      include: {
        estabelecimentos: true,
        socios: true
      }
    });
  }
}
