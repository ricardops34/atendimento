import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMenu(@Req() req) {
    const userRole = req.user.role || 'USER';
    return this.menuService.getMenuByRole(userRole);
  }

  @Post('seed')
  async seed() {
    return this.menuService.seedInitialMenus();
  }
}
