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
} from '@nestjs/common';
import type { Response } from 'express';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../auth/guards/tenant.guard';
import { ModuleGuard } from '../auth/guards/module.guard';
import { RequireModule } from '../auth/decorators/require-module.decorator';

@UseGuards(JwtAuthGuard, TenantGuard, ModuleGuard)
@RequireModule('appointments-list')
@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentosService.create(createAgendamentoDto);
  }

  @Get()
  findAll() {
    return this.agendamentosService.findAll();
  }

  @Get('search')
  search(@Query() query: Record<string, string | undefined>) {
    return this.agendamentosService.search(query);
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
      tenantId: req.tenantId as number,
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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentosService.findOne(id);
  }

  @Patch(':id/confirmar')
  confirmar(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.agendamentosService.confirmar(id, req.tenantId as number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAgendamentoDto: UpdateAgendamentoDto) {
    return this.agendamentosService.update(id, updateAgendamentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agendamentosService.remove(id);
  }
}
