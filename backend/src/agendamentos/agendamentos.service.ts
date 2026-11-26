import { ConflictException, ForbiddenException, Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Agendamento } from '@prisma/client';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { composeDateTime, calculateDuration, stripHtml } from './agendamentos.utils';
import { buildPdfCalendario } from './buildPdfCalendario';
import { buildPdfTermoValidacao } from './build-termo-validacao';
import { BancoHorasService } from '../banco-horas/banco-horas.service';

type ExportFormat = 'csv' | 'xls' | 'pdf' | 'xml';

interface AgendamentoExportFilters {
  search?: string;
  tipo?: string;
  local?: string;
  contratoId?: number;
  profissionalId?: number;
  dataInicial?: string;
  dataFinal?: string;
  bancoHorasTipo?: string;
  empresaId?: number;
  tipoExtrato?: 'sintetico' | 'analitico' | 'calendario';
  // Escopa os resultados aos contratos de um Cliente (portal do cliente, feature 003).
  // Nunca deve ser preenchido a partir de input do próprio cliente, só a partir do JWT.
  clienteId?: number;
  // RBAC: lista de profissionalId visíveis para o usuário logado (null = sem restrição,
  // ex: Administrador). Nunca vem de input do usuário, só do ProfissionalScopeGuard.
  profissionalScope?: number[] | null;
  // Extrato: quando true, omite valor hora/valores financeiros do relatório gerado.
  ocultarValor?: boolean;
  // Extrato: quando true, inclui a coluna "Banco de Horas" (Normal/Crédito/Débito) no relatório gerado.
  exibirBancoHoras?: boolean;
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
  constructor(
    private prisma: PrismaService,
    private bancoHorasService: BancoHorasService,
  ) {}

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
    if (filters.bancoHorasTipo) andFilters.push({ bancoHorasTipo: filters.bancoHorasTipo });
    if (filters.contratoId) andFilters.push({ contratoId: filters.contratoId });
    if (filters.profissionalId) andFilters.push({ profissionalId: filters.profissionalId });
    // Agendamento não tem clienteId direto: o vínculo é via Contrato.clienteId.
    if (filters.clienteId) andFilters.push({ contrato: { clienteId: filters.clienteId } });
    // RBAC: Administrador tem profissionalScope null (sem filtro); os demais perfis só
    // enxergam agendamentos dos profissionais do seu escopo (ele mesmo, e seu time se Gerente).
    if (filters.profissionalScope) {
      andFilters.push({ profissionalId: { in: filters.profissionalScope } });
    }

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

  async create(
    dto: CreateAgendamentoDto,
    empresaId: number,
    profissionalScope?: number[] | null,
  ): Promise<Agendamento> {
    if (profissionalScope && (!dto.profissionalId || !profissionalScope.includes(dto.profissionalId))) {
      throw new ForbiddenException('Você só pode lançar atividades para o seu próprio profissional.');
    }

    let cor = dto.cor;
    let descricao = dto.descricao;

    if (dto.contratoId && (!cor || !descricao)) {
      const contrato = await this.prisma.contrato.findUnique({ where: { id: dto.contratoId } });
      if (contrato) {
        if (!cor) cor = contrato.cor;
        if (!descricao) descricao = contrato.descricao;
      }
    }

    const dataAgenda = new Date(dto.dataAgenda);
    const horarioInicial = composeDateTime(dto.dataAgenda, dto.horaInicio);
    const horarioFinal = composeDateTime(dto.dataAgenda, dto.horaFim);
    const duracaoMinutos = calculateDuration(
      dto.horaInicio,
      dto.horaFim,
      dto.horaIntervaloInicial || '00:00',
      dto.horaIntervaloFinal || '00:00',
    );

    const bancoHorasTipo = dto.bancoHorasTipo || 'NORMAL';

    return this.prisma.$transaction(async (tx) => {
      if (dto.contratoId && dto.profissionalId && bancoHorasTipo === 'NORMAL') {
        await this.bancoHorasService.aplicarHorasENotificarExcedente(tx, {
          contratoId: dto.contratoId,
          profissionalId: dto.profissionalId,
          dataAgenda,
          horasAdicionais: duracaoMinutos / 60,
        });
      }

      const agendamento = await tx.agendamento.create({
        data: {
          empresaId,
          contratoId: dto.contratoId ?? null,
          profissionalId: dto.profissionalId ?? null,
          descricao: descricao || 'Agendamento sem descrição',
          dataAgenda,
          horaInicio: dto.horaInicio,
          horaFim: dto.horaFim,
          horaIntervaloInicial: dto.horaIntervaloInicial || '00:00',
          horaIntervaloFinal: dto.horaIntervaloFinal || '00:00',
          duracaoMinutos,
          horarioInicial,
          horarioFinal,
          local: dto.local || 'P',
          tipo: dto.tipo || 'A',
          bancoHorasTipo,
          cor: cor || '#333333',
          observacao: dto.observacao,
        },
      });

      if (dto.contratoId && dto.profissionalId && (bancoHorasTipo === 'CREDITO' || bancoHorasTipo === 'DEBITO')) {
        await this.bancoHorasService.aplicarAtividadeBancoHoras(tx, {
          contratoId: dto.contratoId,
          profissionalId: dto.profissionalId,
          tipo: bancoHorasTipo,
          horas: duracaoMinutos / 60,
          data: dataAgenda,
          descricao: descricao || agendamento.descricao,
          agendamentoId: agendamento.id,
        });
      }

      return agendamento;
    });
  }

  async gerarMensal(
    mes: number,
    ano: number,
    contratoId?: number,
    profissionalId?: number,
    empresaId?: number,
    profissionalScope?: number[] | null,
  ): Promise<{ gerados: number }> {
    if (profissionalScope) {
      if (profissionalId && !profissionalScope.includes(profissionalId)) {
        throw new ForbiddenException('Você só pode gerar agendamentos para o seu próprio profissional.');
      }
      if (!profissionalId && profissionalScope.length === 0) {
        return { gerados: 0, bloqueadosPorLimite: 0 } as any;
      }
    }

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
          if (profissionalScope && !profissionalScope.includes(e.profissionalId)) return false;
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

    let gerados = 0;
    let bloqueadosPorLimite = 0;

    if (novosAgendamentos.length > 0) {
      // Ordenado cronologicamente pelo loop acima: cada item é checado contra o total
      // já lançado no mês antes de criar o próximo, para o excedente/bloqueio ficar correto.
      await this.prisma.$transaction(async (tx) => {
        for (const item of novosAgendamentos) {
          if (item.contratoId && item.profissionalId) {
            try {
              await this.bancoHorasService.aplicarHorasENotificarExcedente(tx, {
                contratoId: item.contratoId,
                profissionalId: item.profissionalId,
                dataAgenda: item.dataAgenda,
                horasAdicionais: item.duracaoMinutos / 60,
              });
            } catch (error) {
              if (error instanceof ConflictException) {
                bloqueadosPorLimite += 1;
                continue;
              }
              throw error;
            }
          }
          await tx.agendamento.create({ data: item });
          gerados += 1;
        }
      });
    }

    return { gerados, bloqueadosPorLimite } as any;
  }

  // `clienteId` nunca vem de query/body do cliente, só de argumento explícito a partir do JWT
  // (ver PortalClienteService).
  async findAll(empresaId: number, clienteId?: number, profissionalScope?: number[] | null): Promise<Agendamento[]> {
    const where: any = { empresaId };
    if (clienteId) where.contrato = { clienteId };
    if (profissionalScope) where.profissionalId = { in: profissionalScope };

    const items = await this.prisma.agendamento.findMany({
      where,
      include: { contrato: true, profissional: true },
    });
    return items.map(item => ({
      ...item,
      duracaoMinutos: item.duracaoMinutos || calculateDuration(item.horaInicio, item.horaFim, item.horaIntervaloInicial, item.horaIntervaloFinal)
    }));
  }

  // `clienteId` nunca vem de `query` (nunca é confiável vindo do cliente/HTTP),
  // é sempre passado explicitamente pelo chamador a partir do JWT (ver PortalClienteService).
  async search(
    query: SearchQuery,
    empresaId: number,
    clienteId?: number,
    profissionalScope?: number[] | null,
  ): Promise<{
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
      clienteId,
      profissionalScope,
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

  async findOne(id: number, empresaId?: number, profissionalScope?: number[] | null): Promise<Agendamento> {
    const where: any = { id };
    if (empresaId) where.empresaId = empresaId;

    const agendamento = await this.prisma.agendamento.findFirst({
      where,
      include: { contrato: true, profissional: true },
    });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
    if (profissionalScope && !profissionalScope.includes(agendamento.profissionalId as number)) {
      throw new ForbiddenException('Você não tem acesso a este agendamento.');
    }

    agendamento.duracaoMinutos = agendamento.duracaoMinutos || calculateDuration(agendamento.horaInicio, agendamento.horaFim, agendamento.horaIntervaloInicial, agendamento.horaIntervaloFinal);

    return agendamento;
  }

  async update(
    id: number,
    dto: UpdateAgendamentoDto,
    empresaId?: number,
    profissionalScope?: number[] | null,
  ): Promise<Agendamento> {
    const current = await this.findOne(id, empresaId, profissionalScope);

    const dataAgenda = dto.dataAgenda ? new Date(dto.dataAgenda) : current.dataAgenda;
    const horaInicio = dto.horaInicio || current.horaInicio;
    const horaFim = dto.horaFim || current.horaFim;
    const horaIntervaloInicial = dto.horaIntervaloInicial || current.horaIntervaloInicial;
    const horaIntervaloFinal = dto.horaIntervaloFinal || current.horaIntervaloFinal;

    const horarioInicial = composeDateTime(dataAgenda, horaInicio);
    const horarioFinal = composeDateTime(dataAgenda, horaFim);
    const duracaoMinutos = calculateDuration(horaInicio, horaFim, horaIntervaloInicial, horaIntervaloFinal);

    const contratoId = dto.contratoId !== undefined ? dto.contratoId : current.contratoId;
    const profissionalId = dto.profissionalId !== undefined ? dto.profissionalId : current.profissionalId;
    const bancoHorasTipo = dto.bancoHorasTipo || current.bancoHorasTipo || 'NORMAL';

    // Só Gerente/Administrador (profissionalScope null ou com mais de um profissional) pode
    // apontar atividade para outra pessoa; os demais só podem manter a atividade no próprio nome.
    if (profissionalScope && (!profissionalId || !profissionalScope.includes(profissionalId))) {
      throw new ForbiddenException('Você só pode lançar atividades para o seu próprio profissional.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Desfaz o movimento de banco de horas anterior (se houver) antes de reaplicar,
      // já que contrato/profissional/horas/tipo podem ter mudado na edição.
      await this.bancoHorasService.reverterMovimentoDoAgendamento(tx, id);

      const agendamento = await tx.agendamento.update({
        where: { id },
        data: {
          ...dto,
          dataAgenda: dto.dataAgenda ? new Date(dto.dataAgenda) : undefined,
          horarioInicial,
          horarioFinal,
          duracaoMinutos,
          bancoHorasTipo,
        },
      });

      if (contratoId && profissionalId && (bancoHorasTipo === 'CREDITO' || bancoHorasTipo === 'DEBITO')) {
        await this.bancoHorasService.aplicarAtividadeBancoHoras(tx, {
          contratoId,
          profissionalId,
          tipo: bancoHorasTipo,
          horas: duracaoMinutos / 60,
          data: dataAgenda,
          descricao: agendamento.descricao,
          agendamentoId: agendamento.id,
        });
      }

      return agendamento;
    });
  }

  async remove(id: number, empresaId?: number, profissionalScope?: number[] | null): Promise<Agendamento> {
    await this.findOne(id, empresaId, profissionalScope);
    return this.prisma.$transaction(async (tx) => {
      await this.bancoHorasService.reverterMovimentoDoAgendamento(tx, id);
      return tx.agendamento.delete({ where: { id } });
    });
  }

  async confirmar(id: number, empresaId: number, profissionalScope?: number[] | null): Promise<Agendamento> {
    return this.prisma.$transaction(async (tx) => {
      const agendamento = await tx.agendamento.findUnique({
        where: { id, empresaId } as any, // Temporary fix for Prisma types if composite unique is not defined properly
        include: { contrato: true, profissional: true },
      });
      if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
      if (profissionalScope && !profissionalScope.includes(agendamento.profissionalId as number)) {
        throw new ForbiddenException('Você não tem acesso a este agendamento.');
      }
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
      data: a.dataAgenda ? new Date(a.dataAgenda).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
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
          include: { escalas: true, adiantamentos: true }
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

    const baseMinutesPerContract: Record<string, number> = {};
    items.forEach((a: any) => {
      const duracaoMin = a.duracaoMinutos || calculateDuration(a.horaInicio, a.horaFim, a.horaIntervaloInicial, a.horaIntervaloFinal);
      if (a.local !== 'E') {
        const key = a.contrato?.id || 'SemContrato';
        baseMinutesPerContract[key] = (baseMinutesPerContract[key] || 0) + duracaoMin;
      }
    });

    const rows = items.map((a: any) => {
      const duracaoMin = a.duracaoMinutos || calculateDuration(a.horaInicio, a.horaFim, a.horaIntervaloInicial, a.horaIntervaloFinal);
      let horasDecimais = duracaoMin / 60;
      
      let valorHora = 0;
      if (a.contrato?.tipo === 'F' && a.contrato?.valorFixo) {
        const key = a.contrato?.id || 'SemContrato';
        const horasMes = (baseMinutesPerContract[key] || 0) / 60;
        if (horasMes > 0) {
          valorHora = Number(a.contrato.valorFixo) / horasMes;
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

      let bancoHorasFormatado = 'Normal';
      if (a.bancoHorasTipo === 'CREDITO') bancoHorasFormatado = 'Crédito';
      else if (a.bancoHorasTipo === 'DEBITO') bancoHorasFormatado = 'Débito';

      return {
        data: a.dataAgenda ? new Date(a.dataAgenda).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        contrato: a.contrato?.descricao || 'Sem Cliente',
        contratoObj: a.contrato,
        contratoId: a.contrato?.id,
        profissional: a.profissional?.nome || 'Sem Profissional',
        profissionalId: a.profissional?.id,
        status: statusFormatado,
        horasRealizadas: horasDecimais,
        valorHora: valorHora,
        valorTotal: valorTotal,
        observacao: stripHtml(a.observacao || ''),
        dataOrigem: a.dataAgenda,
        bancoHoras: bancoHorasFormatado
      };
    });

    const isAnalitico = filters.tipoExtrato === 'analitico';
    const isCalendario = filters.tipoExtrato === 'calendario';

    const ocultarValor = !!filters.ocultarValor;
    const exibirBancoHoras = !!filters.exibirBancoHoras;

    const saldoAnteriorMap = new Map<string, number>();
    if (exibirBancoHoras && !isCalendario) {
      const pares = new Map<string, { contratoId: number; profissionalId: number }>();
      items.forEach((a: any) => {
        if (a.contrato?.id && a.profissional?.id) {
          pares.set(`${a.contrato.id}_${a.profissional.id}`, { contratoId: a.contrato.id, profissionalId: a.profissional.id });
        }
      });

      let dataInicioPeriodo: Date | null = null;
      if (filters.dataInicial) {
        dataInicioPeriodo = new Date(filters.dataInicial);
        dataInicioPeriodo.setHours(0, 0, 0, 0);
      }

      for (const { contratoId, profissionalId } of pares.values()) {
        const contratoProfissional = await this.prisma.contratoProfissional.findUnique({
          where: { contratoId_profissionalId: { contratoId, profissionalId } },
        });
        if (!contratoProfissional) continue;

        const movimentosAnteriores = dataInicioPeriodo
          ? await this.prisma.bancoHorasMovimento.findMany({
              where: { contratoProfissionalId: contratoProfissional.id, data: { lt: dataInicioPeriodo } },
            })
          : [];

        const saldoAnterior = movimentosAnteriores.reduce(
          (acc, m) => acc + (m.tipo === 'CREDITO' ? Number(m.horas) : -Number(m.horas)),
          0,
        );

        saldoAnteriorMap.set(`${contratoId}_${profissionalId}`, saldoAnterior);
      }
    }

    if (format === 'xls') return this.buildXlsxExtrato(rows, isAnalitico, ocultarValor, exibirBancoHoras);
    if (isCalendario) return buildPdfCalendario(items, filters, getHorasPrevistasContrato);

    return this.buildPdfExtrato(rows, isAnalitico, ocultarValor, exibirBancoHoras, saldoAnteriorMap);
  }

  async generateTermoValidacao(filters: AgendamentoExportFilters): Promise<Buffer> {
    if (!filters.contratoId || !filters.profissionalId) {
      throw new HttpException('Informe o Contrato e o Analista para gerar o Termo de Validação.', HttpStatus.BAD_REQUEST);
    }

    const contrato = await this.prisma.contrato.findFirst({
      where: { id: filters.contratoId, ...(filters.empresaId ? { empresaId: filters.empresaId } : {}) },
      include: {
        cliente: true,
        profissionais: { where: { profissionalId: filters.profissionalId } },
      },
    });
    if (!contrato) throw new HttpException('Contrato não encontrado.', HttpStatus.NOT_FOUND);

    const profissional = await this.prisma.profissional.findUnique({ where: { id: filters.profissionalId } });
    if (!profissional) throw new HttpException('Analista não encontrado.', HttpStatus.NOT_FOUND);

    const contratoProfissional = contrato.profissionais[0];

    const baseWhere = this.buildWhereFromFilters(filters) as { AND?: object[] };
    const where = { AND: [...(baseWhere.AND || []), { tipo: { not: 'C' } }] };
    const agendamentos = await this.prisma.agendamento.findMany({
      where,
      orderBy: [{ dataAgenda: 'asc' }, { horaInicio: 'asc' }],
      take: 2000,
    });

    const itens = agendamentos.map((a) => {
      const duracaoMin = a.duracaoMinutos || calculateDuration(a.horaInicio, a.horaFim, a.horaIntervaloInicial, a.horaIntervaloFinal);
      return {
        data: a.dataAgenda ? new Date(a.dataAgenda).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
        tempo: this.formatMinutes(duracaoMin),
        observacao: stripHtml(a.observacao || ''),
      };
    });

    return buildPdfTermoValidacao({
      clienteNome: contrato.cliente?.nomeDocumento || contrato.cliente?.nome || '',
      codigoCliente: contrato.codigoCliente,
      segmento: contrato.segmento,
      unidadeTotvs: contrato.unidadeTotvs,
      nomeProjeto: contratoProfissional?.nomeProjeto,
      codigoProjeto: contratoProfissional?.codigoProjeto,
      profissionalNome: profissional.nome,
      coordenadorTotvs: contrato.coordenadorTotvs,
      coordenadorCliente: contrato.coordenadorCliente,
      dataGeracao: new Date(),
      itens,
    });
  }

  private async buildXlsxExtrato(rows: any[], isAnalitico: boolean, ocultarValor = false, exibirBancoHoras = false): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Extrato');
    
    const columns: Partial<ExcelJS.Column>[] = [
      { header: 'Data', key: 'data', width: 14 },
      { header: 'Contrato', key: 'contrato', width: 25 },
      { header: 'Profissional', key: 'profissional', width: 25 },
      { header: 'Tipo', key: 'status', width: 15 },
      { header: 'Horas Cobradas', key: 'horasRealizadas', width: 15 },
    ];

    if (!ocultarValor) {
      columns.push(
        { header: 'Valor Hora', key: 'valorHora', width: 15 },
        { header: 'Total (R$)', key: 'valorTotal', width: 15 },
      );
    }

    if (exibirBancoHoras) {
      columns.push({ header: 'Banco de Horas', key: 'bancoHoras', width: 15 });
    }

    if (isAnalitico) {
      columns.push({ header: 'Observações', key: 'observacao', width: 50 });
    }

    sheet.columns = columns;
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

    const totais: Record<string, any> = {
      data: 'TOTAIS',
      contrato: '',
      profissional: '',
      status: '',
      horasRealizadas: totalHoras.toFixed(2),
    };
    if (!ocultarValor) {
      totais.valorHora = '';
      totais.valorTotal = totalFinanceiro;
    }
    const totalRow = sheet.addRow(totais);
    totalRow.font = { bold: true };
    sheet.getRow(1).font = { bold: true };

    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(arrayBuffer);
  }

  private buildPdfExtrato(
    rows: any[],
    isAnalitico: boolean,
    ocultarValor = false,
    exibirBancoHoras = false,
    saldoAnteriorMap: Map<string, number> = new Map(),
  ): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'portrait' });
      const chunks: Buffer[] = [];
      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      const formatCurrency = (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const formatNumber = (val: number) => val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      doc.fontSize(16).font('Helvetica-Bold').text(isAnalitico ? 'Extrato de Horas - Analítico' : 'Extrato de Horas', { align: 'center' });
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

      const colWidths = isAnalitico
        ? (exibirBancoHoras ? [250, 70, 70, 70, 70] : [290, 80, 80, 80])
        : (exibirBancoHoras ? [100, 100, 90, 90] : [120, 120, 120]);
      const startX = 30;
      const rowWidth = isAnalitico ? 530 : (exibirBancoHoras ? 380 : 360);

      for (const contrato of Object.keys(grouped)) {
        // Find valorHora from the first available row
        let valorHora = 0;
        const firstProf = Object.keys(grouped[contrato])[0];
        if (firstProf && grouped[contrato][firstProf].length > 0) {
          valorHora = grouped[contrato][firstProf][0].valorHora;
        }

        doc.fontSize(12).font('Helvetica-Bold').fillColor('#333333');
        if (ocultarValor) {
          doc.text(`Cliente: ${contrato}`);
        } else {
          doc.text(`Cliente: ${contrato}`, startX, doc.y, { continued: true });
          doc.fillColor('#555555').font('Helvetica').text(`    Valor Hora: ${formatCurrency(valorHora)}`);
        }
        doc.moveDown(0.5);

        for (const profissional of Object.keys(grouped[contrato])) {
          doc.fontSize(11).font('Helvetica-Bold').fillColor('#555555').text(`Profissional: ${profissional}`, startX + 10);
          doc.moveDown(0.5);

          // Header da tabela
          let y = doc.y;
          doc.rect(startX + 10, y, rowWidth, 15).fill('#e0e0e0');
          doc.fillColor('#000000').font('Helvetica-Bold').fontSize(9);
          
          if (isAnalitico) {
            doc.text('Observações', startX + 15, y + 3, { width: colWidths[0], align: 'left' });
            doc.text('Data', startX + 15 + colWidths[0], y + 3, { width: colWidths[1], align: 'left' });
            doc.text('Tipo', startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'left' });
            if (exibirBancoHoras) {
              doc.text('Banco de Horas', startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'left' });
              doc.text('Horas', startX + 15 + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y + 3, { width: colWidths[4], align: 'right' });
            } else {
              doc.text('Horas', startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'right' });
            }
          } else {
            doc.text('Data', startX + 15, y + 3, { width: colWidths[0], align: 'left' });
            doc.text('Tipo', startX + 15 + colWidths[0], y + 3, { width: colWidths[1], align: 'left' });
            if (exibirBancoHoras) {
              doc.text('Banco de Horas', startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'left' });
              doc.text('Horas', startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'right' });
            } else {
              doc.text('Horas', startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'right' });
            }
          }
          
          doc.y = y + 15;
          let zebra = false;

          let minNormal = 0;
          let minExtra = 0;
          let minFalta = 0;
          let minCredito = 0;
          let minDebito = 0;

          grouped[contrato][profissional].forEach(r => {
            doc.font('Helvetica').fontSize(9);
            
            // Calculate dynamic row height based on observacao if analitico
            let rowHeight = 15;
            if (isAnalitico && r.observacao) {
              const textHeight = doc.heightOfString(r.observacao, { width: colWidths[0] });
              rowHeight = Math.max(15, textHeight + 6);
            }
            
            y = doc.y;
            if (y + rowHeight > 750) {
              doc.addPage();
              y = doc.y;
            }

            if (zebra) {
              doc.rect(startX + 10, y, rowWidth, rowHeight).fill('#f9f9f9');
            }
            zebra = !zebra;

            let textColor = '#333333';
            if (r.status === 'Falta') {
              textColor = '#FF0000';
              minFalta += (r.horasRealizadas * 60);
            } else if (r.status === 'Extra') {
              textColor = '#0000FF';
              minExtra += (r.horasRealizadas * 60);
            } else {
              minNormal += (r.horasRealizadas * 60);
            }

            if (exibirBancoHoras) {
              if (r.bancoHoras === 'Crédito') minCredito += (r.horasRealizadas * 60);
              else if (r.bancoHoras === 'Débito') minDebito += (r.horasRealizadas * 60);
            }

            doc.fillColor(textColor);
            
            if (isAnalitico) {
              doc.text(r.observacao || '', startX + 15, y + 3, { width: colWidths[0], align: 'left' });
              doc.text(r.data, startX + 15 + colWidths[0], y + 3, { width: colWidths[1], align: 'left' });
              doc.text(r.status, startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'left' });
              if (exibirBancoHoras) {
                doc.text(r.bancoHoras, startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'left' });
                doc.text(formatNumber(r.horasRealizadas), startX + 15 + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y + 3, { width: colWidths[4], align: 'right' });
              } else {
                doc.text(formatNumber(r.horasRealizadas), startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'right' });
              }
            } else {
              doc.text(r.data, startX + 15, y + 3, { width: colWidths[0], align: 'left' });
              doc.text(r.status, startX + 15 + colWidths[0], y + 3, { width: colWidths[1], align: 'left' });
              if (exibirBancoHoras) {
                doc.text(r.bancoHoras, startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'left' });
                doc.text(formatNumber(r.horasRealizadas), startX + 15 + colWidths[0] + colWidths[1] + colWidths[2], y + 3, { width: colWidths[3], align: 'right' });
              } else {
                doc.text(formatNumber(r.horasRealizadas), startX + 15 + colWidths[0] + colWidths[1], y + 3, { width: colWidths[2], align: 'right' });
              }
            }
            
            doc.y = y + rowHeight;
          });

          // Draw the totals blocks
          if (doc.y > 680) doc.addPage();
          doc.moveDown(1);
          
          // Redesign the totals matching user layout
          let hrNormal = minNormal / 60;
          let hrExtra = minExtra / 60;
          let hrFalta = minFalta / 60; // negative
          let hrBase = hrNormal + Math.abs(hrFalta);
          let hrCredito = minCredito / 60;
          let hrDebito = minDebito / 60;

          let valBase = hrBase * valorHora;
          let valExtra = hrExtra * valorHora;
          let valFalta = Math.abs(hrFalta) * valorHora;
          
          const formatHoursClock = (hoursDec: number) => {
            const isNeg = hoursDec < 0;
            const absHours = Math.abs(hoursDec);
            const h = Math.floor(absHours);
            const m = Math.round((absHours - h) * 60);
            return `${isNeg ? '-' : ''}${h}:${m.toString().padStart(2, '0')}:00`;
          };

          // Find active Adiantamento
          let adiantamentoLabel = '';
          let adiantamentoVal = 0;
          
          const primeiraLinha = grouped[contrato][profissional][0];

          const saldoAnteriorBH = exibirBancoHoras
            ? (saldoAnteriorMap.get(`${primeiraLinha?.contratoId}_${primeiraLinha?.profissionalId}`) || 0)
            : 0;
          const saldoFinalBH = saldoAnteriorBH + hrCredito - hrDebito;

          if (primeiraLinha?.contratoObj?.adiantamentos?.length) {
            const dataExtrato = primeiraLinha.dataOrigem ? new Date(primeiraLinha.dataOrigem) : new Date();
            const extratoYear = dataExtrato.getFullYear();
            const extratoMonth = dataExtrato.getMonth();

            for (const adiantamento of primeiraLinha.contratoObj.adiantamentos) {
              const dtInicio = new Date(adiantamento.dataInicio);
              const iniYear = dtInicio.getFullYear();
              const iniMonth = dtInicio.getMonth();
              
              const monthsDiff = (extratoYear - iniYear) * 12 + (extratoMonth - iniMonth);
              const currentParcela = monthsDiff + 1; // 1-based index
              
              if (currentParcela >= 1 && currentParcela <= adiantamento.parcelas) {
                adiantamentoLabel = `Adi ${currentParcela}/${adiantamento.parcelas}`;
                adiantamentoVal = Number(adiantamento.valorParcela);
                break; // Only pick the first active one for now
              }
            }
          }

          let totalExecutado = hrNormal + hrExtra + hrFalta;
          let totalFinal = valBase + valExtra - valFalta - adiantamentoVal;

          let boxX = 350;
          let boxY = doc.y;
          const resumoStartY = boxY;

          // Cabeçalho Resumo
          doc.lineWidth(1).strokeColor('#000000');
          doc.moveTo(boxX, boxY).lineTo(boxX + 180, boxY).stroke();
          doc.fillColor('#000000').font('Helvetica-Bold');
          doc.text('Resumo', boxX + 5, boxY + 4, { width: 170, align: 'center' });
          boxY += 17;
          doc.moveTo(boxX, boxY).lineTo(boxX + 180, boxY).stroke();

          let zebraRow = 0;
          const drawRow = (lbl: string, val: string, lblColor: string, valColor: string) => {
            if (zebraRow % 2 === 0) {
              doc.rect(boxX, boxY, 180, 15).fill('#F0F0F0');
            }
            zebraRow++;
            
            doc.fillColor(lblColor).font('Helvetica-Bold');
            doc.text(lbl, boxX + 5, boxY + 4, { width: 85, align: 'left' });
            
            doc.fillColor(valColor).font('Helvetica');
            doc.text(val, boxX + 90, boxY + 4, { width: 85, align: 'right' });
            
            boxY += 15;
          };

          // Table Data
          drawRow('Horas Mês', formatHoursClock(hrBase), '#000000', '#000000');
          if (!ocultarValor) {
            drawRow('Vlr Hora', formatNumber(valorHora), '#000000', '#000000');
          }

          if (hrExtra > 0) {
            drawRow('Horas Ext', formatHoursClock(hrExtra), '#4285F4', '#4285F4'); // Blue
          }
          if (hrFalta !== 0) {
            drawRow('Hrs Falta', formatHoursClock(Math.abs(hrFalta)), '#EA4335', '#EA4335'); // Red
          }

          if (!ocultarValor) {
            drawRow('Valor Base', formatNumber(valBase), '#000000', '#000000');

            if (valExtra > 0) {
              drawRow('Extras', formatNumber(valExtra), '#4285F4', '#4285F4');
            }
            if (valFalta > 0) {
              drawRow('Falta', formatNumber(valFalta), '#EA4335', '#EA4335');
            }
            if (adiantamentoVal > 0) {
              drawRow(adiantamentoLabel || 'Adiantamento', formatNumber(adiantamentoVal), '#EA4335', '#EA4335');
            }
            drawRow('Valor Total', formatNumber(totalFinal), '#000000', '#000000');
          }
          
          // Linha final inferior
          doc.moveTo(boxX, boxY).lineTo(boxX + 180, boxY).stroke();

          // Resumo separado do Banco de Horas
          let boxY2 = resumoStartY;
          if (exibirBancoHoras && (saldoAnteriorBH !== 0 || hrCredito !== 0 || hrDebito !== 0)) {
            const boxX2 = 150;

            doc.lineWidth(1).strokeColor('#000000');
            doc.moveTo(boxX2, boxY2).lineTo(boxX2 + 180, boxY2).stroke();
            doc.fillColor('#000000').font('Helvetica-Bold');
            doc.text('Banco de Horas', boxX2 + 5, boxY2 + 4, { width: 170, align: 'center' });
            boxY2 += 17;
            doc.moveTo(boxX2, boxY2).lineTo(boxX2 + 180, boxY2).stroke();

            let zebraRow2 = 0;
            const drawRow2 = (lbl: string, val: string, lblColor: string, valColor: string) => {
              if (zebraRow2 % 2 === 0) {
                doc.rect(boxX2, boxY2, 180, 15).fill('#F0F0F0');
              }
              zebraRow2++;

              doc.fillColor(lblColor).font('Helvetica-Bold');
              doc.text(lbl, boxX2 + 5, boxY2 + 4, { width: 85, align: 'left' });

              doc.fillColor(valColor).font('Helvetica');
              doc.text(val, boxX2 + 90, boxY2 + 4, { width: 85, align: 'right' });

              boxY2 += 15;
            };

            drawRow2('Saldo Ant.', formatHoursClock(saldoAnteriorBH), '#000000', '#000000');
            if (hrCredito !== 0) {
              drawRow2('Créd. BH', formatHoursClock(hrCredito), '#0F9D58', '#0F9D58'); // Green
            }
            if (hrDebito !== 0) {
              drawRow2('Déb. BH', formatHoursClock(hrDebito), '#EA4335', '#EA4335'); // Red
            }
            drawRow2('Saldo Final', formatHoursClock(saldoFinalBH), '#000000', '#000000');

            doc.moveTo(boxX2, boxY2).lineTo(boxX2 + 180, boxY2).stroke();
          }

          doc.y = Math.max(boxY, boxY2) + 30;

          totalGeralHoras += totalExecutado;
          totalGeralFinanceiro += totalFinal;
        }
        doc.moveDown(1);
      }

      doc.end();
    });
  }
}
