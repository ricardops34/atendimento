import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

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
        tenant: true,
        profile: {
          include: {
            profileModules: {
              include: { module: true },
            },
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciais inválidas ou usuário inativo');
    }

    // Na importação colocamos 'hashed_password_placeholder'. 
    // Como é um MVP, faremos uma comparação simples se as senhas baterem ou se for o placeholder.
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

    return user;
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      tenantId: user.tenantId, 
      profileId: user.profileId 
    };

    const modules = user.profile.profileModules
      .filter((pm: any) => pm.canRead)
      .map((pm: any) => pm.module.key);

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tenant: user.tenant,
        profile: user.profile.name,
        modules,
      },
    };
  }
}
