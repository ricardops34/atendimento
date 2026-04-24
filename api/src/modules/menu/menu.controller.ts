import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu(@Headers('x-tenant-id') tenantId: string) {
    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID is required to load the menu');
    }

    return this.menuService.getTenantMenu(tenantId);
  }
}
