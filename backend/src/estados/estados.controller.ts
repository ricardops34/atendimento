import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('estados')
@UseGuards(JwtAuthGuard)
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Get('search')
  search(@Query() query: any) {
    return this.estadosService.findAll(query);
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

