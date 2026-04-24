import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomRoutinesService } from '../custom-routines/custom-routines.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private customRoutines: CustomRoutinesService // Injetamos o motor de plugins
  ) {}

  async create(tenantId: string, data: Prisma.ProductUncheckedCreateInput) {
    // 1. PONTO DE GANCHO: ANTES DE SALVAR
    // O cliente pode mudar o preço, validar campos, etc.
    const processedData = await this.customRoutines.runHook(tenantId, 'before_product_save', data);

    const product = await this.prisma.product.create({
      data: {
        ...processedData,
        tenantId,
      },
    });

    // 2. PONTO DE GANCHO: DEPOIS DE SALVAR
    // O cliente pode disparar um e-mail, enviar para um e-commerce, etc.
    await this.customRoutines.runHook(tenantId, 'after_product_save', product);

    return product;
  }

  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
    });
  }
}
