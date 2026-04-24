import { Controller, Post, Body, Headers, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: any,
    @Headers('x-tenant-id') tenantId: string
  ) {
    // Validamos se o Tenant ID foi fornecido
    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID é obrigatório para realizar o login.');
    }

    // Validamos o usuário dentro do contexto do Tenant
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
      tenantId
    );

    // Geramos o Token JWT
    return this.authService.login(user);
  }
}
