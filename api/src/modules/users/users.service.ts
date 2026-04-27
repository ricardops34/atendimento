import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string, tenantId?: string) {
    const where: any = { email };
    
    // Se o tenantId for fornecido, filtra por ele. 
    // Se não for (login global/admin), busca apenas pelo e-mail.
    if (tenantId) {
      where.tenantId = tenantId;
    }

    return this.prisma.user.findFirst({
      where,
      include: {
        tenant: true,
        role: true // Incluindo a role para o frontend saber o nível de acesso
      }
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }
}
