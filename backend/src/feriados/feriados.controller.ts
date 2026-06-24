import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { FeriadosService } from './feriados.service';
import { CreateFeriadoDto } from './dto/create-feriado.dto';
import { UpdateFeriadoDto } from './dto/update-feriado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('feriados')
@UseGuards(JwtAuthGuard)
export class FeriadosController {
  constructor(private readonly feriadosService: FeriadosService) {}

  @Post()
  create(@Body() createFeriadoDto: CreateFeriadoDto, @Request() req) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.create(createFeriadoDto, tenantId);
  }

  @Get('search')
  search(@Query() query: any, @Request() req) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.search(query, tenantId);
  }

  @Get()
  findAll(@Request() req) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.findOne(+id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeriadoDto: UpdateFeriadoDto, @Request() req) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.update(+id, updateFeriadoDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.remove(+id, tenantId);
  }
}
