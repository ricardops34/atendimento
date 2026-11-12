import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { BancoHorasService } from './banco-horas.service';
import { LancarDebitoDto } from './dto/lancar-debito.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { ProfissionalScopeGuard } from '../auth/guards/profissional-scope.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@UseGuards(JwtAuthGuard, EmpresaGuard, MenuGuard, ProfissionalScopeGuard)
@RequireMenu('banco-horas-list')
@Controller('banco-horas')
export class BancoHorasController {
  constructor(private readonly bancoHorasService: BancoHorasService) {}

  @Get()
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.bancoHorasService.search(query, req.user.empresaId as number, req.profissionalScope);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.bancoHorasService.findOne(id, req.user.empresaId as number, req.profissionalScope);
  }

  @Get(':id/movimentos')
  extrato(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.bancoHorasService.extrato(id, req.user.empresaId as number, req.profissionalScope);
  }

  @Post(':id/debito')
  lancarDebito(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: LancarDebitoDto,
    @Request() req: any,
  ) {
    return this.bancoHorasService.lancarDebito(id, dto, req.user.empresaId as number, req.profissionalScope);
  }
}
