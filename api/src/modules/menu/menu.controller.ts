import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Menu & Navigation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu(@Request() req: any) {
    const user = req.user;
    
    // Pegamos o Tenant ID e a Role do usuário autenticado no JWT
    const tenantId = user.tenantId;
    
    // Se for SUPER_ADMIN, passamos essa permissão especial para o serviço
    const permissions = [user.role]; 
    if (user.level >= 9) permissions.push('SAAS_ADMIN');

    return this.menuService.getTenantMenu(tenantId, permissions);
  }
}
