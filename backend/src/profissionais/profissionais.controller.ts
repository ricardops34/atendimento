import { Controller, Get, Post, Body, Patch, Put, Param, Delete, ParseIntPipe, Query, Request, UseGuards } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { ProfissionalScopeGuard } from '../auth/guards/profissional-scope.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

// Guards de leitura ficam no controller: GET fica disponível para quem tem acesso aos
// Atendimentos (ex: Analista), já restrito pelo profissionalScope (analista só enxerga a si
// mesmo; gerente, a si mesmo + sua equipe). As rotas de escrita exigem adicionalmente o menu
// 'profissionais-list' (tela de gestão de Profissionais), que o Analista não possui.
@UseGuards(JwtAuthGuard, EmpresaGuard, ProfissionalScopeGuard)
@Controller('profissionais')
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) {}

  @Post()
  @UseGuards(MenuGuard)
  @RequireMenu('profissionais-list')
  create(@Body() createProfissionalDto: CreateProfissionalDto, @Request() req: any) {
    return this.profissionaisService.create(createProfissionalDto, req.empresaId as number);
  }

  @Get()
  findAll(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.profissionaisService.search(query, req.empresaId as number, req.profissionalScope);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.profissionaisService.search(query, req.empresaId as number, req.profissionalScope);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.profissionaisService.findOne(id, req.empresaId as number, req.profissionalScope);
  }

  @Patch(':id')
  @UseGuards(MenuGuard)
  @RequireMenu('profissionais-list')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfissionalDto: UpdateProfissionalDto, @Request() req: any) {
    return this.profissionaisService.update(id, updateProfissionalDto, req.empresaId as number);
  }

  @Put(':id')
  @UseGuards(MenuGuard)
  @RequireMenu('profissionais-list')
  updatePut(@Param('id', ParseIntPipe) id: number, @Body() updateProfissionalDto: UpdateProfissionalDto, @Request() req: any) {
    return this.profissionaisService.update(id, updateProfissionalDto, req.empresaId as number);
  }

  @Delete(':id')
  @UseGuards(MenuGuard)
  @RequireMenu('profissionais-list')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.profissionaisService.remove(id, req.empresaId as number);
  }
}
