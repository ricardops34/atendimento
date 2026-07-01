import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Agendamento } from '@prisma/client';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { composeDateTime, calculateDuration } from './agendamentos.utils';

type ExportFormat = 'csv' | 'xls' | 'pdf' | 'xml';

interface AgendamentoExportFilters {
  search?: string;
  tipo?: string;
  local?: string;
  contratoId?: number;
  profissionalId?: number;
  dataInicial?: string;
  dataFinal?: string;
  empresaId?: number;
}

interface SearchQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  tipo?: string;
  local?: string;
  contratoId?: string;
  profissionalId?: string;
  dataInicial?: string;
  dataFinal?: string;
}

@Injectable()
export class AgendamentosService {
  constructor(private prisma: PrismaService) {}

  private parseNumber(value?: string): number | undefined {
    if (!value) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  private parseDate(value?: string, endOfDay = false): Date | undefined {
    if (!value) return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return undefined;
    if (endOfDay) {
      date.setHours(23, 59, 59, 999);
    } else {
      date.setHours(0, 0, 0, 0);
    }
    return date;
  }

  private formatMinutes(minutes: number): string {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  private buildWhereFromFilters(filters: AgendamentoExportFilters): object {
    const andFilters: object[] = [];

    if (filters.empresaId) {
      andFilters.push({ empresaId: filters.empresaId });
    }

    if (filters.search) {
      andFilters.push({
        OR: [
          { descricao: { contains: filters.search, mode: 'insensitive' } },
          { contrato: { descricao: { contains: filters.search, mode: 'insensitive' } } },
          { profissional: { nome: { contains: filters.search, mode: 'insensitive' } } },
        ],
      });
    }

    if (filters.tipo) andFilters.push({ tipo: filters.tipo });
    if (filters.local) andFilters.push({ local: filters.local });
    if (filters.contratoId) andFilters.push({ contratoId: filters.contratoId });
    if (filters.profissionalId) andFilters.push({ profissionalId: filters.profissionalId });

    const dataInicial = this.parseDate(filters.dataInicial);
    const dataFinal = this.parseDate(filters.dataFinal, true);
    if (dataInicial || dataFinal) {
      andFilters.push({
        dataAgenda: {
          ...(dataInicial ? { gte: dataInicial } : {}),
          ...(dataFinal ? { lte: dataFinal } : {}),
        },
      });
    }

    return andFilters.length > 0 ? { AND: andFilters } : {};
  }

  async create(dto: CreateAgendamentoDto): Promise<Agendamento> {
    let cor = dto.cor;
    let descricao = dto.descricao;

    if (dto.contratoId && (!cor || !descricao)) {
      const contrato = await this.prisma.contrato.findUnique({ where: { id: dto.contratoId } });
      if (contrato) {
        if (!cor) cor = contrato.cor;
        if (!descricao) descricao = contrato.descricao;
      }
    }

    const horarioInicial = composeDateTime(dto.dataAgenda, dto.horaInicio);
    const horarioFinal = composeDateTime(dto.dataAgenda, dto.horaFim);
    const duracaoMinutos = calculateDuration(
      dto.horaInicio,
      dto.horaFim,
      dto.horaIntervaloInicial || '00:00',
      dto.horaIntervaloFinal || '00:00',
    );

    return this.prisma.agendamento.create({
      data: {
        empresaId: (dto as any).empresaId ?? 1,
        contratoId: dto.contratoId ?? null,
        profissionalId: dto.profissionalId ?? null,
        descricao: descricao || 'Agendamento sem descrição',
        dataAgenda: new Date(dto.dataAgenda),
        horaInicio: dto.horaInicio,
        horaFim: dto.horaFim,
        horaIntervaloInicial: dto.horaIntervaloInicial || '00:00',
        horaIntervaloFinal: dto.horaIntervaloFinal || '00:00',
        duracaoMinutos,
        horarioInicial,
        horarioFinal,
        local: dto.local || 'P',
        tipo: dto.tipo || 'A',
        cor: cor || '#333333',
        observacao: dto.observacao,
      },
    });
  }

  async gerarMensal(mes: number, ano: number, contratoId?: number, profissionalId?: number, empresaId?: number): Promise<{ gerados: number }> {
    const dataInicio = new Date(ano, mes - 1, 1);
    const dataFim = new Date(ano, mes, 0, 23, 59, 59, 999);
    
    const whereContrato: any = { empresaId };
    if (contratoId) whereContrato.id = contratoId;

    const contratos = await this.prisma.contrato.findMany({
      where: whereContrato,
      include: { escalas: true }
    });

    const agendamentosExistentes = await this.prisma.agendamento.findMany({
      where: {
        empresaId,
        dataAgenda: { gte: dataInicio, lte: dataFim },
        ...(contratoId ? { contratoId } : {}),
        ...(profissionalId ? { profissionalId } : {})
      },
      select: { dataAgenda: true, contratoId: true, profissionalId: true }
    });

    const feriados = await this.prisma.feriado.findMany({
      where: { empresaId }
    });

    const checkFeriado = (d: Date) => {
      const dMonth = d.getMonth();
      const dDate = d.getDate();
      const dYear = d.getFullYear();
      
      return feriados.some(f => {
        const fDate = new Date(f.data);
        // Fixo = compara mês e dia; Não fixo = compara ano, mês e dia
        if (f.fixo) {
          return fDate.getUTCMonth() === dMonth && fDate.getUTCDate() === dDate;
        } else {
          return fDate.getUTCFullYear() === dYear && fDate.getUTCMonth() === dMonth && fDate.getUTCDate() === dDate;
        }
      });
    };

    const formatToYMD = (d: Date) => {
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    };
    
    const formatUTCToYMD = (d: Date) => {
      return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
    };

    const setExistentes = new Set(
      agendamentosExistentes.map(a => `${formatUTCToYMD(new Date(a.dataAgenda))}_${a.contratoId}_${a.profissionalId}`)
    );

    const novosAgendamentos: any[] = [];

    for (const contrato of contratos) {
      if (!contrato.escalas || contrato.escalas.length === 0) continue;

      for (let d = new Date(dataInicio); d <= dataFim; d.setDate(d.getDate() + 1)) {
        const diaSemana = d.getDay();
        const escalasDia = contrato.escalas.filter((e: any) => {
          if (e.diaSemana !== diaSemana) return false;
          if (profissionalId && e.profissionalId !== profissionalId) return false;
          return true;
        });
        
        for (const escala of escalasDia) {
          const dateStr = formatToYMD(d);
          const key = `${dateStr}_${contrato.id}_${escala.profissionalId}`;
          
          if (!setExistentes.has(key)) {
            const dataAgenda = new Date(d);
            const horarioInicial = composeDateTime(dataAgenda, escala.horaInicio);
            const horarioFinal = composeDateTime(dataAgenda, escala.horaFim);
            const duracaoMinutos = calculateDuration(escala.horaInicio, escala.horaFim, escala.intervaloIni, escala.intervaloFim);

            const isHoliday = checkFeriado(d);

            novosAgendamentos.push({
              empresaId: empresaId || 1,
              contratoId: contrato.id,
              profissionalId: escala.profissionalId,
              descricao: contrato.descricao,
              dataAgenda,
              horaInicio: escala.horaInicio,
              horaFim: escala.horaFim,
              horaIntervaloInicial: escala.intervaloIni,
              horaIntervaloFinal: escala.intervaloFim,
              duracaoMinutos,
              horarioInicial,
              horarioFinal,
              local: 'P',
              tipo: isHoliday ? 'F' : 'A',
              cor: contrato.cor || '#333333',
              observacao: 'Gerado automaticamente pela rotina mensal'
            });
            
            setExistentes.add(key);
          }
        }
      }
    }

    if (novosAgendamentos.length > 0) {
      await this.prisma.agendamento.createMany({ data: novosAgendamentos });
    }

    return { gerados: novosAgendamentos.length };
  }

  async findAll(empresaId: number): Promise<Agendamento[]> {
    const items = await this.prisma.agendamento.findMany({
      where: { empresaId },
      include: { contrato: true, profissional: true },
    });
    return items.map(item => ({
      ...item,
      duracaoMinutos: item.duracaoMinutos || calculateDuration(item.horaInicio, item.horaFim, item.horaIntervaloInicial, item.horaIntervaloFinal)
    }));
  }

  async search(query: SearchQuery, empresaId: number): Promise<{
    items: Agendamento[];
    page: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
  }> {
    const page = Math.max(this.parseNumber(query.page) || 1, 1);
    const pageSize = Math.max(this.parseNumber(query.pageSize) || 20, 1);

    const filters: AgendamentoExportFilters = {
      search: query.search?.trim(),
      tipo: query.tipo?.trim(),
      local: query.local?.trim(),
      contratoId: this.parseNumber(query.contratoId),
      profissionalId: this.parseNumber(query.profissionalId),
      dataInicial: query.dataInicial,
      dataFinal: query.dataFinal,
      empresaId,
    };

    const where = this.buildWhereFromFilters(filters);
    const total = await this.prisma.agendamento.count({ where });
    const items = await this.prisma.agendamento.findMany({
      where,
      include: { contrato: true, profissional: true },
      orderBy: [{ dataAgenda: 'desc' }, { horaInicio: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const itemsMapped = items.map(item => ({
      ...item,
      duracaoMinutos: item.duracaoMinutos || calculateDuration(item.horaInicio, item.horaFim, item.horaIntervaloInicial, item.horaIntervaloFinal)
    }));

    return { items: itemsMapped, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, empresaId?: number): Promise<Agendamento> {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const agendamento = await this.prisma.agendamento.findFirst({
      where,
      include: { contrato: true, profissional: true },
    });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
    
    agendamento.duracaoMinutos = agendamento.duracaoMinutos || calculateDuration(agendamento.horaInicio, agendamento.horaFim, agendamento.horaIntervaloInicial, agendamento.horaIntervaloFinal);

    return agendamento;
  }

  async update(id: number, dto: UpdateAgendamentoDto, empresaId?: number): Promise<Agendamento> {
    const current = await this.findOne(id, empresaId);

    const dataAgenda = dto.dataAgenda ? new Date(dto.dataAgenda) : current.dataAgenda;
    const horaInicio = dto.horaInicio || current.horaInicio;
    const horaFim = dto.horaFim || current.horaFim;
    const horaIntervaloInicial = dto.horaIntervaloInicial || current.horaIntervaloInicial;
    const horaIntervaloFinal = dto.horaIntervaloFinal || current.horaIntervaloFinal;

    const horarioInicial = composeDateTime(dataAgenda, horaInicio);
    const horarioFinal = composeDateTime(dataAgenda, horaFim);
    const duracaoMinutos = calculateDuration(horaInicio, horaFim, horaIntervaloInicial, horaIntervaloFinal);

    return this.prisma.agendamento.update({
      where: { id },
      data: {
        ...dto,
        dataAgenda: dto.dataAgenda ? new Date(dto.dataAgenda) : undefined,
        horarioInicial,
        horarioFinal,
        duracaoMinutos,
      },
    });
  }

  async remove(id: number, empresaId?: number): Promise<Agendamento> {
    await this.findOne(id, empresaId);
    return this.prisma.agendamento.delete({ where: { id } });
  }

  async confirmar(id: number, empresaId: number): Promise<Agendamento> {
    return this.prisma.$transaction(async (tx) => {
      const agendamento = await tx.agendamento.findUnique({
        where: { id, empresaId } as any, // Temporary fix for Prisma types if composite unique is not defined properly
        include: { contrato: true, profissional: true },
      });
      if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
      if (agendamento.tipo !== 'A') {
        throw new HttpException(
          `Registro não pode ser alterado. Status atual: ${agendamento.tipo}.`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return tx.agendamento.update({
        where: { id },
        data: { tipo: 'R' },
        include: { contrato: true, profissional: true },
      });
    });
  }

  async generateExport(filters: AgendamentoExportFilters, format: ExportFormat): Promise<Buffer> {
    const where = this.buildWhereFromFilters(filters);

    const items = await this.prisma.agendamento.findMany({
      where,
      include: { contrato: true, profissional: true },
      orderBy: [{ dataAgenda: 'desc' }, { horaInicio: 'desc' }],
      take: 1001,
    });

    if (items.length > 1000) {
      const total = await this.prisma.agendamento.count({ where });
      throw new HttpException(
        `Refine os filtros para exportar menos de 1.000 registros. A query atual retornaria ${total} registros.`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const processedItems = items.map(item => ({
      ...item,
      duracaoMinutos: item.duracaoMinutos || calculateDuration(item.horaInicio, item.horaFim, item.horaIntervaloInicial, item.horaIntervaloFinal)
    }));

    const localMap: Record<string, string> = { P: 'Presencial', R: 'Remoto', F: 'Falta', E: 'Extra' };
    const tipoMap: Record<string, string> = { A: 'Agendada', R: 'Realizada', C: 'Cancelada', F: 'Feriado' };

    const rows = processedItems.map((a) => ({
      data: a.dataAgenda ? new Date(a.dataAgenda).toLocaleDateString('pt-BR') : '',
      contrato: (a as any).contrato?.descricao || '',
      profissional: (a as any).profissional?.nome || '',
      modalidade: localMap[a.local] || a.local,
      duracao: this.formatMinutes(a.duracaoMinutos),
      status: tipoMap[a.tipo] || a.tipo,
      descricao: a.descricao,
    }));

    if (format === 'csv') return this.buildCsv(rows);
    if (format === 'xls') return this.buildXlsx(rows);
    if (format === 'pdf') return this.buildPdf(rows);
    return this.buildXml(rows);
  }

  private buildCsv(rows: object[]): Buffer {
    const headers = ['Data', 'Contrato', 'Profissional', 'Modalidade', 'Duração Total', 'Status', 'Descrição'];
    const escape = (v: string) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const lines = [
      headers.map(escape).join(','),
      ...rows.map((r: any) =>
        [r.data, r.contrato, r.profissional, r.modalidade, r.duracao, r.status, r.descricao]
          .map(escape)
          .join(','),
      ),
    ];
    return Buffer.from('﻿' + lines.join('\r\n'), 'utf-8');
  }

  private async buildXlsx(rows: object[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Atendimentos');
    sheet.columns = [
      { header: 'Data', key: 'data', width: 14 },
      { header: 'Contrato', key: 'contrato', width: 25 },
      { header: 'Profissional', key: 'profissional', width: 25 },
      { header: 'Modalidade', key: 'modalidade', width: 15 },
      { header: 'Duração Total', key: 'duracao', width: 14 },
      { header: 'Status', key: 'status', width: 14 },
      { header: 'Descrição', key: 'descricao', width: 40 },
    ];
    sheet.addRows(rows);
    sheet.getRow(1).font = { bold: true };
    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(arrayBuffer);
  }

  private buildPdf(rows: object[]): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
      const chunks: Buffer[] = [];
      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      doc.fontSize(14).text('Relatório de Atendimentos', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(8);

      const headers = ['Data', 'Contrato', 'Profissional', 'Modalidade', 'Duração', 'Status', 'Descrição'];
      const colWidths = [55, 95, 95, 70, 50, 55, 150];
      let x = 30;
      const headerY = doc.y;
      headers.forEach((h, i) => {
        doc.font('Helvetica-Bold').text(h, x, headerY, { width: colWidths[i], lineBreak: false });
        x += colWidths[i];
      });
      doc.moveDown(0.8);

      rows.forEach((r: any) => {
        const y = doc.y;
        x = 30;
        [r.data, r.contrato, r.profissional, r.modalidade, r.duracao, r.status, r.descricao].forEach((v, i) => {
          doc.font('Helvetica').text(String(v ?? ''), x, y, { width: colWidths[i], lineBreak: false });
          x += colWidths[i];
        });
        doc.moveDown(0.6);
      });

      doc.end();
    });
  }

  private buildXml(rows: object[]): Buffer {
    const escape = (v: string) =>
      String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const items = rows
      .map(
        (r: any) =>
          `  <atendimento>` +
          `<data>${escape(r.data)}</data>` +
          `<contrato>${escape(r.contrato)}</contrato>` +
          `<profissional>${escape(r.profissional)}</profissional>` +
          `<modalidade>${escape(r.modalidade)}</modalidade>` +
          `<duracaoTotal>${escape(r.duracao)}</duracaoTotal>` +
          `<status>${escape(r.status)}</status>` +
          `<descricao>${escape(r.descricao)}</descricao>` +
          `</atendimento>`,
      )
      .join('\n');
    return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>\n<atendimentos>\n${items}\n</atendimentos>`, 'utf-8');
  }

  async generateExportExtrato(filters: AgendamentoExportFilters, format: 'xls' | 'pdf'): Promise<Buffer> {
    const where = this.buildWhereFromFilters(filters);
    
    const items = await this.prisma.agendamento.findMany({
      where,
      include: { 
        contrato: {
          include: { escalas: true }
        }, 
        profissional: true, 
        realizados: true 
      },
      orderBy: [
        { contrato: { descricao: 'asc' } },
        { profissional: { nome: 'asc' } },
        { dataAgenda: 'asc' },
        { horaInicio: 'asc' }
      ],
      take: 2000,
    });

    const periodosPorContrato: Record<string, number> = {};

    const getHorasPrevistasContrato = (contrato: any, agendamentoData: Date) => {
      if (!contrato || !contrato.escalas || contrato.escalas.length === 0) return 0;
      
      let dataIni: Date;
      let dataFim: Date;

      if (filters.dataInicial && filters.dataFinal) {
        dataIni = new Date(filters.dataInicial);
        // Ajustar para não ter problema de fuso e pegar a data certa
        dataIni = new Date(dataIni.getFullYear(), dataIni.getMonth(), dataIni.getDate(), 0, 0, 0);
        
        dataFim = new Date(filters.dataFinal);
        dataFim = new Date(dataFim.getFullYear(), dataFim.getMonth(), dataFim.getDate(), 23, 59, 59, 999);
      } else {
        const agendData = agendamentoData || new Date();
        dataIni = new Date(agendData.getFullYear(), agendData.getMonth(), 1);
        dataFim = new Date(agendData.getFullYear(), agendData.getMonth() + 1, 0, 23, 59, 59, 999);
      }

      const key = `${contrato.id}_${dataIni.toISOString()}`;
      if (periodosPorContrato[key] !== undefined) return periodosPorContrato[key];

      let totalMinutos = 0;
      for (let d = new Date(dataIni); d <= dataFim; d.setDate(d.getDate() + 1)) {
        const diaSemana = d.getDay();
        const escalasDia = contrato.escalas.filter((e: any) => e.diaSemana === diaSemana);
        for (const escala of escalasDia) {
          totalMinutos += calculateDuration(escala.horaInicio, escala.horaFim, escala.intervaloIni, escala.intervaloFim);
        }
      }
      
      const totalHoras = totalMinutos / 60;
      periodosPorContrato[key] = totalHoras;
      return totalHoras;
    };

    const rows = items.map((a: any) => {
      const duracaoMin = a.duracaoMinutos || calculateDuration(a.horaInicio, a.horaFim, a.horaIntervaloInicial, a.horaIntervaloFinal);
      let horasDecimais = duracaoMin / 60;
      
      let valorHora = 0;
      if (a.contrato?.tipo === 'F' && a.contrato?.valorFixo) {
        const horasPrevistas = getHorasPrevistasContrato(a.contrato, a.dataAgenda);
        if (horasPrevistas > 0) {
          valorHora = Number(a.contrato.valorFixo) / horasPrevistas;
        }
      } else {
        valorHora = Number(a.contrato?.valorHora || 0);
      }
      
      let valorTotal = horasDecimais * valorHora;

      let statusFormatado = a.local || '';
      if (a.local === 'P') statusFormatado = 'Presencial';
      else if (a.local === 'R') statusFormatado = 'Remoto';
      else if (a.local === 'F') statusFormatado = 'Falta';
      else if (a.local === 'E') statusFormatado = 'Extra';

      if (a.local === 'F') {
        horasDecimais = -Math.abs(horasDecimais);
        valorTotal = -Math.abs(valorTotal);
      }

      return {
        data: a.dataAgenda ? new Date(a.dataAgenda).toLocaleDateString('pt-BR') : '',
        contrato: a.contrato?.descricao || 'Sem Cliente',
        profissional: a.profissional?.nome || 'Sem Profissional',
        status: statusFormatado,
        horasRealizadas: horasDecimais,
        valorHora: valorHora,
        valorTotal: valorTotal,
      };
    });

    if (format === 'xls') return this.buildXlsxExtrato(rows);
    return this.buildPdfExtrato(rows);
  }

  private async buildXlsxExtrato(rows: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Extrato');
    sheet.columns = [
      { header: 'Data', key: 'data', width: 14 },
      { header: 'Contrato', key: 'contrato', width: 25 },
      { header: 'Profissional', key: 'profissional', width: 25 },
      { header: 'Tipo', key: 'status', width: 15 },
      { header: 'Horas Cobradas', key: 'horasRealizadas', width: 15 },
      { header: 'Valor Hora', key: 'valorHora', width: 15 },
      { header: 'Total (R$)', key: 'valorTotal', width: 15 },
    ];
    sheet.addRows(rows);
    
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const statusVal = row.getCell('status').value;
        if (statusVal === 'Falta') {
          row.font = { color: { argb: 'FFFF0000' } };
        } else if (statusVal === 'Extra') {
          row.font = { color: { argb: 'FF0000FF' } };
        }
      }
    });

    const totalHoras = rows.reduce((acc, r) => acc + Number(r.horasRealizadas), 0);
    const totalFinanceiro = rows.reduce((acc, r) => acc + r.valorTotal, 0);

    const totalRow = sheet.addRow({
      data: 'TOTAIS',
      contrato: '',
      profissional: '',
      status: '',
      horasRealizadas: totalHoras.toFixed(2),
      valorHora: '',
      valorTotal: totalFinanceiro,
    });
    totalRow.font = { bold: true };
    sheet.getRow(1).font = { bold: true };

    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(arrayBuffer);
  }

  private buildPdfExtrato(rows: any[]): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'portrait' });
      const chunks: Buffer[] = [];
      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      const formatCurrency = (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const formatNumber = (val: number) => val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      doc.fontSize(16).font('Helvetica-Bold').text('Extrato de Horas', { align: 'center' });
      doc.moveDown(1.5);

      let totalGeralHoras = 0;
      let totalGeralFinanceiro = 0;

      // Group by Contrato -> Profissional
      const grouped: Record<string, Record<string, any[]>> = {};
      rows.forEach(r => {
        if (!grouped[r.contrato]) grouped[r.contrato] = {};
        if (!grouped[r.contrato][r.profissional]) grouped[r.contrato][r.profissional] = [];
        grouped[r.contrato][r.profissional].push(r);
      });

      const colWidths = [80, 70, 70, 90, 90];
      const startX = 30;
      const rowWidth = 415; // 15 padding + 80 + 70 + 70 + 90 + 90

      for (const contrato of Object.keys(grouped)) {
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#333333').text(`Cliente: ${contrato}`, startX);
        doc.moveDown(0.5);

        for (const profissional of Object.keys(grouped[contrato])) {
          doc.fontSize(11).font('Helvetica-Bold').fillColor('#555555').text(`Profissional: ${profissional}`, startX + 10);
          doc.moveDown(0.5);

          // Header da tabela
          let y = doc.y;
          doc.rect(startX + 10, y, rowWidth, 15).fill('#e0e0e0');
          doc.fillColor('#000000').font('Helvetica-Bold').fontSize(9);
          
          doc.text('Data', startX + 15, y + 3, { width: colWidths[0], align: 'left' });
          doc.text('Tipo', startX + 15 + colWidths[0], y + 3, { width: colWidths[1], align: 'left' });
          doc.text('Horas', startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'right' });
          doc.text('Val/Hora', startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'right' });
          doc.text('Total', startX + 15 + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y + 3, { width: colWidths[4], align: 'right' });
          
          doc.y = y + 15;
          let zebra = false;

          let subTotalHoras = 0;
          let subTotalFinanceiro = 0;

          grouped[contrato][profissional].forEach(r => {
            y = doc.y;
            if (y > 750) {
              doc.addPage();
              y = doc.y;
            }

            if (zebra) {
              doc.rect(startX + 10, y, rowWidth, 15).fill('#f9f9f9');
            }
            zebra = !zebra;

            let textColor = '#333333';
            if (r.status === 'Falta') textColor = '#FF0000';
            else if (r.status === 'Extra') textColor = '#0000FF';

            doc.fillColor(textColor).font('Helvetica').fontSize(9);
            
            doc.text(r.data, startX + 15, y + 3, { width: colWidths[0], align: 'left' });
            doc.text(r.status, startX + 15 + colWidths[0], y + 3, { width: colWidths[1], align: 'left' });
            doc.text(formatNumber(r.horasRealizadas), startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'right' });
            doc.text(formatCurrency(r.valorHora), startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'right' });
            doc.text(formatCurrency(r.valorTotal), startX + 15 + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y + 3, { width: colWidths[4], align: 'right' });
            
            doc.y = y + 15;
            
            subTotalHoras += r.horasRealizadas;
            subTotalFinanceiro += r.valorTotal;
            totalGeralHoras += r.horasRealizadas;
            totalGeralFinanceiro += r.valorTotal;
          });

          // Subtotal do Profissional
          y = doc.y;
          if (y > 750) {
            doc.addPage();
            y = doc.y;
          }
          doc.rect(startX + 10, y, rowWidth, 15).fill('#eeeeee');
          doc.fillColor('#000000').font('Helvetica-Bold');
          doc.text('Subtotal:', startX + 15, y + 3, { width: colWidths[0], align: 'left' });
          doc.text(formatNumber(subTotalHoras), startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'right' });
          doc.text(formatCurrency(subTotalFinanceiro), startX + 15 + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y + 3, { width: colWidths[4], align: 'right' });
          doc.y = y + 25;
        }
        doc.moveDown(1);
      }

      // Total Geral
      doc.moveDown(1);
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#000000');
      doc.text(`Total Geral de Horas: ${formatNumber(totalGeralHoras)}`, { align: 'right' });
      doc.text(`Total Geral Financeiro: ${formatCurrency(totalGeralFinanceiro)}`, { align: 'right' });

      doc.end();
    });
  }
}
