import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CepsService } from './ceps.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ceps')
@UseGuards(JwtAuthGuard)
export class CepsController {
  constructor(private readonly cepsService: CepsService) {}

  @Get('search')
  search(@Query() query: any) {
    return this.cepsService.findAll(query);
  }

  @Get('metadata')
  metadata() {
    return {
      version: 1,
      title: 'CEPs',
      fields: [
        { property: 'cep', label: 'CEP', key: true, visible: true, filter: true },
        { property: 'logradouro', label: 'Logradouro', visible: true, filter: true },
        { property: 'bairro', label: 'Bairro', visible: true, filter: true },
        { property: 'municipio.nome', label: 'Município', visible: true },
        { property: 'estado.sigla', label: 'UF', visible: true }
      ]
    };
  }

  @Get()
  findAll(@Query() query: any) {
    return this.cepsService.findAll(query);
  }

  @Get(':cep')
  findOne(@Param('cep') cep: string) {
    return this.cepsService.findOne(cep);
  }

  @Post()
  create(@Body() createData: { cep: string; logradouro: string; bairro: string; municipioId: number; estadoId: number }) {
    return this.cepsService.create(createData);
  }

  @Patch(':cep')
  update(@Param('cep') cep: string, @Body() updateData: { logradouro?: string; bairro?: string; municipioId?: number; estadoId?: number }) {
    return this.cepsService.update(cep, updateData);
  }

  @Delete(':cep')
  remove(@Param('cep') cep: string) {
    return this.cepsService.remove(cep);
  }
}

