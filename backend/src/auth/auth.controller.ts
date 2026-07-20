import { Controller, Post, Body, UseGuards, Get, Request, Res } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from './decorators/public.decorator';
import { ACCESS_TOKEN_COOKIE, buildAccessTokenCookieOptions } from './auth-cookie.util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  // Login/switch-empresa não devolvem mais o token no corpo da resposta —
  // ele vai só no cookie httpOnly, pra não ficar acessível via JavaScript.
  private respondWithSession(res: Response, result: any) {
    if (result?.accessToken) {
      res.cookie(ACCESS_TOKEN_COOKIE, result.accessToken, buildAccessTokenCookieOptions());
      const { accessToken, ...rest } = result;
      return rest;
    }
    return result;
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('empresa-options')
  async empresaOptions(@Body('email') email: string) {
    if (!email) return [];
    const user = await this.prisma.user.findFirst({
      where: { email, isActive: true },
      include: { userEmpresas: { include: { empresa: true } } },
    });
    if (!user) return [];
    return user.userEmpresas.map((ut) => ({
      label: ut.empresa.name,
      value: ut.empresaId,
    }));
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(loginDto);
    const result = await this.authService.login(user, loginDto.empresaId);
    return this.respondWithSession(res, result);
  }

  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE, { ...buildAccessTokenCookieOptions(), maxAge: undefined });
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('switch-empresa')
  async switchEmpresa(@Request() req: any, @Body() body: { empresaId: number }, @Res({ passthrough: true }) res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        profile: {
          include: {
            menu: { include: { items: { include: { routine: { include: { module: true } } } } } },
          },
        },
        userEmpresas: {
          include: {
            empresa: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const result = await this.authService.login(user, Number(body.empresaId));
    return this.respondWithSession(res, result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        profile: {
          include: {
            menu: { include: { items: { include: { routine: { include: { module: true } } } } } },
          },
        },
        userEmpresas: {
          include: {
            empresa: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return this.authService.buildSessionUser(user, req.user.empresaId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async updateProfile(@Request() req: any, @Body() body: { avatar?: string; password?: string }) {
    const user = await this.authService.updateCurrentUser(req.user.userId, body);
    return this.authService.buildSessionUser(user, req.user.empresaId);
  }
}
