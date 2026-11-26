import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { GerarMensalDto } from './dto/gerar-mensal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmpresaGuard } from '../auth/guards/empresa.guard';
import { MenuGuard } from '../auth/guards/menu.guard';
import { ProfissionalScopeGuard } from '../auth/guards/profissional-scope.guard';
import { RequireMenu } from '../auth/decorators/require-menu.decorator';

@UseGuards(JwtAuthGuard, EmpresaGuard, MenuGuard, ProfissionalScopeGuard)
@RequireMenu('agendamentos-list')
@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto, @Request() req: any) {
    return this.agendamentosService.create(createAgendamentoDto, req.empresaId as number, req.profissionalScope);
  }

  @Post('gerar-mensal')
  async gerarMensal(@Body() body: GerarMensalDto, @Request() req: any) {
    try {
      return await this.agendamentosService.gerarMensal(
        body.mes,
        body.ano,
        body.contratoId,
        body.profissionalId,
        req.empresaId as number,
        req.profissionalScope,
      );
    } catch (e: any) {
      throw new HttpException(e.stack || e.message || 'Erro ao gerar', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  findAll(@Request() req: any) {
    return this.agendamentosService.findAll(req.empresaId as number, undefined, req.profissionalScope);
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>, @Request() req: any) {
    return this.agendamentosService.search(query, req.empresaId as number, undefined, req.profissionalScope);
  }

  @Get('export')
  async export(
    @Query('format') format: string,
    @Query() query: Record<string, string | undefined>,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const validFormats = ['csv', 'xls', 'pdf', 'xml'];
    if (!format || !validFormats.includes(format)) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Parâmetro format inválido. Use: csv, xls, pdf ou xml.' });
      return;
    }

    const contentTypeMap: Record<string, string> = {
      csv: 'text/csv; charset=utf-8',
      xls: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pdf: 'application/pdf',
      xml: 'application/xml; charset=utf-8',
    };
    const extMap: Record<string, string> = { csv: 'csv', xls: 'xlsx', pdf: 'pdf', xml: 'xml' };

    const filters = {
      search: query.search?.trim(),
      tipo: query.tipo?.trim(),
      local: query.local?.trim(),
      contratoId: query.contratoId ? Number(query.contratoId) : undefined,
      profissionalId: query.profissionalId ? Number(query.profissionalId) : undefined,
      dataInicial: query.dataInicial,
      dataFinal: query.dataFinal,
      empresaId: req.empresaId as number,
      profissionalScope: req.profissionalScope,
    };

    try {
      const buffer = await this.agendamentosService.generateExport(filters, format as any);
      res.setHeader('Content-Type', contentTypeMap[format]);
      res.setHeader('Content-Disposition', `attachment; filename="atendimentos.${extMap[format]}"`);
      res.send(buffer);
    } catch (e: any) {
      const status = e?.status || 500;
      const message = e?.message || 'Erro interno ao gerar exportação.';
      res.status(status).json({ message });
    }
  }

  @Get('export-extrato')
  async exportExtrato(
    @Query('format') format: string,
    @Query() query: Record<string, string | undefined>,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const validFormats = ['xls', 'pdf'];
    if (!format || !validFormats.includes(format)) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Parâmetro format inválido para extrato. Use: xls ou pdf.' });
      return;
    }

    const contentTypeMap: Record<string, string> = {
      xls: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pdf: 'application/pdf',
    };
    const extMap: Record<string, string> = { xls: 'xlsx', pdf: 'pdf' };

    const filters = {
      search: query.search?.trim(),
      tipo: query.tipo?.trim(),
      local: query.local?.trim(),
      contratoId: query.contratoId ? Number(query.contratoId) : undefined,
      profissionalId: query.profissionalId ? Number(query.profissionalId) : undefined,
      dataInicial: query.dataInicial,
      dataFinal: query.dataFinal,
      bancoHorasTipo: query.bancoHorasTipo?.trim(),
      tipoExtrato: query.tipoExtrato as 'sintetico' | 'analitico' | 'calendario' | undefined,
      empresaId: req.empresaId as number,
      profissionalScope: req.profissionalScope,
      ocultarValor: query.ocultarValor === 'true',
      exibirBancoHoras: query.exibirBancoHoras === 'true',
    };

    try {
      const buffer = await this.agendamentosService.generateExportExtrato(filters, format as any);
      res.setHeader('Content-Type', contentTypeMap[format]);
      res.setHeader('Content-Disposition', `attachment; filename="extrato.${extMap[format]}"`);
      res.send(buffer);
    } catch (e: any) {
      const status = e?.status || 500;
      const message = e?.message || 'Erro interno ao gerar extrato.';
      res.status(status).json({ message });
    }
  }

  @Get('export-termo-validacao')
  async exportTermoValidacao(
    @Query('format') format: string,
    @Query() query: Record<string, string | undefined>,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const validFormats = ['pdf', 'docx'];
    if (!format || !validFormats.includes(format)) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Parâmetro format inválido para o Termo de Validação. Use: pdf ou docx.' });
      return;
    }

    const filters = {
      contratoId: query.contratoId ? Number(query.contratoId) : undefined,
      profissionalId: query.profissionalId ? Number(query.profissionalId) : undefined,
      dataInicial: query.dataInicial,
      dataFinal: query.dataFinal,
      empresaId: req.empresaId as number,
      profissionalScope: req.profissionalScope,
    };

    const contentTypeMap: Record<string, string> = {
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    try {
      const buffer = await this.agendamentosService.generateTermoValidacao(filters, format as 'pdf' | 'docx');
      res.setHeader('Content-Type', contentTypeMap[format]);
      res.setHeader('Content-Disposition', `attachment; filename="termo_validacao.${format}"`);
      res.send(buffer);
    } catch (e: any) {
      const status = e?.status || 500;
      const message = e?.message || 'Erro interno ao gerar o Termo de Validação.';
      res.status(status).json({ message });
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.agendamentosService.findOne(id, req.empresaId as number, req.profissionalScope);
  }

  @Patch(':id/confirmar')
  confirmar(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.agendamentosService.confirmar(id, req.empresaId as number, req.profissionalScope);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAgendamentoDto: UpdateAgendamentoDto, @Request() req: any) {
    return this.agendamentosService.update(id, updateAgendamentoDto, req.empresaId as number, req.profissionalScope);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.agendamentosService.remove(id, req.empresaId as number, req.profissionalScope);
  }
}
