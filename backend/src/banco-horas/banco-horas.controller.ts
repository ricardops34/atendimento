import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Request, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
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
  extrato(
    @Param('id', ParseIntPipe) id: number,
    @Query('dataInicial') dataInicial: string | undefined,
    @Query('dataFinal') dataFinal: string | undefined,
    @Request() req: any,
  ) {
    return this.bancoHorasService.extrato(id, req.user.empresaId as number, req.profissionalScope, {
      dataInicial: dataInicial?.trim() || undefined,
      dataFinal: dataFinal?.trim() || undefined,
    });
  }

  @Get(':id/movimentos/export')
  async exportarExtrato(
    @Param('id', ParseIntPipe) id: number,
    @Query('format') format: string | undefined,
    @Query('dataInicial') dataInicial: string | undefined,
    @Query('dataFinal') dataFinal: string | undefined,
    @Query('ocultarValor') ocultarValor: string | undefined,
    @Request() req: any,
    @Res() res: Response,
  ) {
    if (format !== 'pdf' && format !== 'xls') {
      throw new BadRequestException('Parâmetro format inválido. Use: pdf ou xls.');
    }
    const buffer = await this.bancoHorasService.exportarExtrato(
      id,
      req.user.empresaId as number,
      req.profissionalScope,
      { dataInicial: dataInicial?.trim() || undefined, dataFinal: dataFinal?.trim() || undefined },
      format,
      ocultarValor === 'true',
    );
    const isXls = format === 'xls';
    res.setHeader(
      'Content-Type',
      isXls ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf',
    );
    res.setHeader('Content-Disposition', `attachment; filename="extrato-banco-horas.${isXls ? 'xlsx' : 'pdf'}"`);
    res.send(buffer);
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
