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
  tenantId?: number;
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

    if (filters.tenantId) {
      andFilters.push({ tenantId: filters.tenantId });
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
        tenantId: (dto as any).tenantId ?? 1,
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

  findAll(tenantId: number): Promise<Agendamento[]> {
    return this.prisma.agendamento.findMany({
      where: { tenantId },
      include: { contrato: true, profissional: true },
    });
  }

  async search(query: SearchQuery, tenantId: number): Promise<{
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
      tenantId,
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

    return { items, page, pageSize, total, hasNext: page * pageSize < total };
  }

  async findOne(id: number, tenantId?: number): Promise<Agendamento> {
    const where: any = { id };
    if (tenantId) where.tenantId = tenantId;

    const agendamento = await this.prisma.agendamento.findFirst({
      where,
      include: { contrato: true, profissional: true },
    });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
    return agendamento;
  }

  async update(id: number, dto: UpdateAgendamentoDto, tenantId?: number): Promise<Agendamento> {
    const current = await this.findOne(id, tenantId);

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

  async remove(id: number, tenantId?: number): Promise<Agendamento> {
    await this.findOne(id, tenantId);
    return this.prisma.agendamento.delete({ where: { id } });
  }

  async confirmar(id: number, tenantId: number): Promise<Agendamento> {
    return this.prisma.$transaction(async (tx) => {
      const agendamento = await tx.agendamento.findUnique({
        where: { id, tenantId },
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

    const localMap: Record<string, string> = { P: 'Presencial', R: 'Remoto', F: 'Falta' };
    const tipoMap: Record<string, string> = { A: 'Agendada', R: 'Realizada', C: 'Cancelada', F: 'Feriado' };

    const rows = items.map((a) => ({
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
}
