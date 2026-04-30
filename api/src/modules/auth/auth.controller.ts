import { Controller, Post, Body, Headers, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: any,
    @Headers('x-tenant-id') tenantIdFromHeader: string
  ) {
    // Prioriza o tenantId do corpo da requisição ou do Header
    const tenantId = loginDto.tenantId || tenantIdFromHeader;

    // Removemos o bloqueio obrigatório aqui para permitir login de Super Admin
    // A validação real acontecerá dentro do validateUser
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password
    );

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    // Geramos o Token JWT
    return this.authService.login(user);
  }
}
