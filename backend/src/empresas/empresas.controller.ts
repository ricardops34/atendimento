import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@UseGuards(JwtAuthGuard, EmpresaGuard, MenuGuard)
@RequireMenu('configuracoes-empresas')
@Controller('empresas')
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  @Post()
  create(@Body() data: CreateEmpresaDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateEmpresaDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
