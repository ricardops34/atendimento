import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    return this.authService.login(user, loginDto.tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('switch-tenant')
  async switchTenant(@Request() req: any, @Body() body: { tenantId: number }) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
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

    if (!user) {
      return null;
    }

    return this.authService.login(user, Number(body.tenantId));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
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

    if (!user) {
      return null;
    }

    return this.authService.buildSessionUser(user, req.user.tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async updateProfile(@Request() req: any, @Body() body: { avatar?: string; password?: string }) {
    const user = await this.authService.updateCurrentUser(req.user.userId, body);
    return this.authService.buildSessionUser(user, req.user.tenantId);
  }
}
