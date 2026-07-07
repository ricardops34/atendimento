import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('municipios')
@UseGuards(JwtAuthGuard)
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get('search')
  search(@Query() query: any) {
    return this.municipiosService.findAll(query);
  }

  @Get('metadata')
  metadata() {
    return {
      version: 1,
      title: 'Municípios',
      fields: [
        { property: 'id', label: 'Cód. IBGE', key: true, visible: true, filter: true },
        { property: 'nome', label: 'Município', visible: true, filter: true },
        { property: 'estado.sigla', label: 'Estado', visible: true }
      ]
    };
  }

  @Get()
  findAll(@Query() query: any) {
    return this.municipiosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.municipiosService.findOne(+id);
  }

  @Post()
  create(@Body() createData: { id: number; nome: string; estadoId: number }) {
    return this.municipiosService.create(createData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: { nome?: string; estadoId?: number }) {
    return this.municipiosService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.municipiosService.remove(+id);
  }
}

