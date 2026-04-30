import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const cleanEmail = email.trim().toLowerCase();
    const user = await this.usersService.findByEmail(cleanEmail);
    
    if (!user) {
      console.log(`[AuthService] Login falhou: Usuário ${cleanEmail} não encontrado.`);
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    console.log(`[AuthService] Login para ${cleanEmail}: Senha Válida = ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    // Se o usuário for ADMIN e não tiver nível definido, garantimos o Nível 9
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
      tenantName: user.tenant?.name
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
        level: user.level || userLevel
      }
    };
  }
}
