import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto, CreateMenuRoutineLinkDto } from './dto/create-menu.dto';
import { UpdateMenuDto, UpdateMenuRoutineLinkDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@UseGuards(JwtAuthGuard, MenuGuard)
@RequireMenu('configuracoes-menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly service: MenusService) {}

  @Post()
  create(@Body() data: CreateMenuDto) { return this.service.create(data); }

  @Get()
  findAll(@Query() query: Record<string, string | undefined>) { return this.service.search(query); }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>) { return this.service.search(query); }

  @Post('routine-links')
  createRoutineLink(@Body() data: CreateMenuRoutineLinkDto) { return this.service.createRoutineLink(data); }

  @Get('routine-links')
  searchRoutineLinks(@Query() query: Record<string, string | undefined>) { return this.service.searchRoutineLinks(query); }

  @Get('routine-links/:id')
  findRoutineLink(@Param('id', ParseIntPipe) id: number) { return this.service.findRoutineLink(id); }

  @Patch('routine-links/:id')
  updateRoutineLink(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMenuRoutineLinkDto) { return this.service.updateRoutineLink(id, data); }

  @Delete('routine-links/:id')
  removeRoutineLink(@Param('id', ParseIntPipe) id: number) { return this.service.removeRoutineLink(id); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMenuDto) { return this.service.update(id, data); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
