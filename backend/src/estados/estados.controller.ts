import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@Controller('estados')
@UseGuards(JwtAuthGuard, MenuGuard)
@RequireMenu('configuracoes-estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Get('search')
  search(@Query() query: any) {
    return this.estadosService.findAll(query);
  }

  @Get('metadata')
  metadata() {
    return {
      version: 1,
      title: 'Estados',
      fields: [
        { property: 'id', label: 'Cód. IBGE', key: true, visible: true, filter: true },
        { property: 'nome', label: 'Estado', visible: true, filter: true },
        { property: 'sigla', label: 'Sigla', visible: true, filter: true }
      ]
    };
  }

  @Get()
  findAll(@Query() query: any) {
    return this.estadosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(+id);
  }

  @Post()
  create(@Body() createData: { id: number; nome: string; sigla: string }) {
    return this.estadosService.create(createData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: { nome?: string; sigla?: string }) {
    return this.estadosService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosService.remove(+id);
  }
}

