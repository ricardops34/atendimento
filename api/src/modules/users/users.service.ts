import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByLoginOrEmail(identifier: string) {
    const cleanIdentifier = identifier.trim().toLowerCase();
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanIdentifier },
          { login: cleanIdentifier }
        ]
      },
      include: {
        tenant: true,
        role: true,
        branches: { include: { branch: true } },
        companies: { include: { company: true } }
      }
    });
  }

  async findByEmail(email: string, tenantId?: string) {
    const where: any = { email: email.trim().toLowerCase() };
    if (tenantId) where.tenantId = tenantId;

    return this.prisma.user.findFirst({
      where,
      include: {
        tenant: true,
        role: true,
        branches: { include: { branch: true } },
        companies: { include: { company: true } }
      }
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      include: { 
        role: true,
        branches: { include: { branch: true } },
        companies: { include: { company: true } }
      },
      orderBy: { name: 'asc' }
    });
  }

  async findOne(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
      include: { 
        role: true,
        branches: { include: { branch: true } },
        companies: { include: { company: true } },
        allowedMenus: { include: { menu: true } }
      }
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async create(data: any) {
    const { branchIds, companyIds, menuIds, defaultBranchId, defaultCompanyId, ...userData } = data;

    // Verificar se login ou email já existem
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: userData.email.toLowerCase() },
          { login: userData.login.toLowerCase() }
        ]
      }
    });

    if (existing) {
      throw new ConflictException('Login ou E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(userData.password || '123456', 10);
    
    return this.prisma.user.create({
      data: {
        ...userData,
        email: userData.email.toLowerCase(),
        login: userData.login.toLowerCase(),
        password: hashedPassword,
        tenant: { connect: { id: userData.tenantId } },
        role: userData.roleId ? { connect: { id: userData.roleId } } : undefined,
        
        // Relacionamentos N:N
        branches: branchIds ? {
          create: branchIds.map((id: string) => ({
            branchId: id,
            isDefault: id === defaultBranchId
          }))
        } : undefined,
        
        companies: companyIds ? {
          create: companyIds.map((id: string) => ({
            companyId: id,
            isDefault: id === defaultCompanyId
          }))
        } : undefined,

        allowedMenus: menuIds ? {
          create: menuIds.map((id: string) => ({
            menuId: id
          }))
        } : undefined
      }
    });
  }

  async update(id: string, tenantId: string, data: any) {
    const { branchIds, companyIds, menuIds, defaultBranchId, defaultCompanyId, ...userData } = data;

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Limpar relações antigas antes de criar novas (estratégia simples de sync)
    if (branchIds) {
      await this.prisma.usersOnBranches.deleteMany({ where: { userId: id } });
    }
    if (companyIds) {
      await this.prisma.usersOnCompanies.deleteMany({ where: { userId: id } });
    }
    if (menuIds) {
      await this.prisma.usersOnMenus.deleteMany({ where: { userId: id } });
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        role: userData.roleId ? { connect: { id: userData.roleId } } : undefined,
        
        branches: branchIds ? {
          create: branchIds.map((id: string) => ({
            branchId: id,
            isDefault: id === defaultBranchId
          }))
        } : undefined,
        
        companies: companyIds ? {
          create: companyIds.map((id: string) => ({
            companyId: id,
            isDefault: id === defaultCompanyId
          }))
        } : undefined,

        allowedMenus: menuIds ? {
          create: menuIds.map((id: string) => ({
            menuId: id
          }))
        } : undefined
      }
    });
  }

  async remove(id: string, tenantId: string) {
    // Cascade delete manual se não estiver no schema
    await this.prisma.usersOnBranches.deleteMany({ where: { userId: id } });
    await this.prisma.usersOnCompanies.deleteMany({ where: { userId: id } });
    await this.prisma.usersOnMenus.deleteMany({ where: { userId: id } });
    
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
