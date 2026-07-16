import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SystemModulesService } from './system-modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@UseGuards(JwtAuthGuard, MenuGuard)
@RequireMenu('configuracoes-modulos')
@Controller('modules')
export class SystemModulesController {
  constructor(private readonly service: SystemModulesService) {}

  @Post()
  create(@Body() data: CreateModuleDto) {
    return this.service.create(data);
  }

  @Get()
  findAll(@Query() query: Record<string, string | undefined>) {
    return this.service.search(query);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>) {
    return this.service.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateModuleDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
