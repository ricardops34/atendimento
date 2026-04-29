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

  async findAllEstabelecimentos(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    
    const where = filter ? {
      OR: [
        { cnpjBasico: { contains: filter, mode: 'insensitive' as const } },
        { nomeFantasia: { contains: filter, mode: 'insensitive' as const } },
        { cep: { contains: filter } }
      ]
    } : {};

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

    // Format for PO-UI (add cnpjFull)
    const formattedItems = items.map(item => ({
      ...item,
      cnpjFull: `${item.cnpjBasico}${item.cnpjOrdem}${item.cnpjDv}`
    }));

    return { items: formattedItems, total };
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
