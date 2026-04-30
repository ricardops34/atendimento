import { Controller, Post, Body, Headers, UnauthorizedException, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: any,
    @Headers('x-tenant-id') tenantIdFromHeader: string
  ) {
    // Aceita tanto login quanto email no campo 'email' do DTO para compatibilidade
    const identifier = loginDto.email || loginDto.login;
    const user = await this.authService.validateUser(
      identifier,
      loginDto.password
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('impersonate')
  @HttpCode(HttpStatus.OK)
  async impersonate(
    @Body('userId') targetUserId: string,
    @Req() req: any
  ) {
    const adminId = req.user.userId;
    const tenantId = req.user.tenantId;

    return this.authService.impersonate(adminId, targetUserId, tenantId);
  }
}
