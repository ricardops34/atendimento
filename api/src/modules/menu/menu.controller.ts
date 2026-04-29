import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Menu Management')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user-menu')
  async getMenu(@Req() req) {
    return this.menuService.getMenu(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os menus (Admin)' })
  async findAll() {
    return this.menuService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Cria um novo item de menu' })
  async create(@Body() data: any) {
    return this.menuService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um item de menu' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.menuService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um item de menu' })
  async remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }

  @Post('seed')
  async seed() {
    return this.menuService.seedInitialMenus();
  }
}
