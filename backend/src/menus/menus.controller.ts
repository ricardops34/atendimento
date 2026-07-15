import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly service: MenusService) {}

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>) { return this.service.search(query); }

  @Post('routine-links')
  createRoutineLink(@Body() data: any) { return this.service.createRoutineLink(data); }

  @Get('routine-links')
  searchRoutineLinks(@Query() query: Record<string, string | undefined>) { return this.service.searchRoutineLinks(query); }

  @Get('routine-links/:id')
  findRoutineLink(@Param('id', ParseIntPipe) id: number) { return this.service.findRoutineLink(id); }

  @Patch('routine-links/:id')
  updateRoutineLink(@Param('id', ParseIntPipe) id: number, @Body() data: any) { return this.service.updateRoutineLink(id, data); }

  @Delete('routine-links/:id')
  removeRoutineLink(@Param('id', ParseIntPipe) id: number) { return this.service.removeRoutineLink(id); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) { return this.service.update(id, data); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
