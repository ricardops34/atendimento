import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';

const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '1d') as `${number}${'s' | 'm' | 'h' | 'd'}` | number;

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_aqui',
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
