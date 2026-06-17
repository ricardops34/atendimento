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
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
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

    if (!user) {
      return null;
    }

    const modules = user.profile.profileModules
      .filter((pm) => pm.canRead)
      .map((pm) => pm.module.key);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      tenant: user.tenant,
      profile: user.profile.name,
      modules,
    };
  }
}
