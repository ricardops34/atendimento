import { Controller, Get, Headers, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu(@Headers('x-tenant-id') tenantId: string, @Request() req: any) {
    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID is required');
    }

    // Em uma implementação real, as permissões viriam do req.user (decodificado do JWT)
    // Por enquanto, vamos simular que o usuário tem todas as permissões se estiver logado
    const userPermissions = req.user?.permissions || ['SUPER_ADMIN']; 

    return this.menuService.getTenantMenu(tenantId, userPermissions);
  }
}
