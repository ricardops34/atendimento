import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@UseGuards(JwtAuthGuard, EmpresaGuard, MenuGuard)
@RequireMenu('contratos-list')
@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  create(@Body() createContratoDto: CreateContratoDto, @Request() req: any) {
    return this.contratosService.create(createContratoDto, req.user.empresaId as number);
  }

  @Get()
  findAll(@Request() req: any, @Query('bloqueado') bloqueado?: string) {
    const isBloqueado = bloqueado === 'true' ? true : bloqueado === 'false' ? false : undefined;
    return this.contratosService.findAll(req.user.empresaId as number, isBloqueado);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.contratosService.search(query, req.user.empresaId as number);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.findOne(id, req.user.empresaId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContratoDto: UpdateContratoDto, @Request() req: any) {
    return this.contratosService.update(id, updateContratoDto, req.user.empresaId as number);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.remove(id, req.user.empresaId as number);
  }
}
