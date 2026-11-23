import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LancarDebitoDto } from './dto/lancar-debito.dto';
import { buildPdfExtratoBancoHoras, buildXlsxExtratoBancoHoras } from './build-extrato-banco-horas';

type TxClient = Prisma.TransactionClient;

interface AplicarHorasParams {
  contratoId: number;
  profissionalId: number;
  dataAgenda: Date;
  horasAdicionais: number;
}

interface BancoHorasSearchQuery {
  contratoId?: string;
  profissionalId?: string;
  search?: string;
}

@Injectable()
export class BancoHorasService {
  constructor(private prisma: PrismaService) {}

  private competenciaDe(data: Date): string {
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
  }

  /**
   * Verifica o limite de horas/mês do profissional no contrato e aplica o modo configurado
   * quando ultrapassado: acumula o excedente no banco de horas (BANCO) ou impede o lançamento
   * (BLOQUEIO). Deve rodar dentro da mesma transação do agendamento/apontamento que a originou,
   * para que um rollback do lançamento desfaça também a contagem de horas.
   * Sem maxHorasMes configurado (ou sem profissional habilitado para o contrato), não faz nada.
   */
  async aplicarHorasENotificarExcedente(tx: TxClient, params: AplicarHorasParams): Promise<void> {
    const { contratoId, profissionalId, dataAgenda, horasAdicionais } = params;
    if (!contratoId || !profissionalId || !horasAdicionais) return;

    const contratoProfissional = await tx.contratoProfissional.findUnique({
      where: { contratoId_profissionalId: { contratoId, profissionalId } },
    });
    if (!contratoProfissional || contratoProfissional.maxHorasMes === null) return;

    const maxHorasMes = Number(contratoProfissional.maxHorasMes);
    const competencia = this.competenciaDe(dataAgenda);

    const apontamento = await tx.contratoProfissionalApontamentoMensal.findUnique({
      where: {
        contratoProfissionalId_competencia: {
          contratoProfissionalId: contratoProfissional.id,
          competencia,
        },
      },
    });
    const horasLancadasAtuais = apontamento ? Number(apontamento.horasLancadas) : 0;
    const excedenteAtual = apontamento ? Number(apontamento.horasExcedente) : 0;
    const novoTotal = horasLancadasAtuais + horasAdicionais;
    const novoExcedente = Math.max(0, novoTotal - maxHorasMes);
    const incrementoExcedente = novoExcedente - excedenteAtual;

    if (incrementoExcedente > 0 && contratoProfissional.modoExcedente === 'BLOQUEIO') {
      throw new ConflictException(
        `Limite de ${maxHorasMes}h/mês atingido para este profissional neste contrato em ${competencia}. ` +
          'Não é possível lançar mais horas (modo bloquear excedente).',
      );
    }

    await tx.contratoProfissionalApontamentoMensal.upsert({
      where: {
        contratoProfissionalId_competencia: {
          contratoProfissionalId: contratoProfissional.id,
          competencia,
        },
      },
      create: {
        contratoProfissionalId: contratoProfissional.id,
        competencia,
        horasLancadas: novoTotal,
        horasExcedente: novoExcedente,
      },
      update: {
        horasLancadas: novoTotal,
        horasExcedente: novoExcedente,
      },
    });

    if (incrementoExcedente > 0 && contratoProfissional.modoExcedente === 'BANCO') {
      await tx.contratoProfissional.update({
        where: { id: contratoProfissional.id },
        data: { saldoBancoHoras: { increment: incrementoExcedente } },
      });
      await tx.bancoHorasMovimento.create({
        data: {
          contratoProfissionalId: contratoProfissional.id,
          tipo: 'CREDITO',
          horas: incrementoExcedente,
          data: dataAgenda,
          descricao: `Excedente de horas em ${competencia}`,
        },
      });
    }
  }

  async search(query: BancoHorasSearchQuery, empresaId: number, profissionalScope?: number[] | null) {
    const where: any = { contrato: { empresaId } };
    if (query.contratoId) where.contratoId = Number(query.contratoId);
    if (query.profissionalId) where.profissionalId = Number(query.profissionalId);
    if (profissionalScope) {
      if (where.profissionalId !== undefined) {
        if (!profissionalScope.includes(where.profissionalId)) where.profissionalId = -1;
      } else {
        where.profissionalId = { in: profissionalScope };
      }
    }
    if (query.search?.trim()) {
      const search = query.search.trim();
      where.OR = [
        { profissional: { nome: { contains: search, mode: 'insensitive' } } },
        { contrato: { descricao: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const items = await this.prisma.contratoProfissional.findMany({
      where,
      include: { contrato: true, profissional: true },
      orderBy: [{ contrato: { descricao: 'asc' } }, { profissional: { nome: 'asc' } }],
    });

    const mappedItems = items.map((i) => ({
      id: i.id,
      contratoId: i.contratoId,
      contratoDescricao: i.contrato.descricao,
      profissionalId: i.profissionalId,
      profissionalNome: i.profissional.nome,
      maxHorasMes: i.maxHorasMes,
      modoExcedente: i.modoExcedente,
      saldoBancoHoras: i.saldoBancoHoras,
    }));

    return { items: mappedItems, page: 1, pageSize: mappedItems.length, total: mappedItems.length, hasNext: false };
  }

  async findOne(id: number, empresaId: number, profissionalScope?: number[] | null) {
    const contratoProfissional = await this.prisma.contratoProfissional.findFirst({
      where: { id, contrato: { empresaId } },
      include: { contrato: true, profissional: true },
    });
    if (!contratoProfissional) {
      throw new NotFoundException('Registro de profissional habilitado não encontrado.');
    }
    if (profissionalScope && !profissionalScope.includes(contratoProfissional.profissionalId)) {
      throw new ForbiddenException('Você não tem acesso a este registro de banco de horas.');
    }
    return contratoProfissional;
  }

  /**
   * Extrato do banco de horas no período: saldo anterior (movimentos antes de dataInicial),
   * movimentos em ordem cronológica com saldo acumulado, totais de créditos/débitos e saldo final.
   * Sem período, cobre todo o histórico (saldo anterior = 0).
   */
  async extrato(
    contratoProfissionalId: number,
    empresaId: number,
    profissionalScope?: number[] | null,
    periodo: { dataInicial?: string; dataFinal?: string } = {},
  ) {
    const registro = await this.findOne(contratoProfissionalId, empresaId, profissionalScope);
    const dataInicial = this.parseData(periodo.dataInicial);
    const dataFinal = this.parseData(periodo.dataFinal);

    const efeito = (m: { tipo: string; horas: Prisma.Decimal | number }) =>
      m.tipo === 'CREDITO' ? Number(m.horas) : -Number(m.horas);

    let saldoAnterior = 0;
    if (dataInicial) {
      const anteriores = await this.prisma.bancoHorasMovimento.groupBy({
        by: ['tipo'],
        where: { contratoProfissionalId, data: { lt: dataInicial } },
        _sum: { horas: true },
      });
      saldoAnterior = anteriores.reduce((acc, g) => acc + efeito({ tipo: g.tipo, horas: g._sum.horas ?? 0 }), 0);
    }

    const dataFilter: Prisma.DateTimeFilter = {};
    if (dataInicial) dataFilter.gte = dataInicial;
    if (dataFinal) dataFilter.lte = dataFinal;

    const movimentos = await this.prisma.bancoHorasMovimento.findMany({
      where: { contratoProfissionalId, ...(dataInicial || dataFinal ? { data: dataFilter } : {}) },
      orderBy: [{ data: 'asc' }, { id: 'asc' }],
    });

    // Valor da hora: o do profissional neste contrato sobrepõe o do contrato.
    const valorHora = Number(registro.valorHora ?? (registro.contrato as any)?.valorHora ?? 0);
    const valor = (h: number) => this.round(h * valorHora);

    let saldo = saldoAnterior;
    let totalCreditos = 0;
    let totalDebitos = 0;
    const linhas = movimentos.map((m) => {
      const horas = Number(m.horas);
      const credito = m.tipo === 'CREDITO' ? horas : 0;
      const debito = m.tipo === 'DEBITO' ? horas : 0;
      totalCreditos += credito;
      totalDebitos += debito;
      saldo += credito - debito;
      return {
        id: m.id,
        data: m.data,
        tipo: m.tipo,
        descricao: m.descricao,
        agendamentoId: m.agendamentoId,
        credito: this.round(credito),
        debito: this.round(debito),
        saldo: this.round(saldo),
        valorCredito: valor(credito),
        valorDebito: valor(debito),
        valorSaldo: valor(saldo),
      };
    });

    return {
      contratoProfissionalId,
      contrato: registro.contrato?.descricao,
      profissional: registro.profissional?.nome,
      dataInicial: periodo.dataInicial || null,
      dataFinal: periodo.dataFinal || null,
      valorHora: this.round(valorHora),
      saldoAnterior: this.round(saldoAnterior),
      totalCreditos: this.round(totalCreditos),
      totalDebitos: this.round(totalDebitos),
      saldoFinal: this.round(saldo),
      valorSaldoAnterior: valor(saldoAnterior),
      valorTotalCreditos: valor(totalCreditos),
      valorTotalDebitos: valor(totalDebitos),
      valorSaldoFinal: valor(saldo),
      saldoAtual: this.round(Number(registro.saldoBancoHoras)),
      movimentos: linhas,
    };
  }

  async exportarExtrato(
    contratoProfissionalId: number,
    empresaId: number,
    profissionalScope: number[] | null | undefined,
    periodo: { dataInicial?: string; dataFinal?: string },
    format: 'pdf' | 'xls',
    ocultarValor: boolean,
  ): Promise<Buffer> {
    const ext = await this.extrato(contratoProfissionalId, empresaId, profissionalScope, periodo);
    return format === 'xls'
      ? buildXlsxExtratoBancoHoras(ext, ocultarValor)
      : buildPdfExtratoBancoHoras(ext, ocultarValor);
  }

  private parseData(value?: string): Date | undefined {
    if (!value) return undefined;
    const d = new Date(value.length === 10 ? `${value}T00:00:00.000Z` : value);
    return isNaN(d.getTime()) ? undefined : d;
  }

  private round(v: number): number {
    return Math.round(v * 100) / 100;
  }

  /**
   * Aplica um lançamento manual de banco de horas (CREDITO = hora extra apontada,
   * DEBITO = hora executada usando o saldo) originado de um agendamento. Deve rodar
   * dentro da mesma transação do agendamento, para que um rollback desfaça também
   * a movimentação do saldo.
   */
  async aplicarAtividadeBancoHoras(
    tx: TxClient,
    params: {
      contratoId: number;
      profissionalId: number;
      tipo: 'CREDITO' | 'DEBITO';
      horas: number;
      data: Date;
      descricao?: string;
      agendamentoId?: number;
    },
  ): Promise<void> {
    const { contratoId, profissionalId, tipo, horas, data, descricao, agendamentoId } = params;
    if (!horas) return;

    const contratoProfissional = await tx.contratoProfissional.findUnique({
      where: { contratoId_profissionalId: { contratoId, profissionalId } },
    });
    if (!contratoProfissional) {
      throw new NotFoundException(
        'Este profissional não está habilitado neste contrato (cadastre-o em Profissionais Habilitados antes de lançar banco de horas).',
      );
    }

    if (tipo === 'DEBITO') {
      const saldoAtual = Number(contratoProfissional.saldoBancoHoras);
      if (horas > saldoAtual) {
        throw new ConflictException(
          `Saldo insuficiente de banco de horas: o profissional tem ${saldoAtual}h disponíveis neste contrato.`,
        );
      }
    }

    await tx.contratoProfissional.update({
      where: { id: contratoProfissional.id },
      data: { saldoBancoHoras: { [tipo === 'CREDITO' ? 'increment' : 'decrement']: horas } },
    });
    await tx.bancoHorasMovimento.create({
      data: {
        contratoProfissionalId: contratoProfissional.id,
        tipo,
        horas,
        data,
        descricao,
        agendamentoId,
      },
    });
  }

  /** Desfaz (e remove) o movimento de banco de horas gerado por um agendamento, se houver. */
  async reverterMovimentoDoAgendamento(tx: TxClient, agendamentoId: number): Promise<void> {
    const movimento = await tx.bancoHorasMovimento.findFirst({ where: { agendamentoId } });
    if (!movimento) return;

    const delta = movimento.tipo === 'CREDITO' ? -Number(movimento.horas) : Number(movimento.horas);
    await tx.contratoProfissional.update({
      where: { id: movimento.contratoProfissionalId },
      data: { saldoBancoHoras: { increment: delta } },
    });
    await tx.bancoHorasMovimento.delete({ where: { id: movimento.id } });
  }

  async lancarDebito(
    contratoProfissionalId: number,
    dto: LancarDebitoDto,
    empresaId: number,
    profissionalScope?: number[] | null,
  ) {
    const contratoProfissional = await this.findOne(contratoProfissionalId, empresaId, profissionalScope);
    const saldoAtual = Number(contratoProfissional.saldoBancoHoras);
    if (dto.horas > saldoAtual) {
      throw new ConflictException(
        `Saldo insuficiente: o profissional tem ${saldoAtual}h disponíveis no banco de horas.`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.contratoProfissional.update({
        where: { id: contratoProfissionalId },
        data: { saldoBancoHoras: { decrement: dto.horas } },
      });
      return tx.bancoHorasMovimento.create({
        data: {
          contratoProfissionalId,
          tipo: 'DEBITO',
          horas: dto.horas,
          data: new Date(dto.data),
          descricao: dto.descricao,
        },
      });
    });
  }
}
