import { Controller, Get, Query, Request, Res, HttpStatus, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { PortalClienteService } from './portal-cliente.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { ClienteContextGuard } from '../auth/guards/cliente-context.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@UseGuards(JwtAuthGuard, EmpresaGuard, MenuGuard, ClienteContextGuard)
@Controller('portal-cliente/agendamentos')
export class PortalClienteController {
  constructor(private readonly portalClienteService: PortalClienteService) {}

  @Get('calendario')
  @RequireMenu('portal-cliente-calendario')
  calendario(@Request() req: any) {
    return this.portalClienteService.calendario(req.empresaId as number, req.clienteId as number);
  }

  @Get()
  @RequireMenu('portal-cliente-lista')
  lista(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.portalClienteService.lista(query, req.empresaId as number, req.clienteId as number);
  }

  @Get('extrato')
  @RequireMenu('portal-cliente-extrato')
  async extrato(
    @Query('format') format: string,
    @Query('tipoExtrato') tipoExtrato: string,
    @Query('dataInicial') dataInicial: string,
    @Query('dataFinal') dataFinal: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const validFormats = ['pdf', 'xls'];
    if (!validFormats.includes(format)) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Parâmetro format inválido. Use: pdf ou xls.' });
      return;
    }
    const validTipos = ['sintetico', 'analitico', 'calendario'];
    const tipoExtratoResolvido = (validTipos.includes(tipoExtrato) ? tipoExtrato : 'analitico') as
      | 'sintetico'
      | 'analitico'
      | 'calendario';
    if (!dataInicial || !dataFinal) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Informe dataInicial e dataFinal.' });
      return;
    }

    try {
      const buffer = await this.portalClienteService.extrato(
        req.empresaId as number,
        req.clienteId as number,
        dataInicial,
        dataFinal,
        tipoExtratoResolvido,
        format as 'pdf' | 'xls',
      );
      const contentTypeMap: Record<string, string> = {
        pdf: 'application/pdf',
        xls: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };
      const extMap: Record<string, string> = { pdf: 'pdf', xls: 'xlsx' };
      res.setHeader('Content-Type', contentTypeMap[format]);
      res.setHeader('Content-Disposition', `attachment; filename="extrato-cliente.${extMap[format]}"`);
      res.send(buffer);
    } catch (e: any) {
      const status = e?.status || 500;
      const message = e?.message || 'Erro interno ao gerar extrato.';
      res.status(status).json({ message });
    }
  }
}
