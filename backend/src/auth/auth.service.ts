import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

export type SessionMenuItem = {
  label: string;
  shortLabel?: string | null;
  icon?: string | null;
  link?: string | null;
  subItems?: SessionMenuItem[];
};

export type TenantAccessOption = {
  tenantId: number;
  tenantName: string;
  isDefault: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email },
      include: {
        profile: {
          include: {
            profileModules: {
              include: { module: true },
            },
          },
        },
        userTenants: {
          include: {
            tenant: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciais inválidas ou usuário inativo');
    }

    const isPlaceholder = user.password === 'hashed_password_placeholder';
    const isBcryptHash = typeof user.password === 'string' && user.password.startsWith('$2');
    const isMatch = isPlaceholder
      ? loginDto.password === 'admin123'
      : isBcryptHash
        ? await bcrypt.compare(loginDto.password, user.password)
        : loginDto.password === user.password;

    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.userTenants?.length) {
      throw new UnauthorizedException('Usuário sem vínculo com tenant.');
    }

    return user;
  }

  async login(user: any, tenantId?: number) {
    const availableTenants = this.buildTenantOptions(user);
    const tenantLink = this.resolveRequestedTenant(user, tenantId);

    if (!tenantLink && availableTenants.length > 1) {
      return {
        requiresTenantSelection: true,
        tenantOptions: availableTenants,
      };
    }

    const selectedTenant = tenantLink ?? user.userTenants[0];
    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: selectedTenant.tenantId,
      profileId: user.profileId,
    };

    const sessionUser = await this.buildSessionUser(user, selectedTenant.tenantId);

    return {
      accessToken: this.jwtService.sign(payload),
      user: sessionUser,
    };
  }

  async buildSessionUser(user: any, tenantId?: number) {
    const tenantLink =
      this.resolveSelectedTenant(user, tenantId) ??
      user.userTenants?.find((item: any) => item.isDefault) ??
      user.userTenants?.[0];

    if (!tenantLink) {
      throw new UnauthorizedException('Usuário sem vínculo com tenant.');
    }

    const modules = (user.profile?.profileModules || [])
      .filter((pm: any) => pm.canRead)
      .map((pm: any) => pm.module.key);

    const menus = await this.getMenusForModules(modules);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || 'avatar_01.png',
      tenantId: tenantLink.tenantId,
      profileId: user.profileId,
      tenant: tenantLink.tenant,
      profile: user.profile?.name,
      modules,
      menus,
      availableTenants: this.buildTenantOptions(user),
    };
  }

  async updateCurrentUser(userId: number, data: { avatar?: string; password?: string }) {
    const payload: any = {};

    if (data.avatar?.trim()) {
      payload.avatar = data.avatar.trim();
    }

    if (data.password?.trim()) {
      payload.password = await bcrypt.hash(data.password.trim(), 10);
    }

    if (!Object.keys(payload).length) {
      const currentUser = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: {
            include: {
              profileModules: {
                include: { module: true },
              },
            },
          },
          userTenants: {
            include: {
              tenant: true,
            },
          },
        },
      });

      if (!currentUser) {
        throw new UnauthorizedException('Usuário não encontrado.');
      }

      return currentUser;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: payload,
      include: {
        profile: {
          include: {
            profileModules: {
              include: { module: true },
            },
          },
        },
        userTenants: {
          include: {
            tenant: true,
          },
        },
      },
    });
  }

  private buildTenantOptions(user: any): TenantAccessOption[] {
    return (user.userTenants || []).map((item: any) => ({
      tenantId: item.tenantId,
      tenantName: item.tenant?.name,
      isDefault: !!item.isDefault,
    }));
  }

  private resolveSelectedTenant(user: any, tenantId?: number) {
    const userTenants = user.userTenants || [];

    if (tenantId) {
      const selected = userTenants.find((item: any) => item.tenantId === Number(tenantId));
      if (!selected) {
        throw new UnauthorizedException('Tenant informado não está vinculado ao usuário.');
      }
      return selected;
    }

    if (userTenants.length === 1) {
      return userTenants[0];
    }

    return userTenants.find((item: any) => item.isDefault) ?? null;
  }

  private resolveRequestedTenant(user: any, tenantId?: number) {
    const userTenants = user.userTenants || [];

    if (tenantId) {
      const selected = userTenants.find((item: any) => item.tenantId === Number(tenantId));
      if (!selected) {
        throw new UnauthorizedException('Tenant informado não está vinculado ao usuário.');
      }
      return selected;
    }

    if (userTenants.length === 1) {
      return userTenants[0];
    }

    return null;
  }

  private async getMenusForModules(moduleKeys: string[]): Promise<SessionMenuItem[]> {
    const allowedModuleKeys = moduleKeys.filter(Boolean);

    if (!allowedModuleKeys.length) {
      return [];
    }

    const items = await this.prisma.menu.findMany({
      where: {
        isActive: true,
        OR: [
          {
            moduleId: null,
            routineId: null,
          },
          { module: { key: { in: allowedModuleKeys } } },
          { routine: { module: { key: { in: allowedModuleKeys } } } },
        ],
      },
      include: {
        routine: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { label: 'asc' }],
    });

    return this.buildMenuTree(items, null);
  }

  private buildMenuTree(items: any[], parentId: number | null): SessionMenuItem[] {
    return items
      .filter((item) => (item.parentId ?? null) === parentId)
      .map((item) => {
        const subItems = this.buildMenuTree(items, item.id);
        const menuItem: SessionMenuItem = {
          label: item.label,
          shortLabel: item.shortLabel ?? item.routine?.shortLabel ?? undefined,
          icon: item.icon ?? item.routine?.icon ?? undefined,
          link: item.link ?? item.routine?.path ?? undefined,
        };

        if (subItems.length > 0) {
          menuItem.link = undefined;
          menuItem.subItems = subItems;
        }

        return menuItem;
      });
  }
}
