import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = await this.usersService.findByLoginOrEmail(identifier);
    
    if (!user) {
      console.log(`[AuthService] Login falhou: Usuário ${identifier} não encontrado.`);
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Usuário bloqueado ou inativo.');
    }

    let isPasswordValid = await bcrypt.compare(pass, user.password);
    
    // Bypass de emergência para recuperação de acesso master
    if (identifier === 'ricardo@bjsoft.com.br' && pass === 'bjsoft2026') {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any, isImpersonating = false, originalUserId?: string) {
    const userRole = user.role?.name || 'USER';
    const userLevel = (userRole === 'SUPER_ADMIN' || userRole === 'SAAS_ADMIN') 
      ? (user.level || 9) 
      : (user.level || 1);

    const payload = { 
      email: user.email, 
      sub: user.id, 
      tenantId: user.tenantId,
      role: userRole,
      level: userLevel,
      tenantName: user.tenant?.name,
      isImpersonating,
      originalUserId
    };
    
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenantId: user.tenantId,
        tenantName: user.tenant?.name || 'Sistema SaaS',
        role: userRole,
        level: user.level || userLevel,
        isImpersonating
      }
    };
  }

  async impersonate(adminId: string, targetUserId: string, tenantId: string) {
    const admin = await this.usersService.findOne(adminId, tenantId);
    
    // Regra: Apenas nível 9 ou grupo de suporte (a ser definido no Role) podem simular
    const isSupport = admin.role?.name === 'SUPPORT' || admin.role?.name === 'SAAS_ADMIN';
    if (admin.level < 9 && !isSupport) {
      throw new ForbiddenException('Sem permissão para simular usuário.');
    }

    const targetUser = await this.usersService.findOne(targetUserId, tenantId);
    if (!targetUser) {
      throw new UnauthorizedException('Usuário alvo não encontrado.');
    }

    return this.login(targetUser, true, adminId);
  }
}
