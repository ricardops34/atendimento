import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { ProfissionalScopeGuard } from '../auth/guards/profissional-scope.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

// Guards de leitura ficam no controller: GET fica disponível para quem tem acesso aos
// Atendimentos (ex: Analista), já restrito pelo profissionalScope (só enxerga os próprios
// contratos). As rotas de escrita exigem adicionalmente o menu 'contratos-list' (tela de
// gestão de Contratos), que o Analista não possui.
@UseGuards(JwtAuthGuard, EmpresaGuard, ProfissionalScopeGuard)
@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  @UseGuards(MenuGuard)
  @RequireMenu('contratos-list')
  create(@Body() createContratoDto: CreateContratoDto, @Request() req: any) {
    return this.contratosService.create(createContratoDto, req.user.empresaId as number);
  }

  @Get()
  findAll(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.contratosService.search(query, req.user.empresaId as number, req.profissionalScope);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.contratosService.search(query, req.user.empresaId as number, req.profissionalScope);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.findOne(id, req.user.empresaId as number, req.profissionalScope);
  }

  @Patch(':id')
  @UseGuards(MenuGuard)
  @RequireMenu('contratos-list')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateContratoDto: UpdateContratoDto, @Request() req: any) {
    return this.contratosService.update(id, updateContratoDto, req.user.empresaId as number, req.profissionalScope);
  }

  @Delete(':id')
  @UseGuards(MenuGuard)
  @RequireMenu('contratos-list')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.contratosService.remove(id, req.user.empresaId as number, req.profissionalScope);
  }
}
