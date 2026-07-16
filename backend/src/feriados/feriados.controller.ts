import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { FeriadosService } from './feriados.service';
import { CreateFeriadoDto } from './dto/create-feriado.dto';
import { UpdateFeriadoDto } from './dto/update-feriado.dto';
import { GerarNacionaisDto } from './dto/gerar-nacionais.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('feriados')
@UseGuards(JwtAuthGuard)
export class FeriadosController {
  constructor(private readonly feriadosService: FeriadosService) {}

  @Post()
  create(@Body() createFeriadoDto: CreateFeriadoDto, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.create(createFeriadoDto, tenantId);
  }

  @Post('gerar-nacionais')
  gerarNacionais(@Body() body: GerarNacionaisDto, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.gerarNacionais(body.ano, tenantId);
  }

  @Get('search')
  search(@Query() query: any, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.search(query, tenantId);
  }

  @Get()
  findAll(@Query() query: any, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.search(query, tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.findOne(+id, tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeriadoDto: UpdateFeriadoDto, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.update(+id, updateFeriadoDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    return this.feriadosService.remove(+id, tenantId);
  }
}
