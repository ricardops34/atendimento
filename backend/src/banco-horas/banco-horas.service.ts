import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LancarDebitoDto } from './dto/lancar-debito.dto';

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

  async extrato(contratoProfissionalId: number, empresaId: number, profissionalScope?: number[] | null) {
    await this.findOne(contratoProfissionalId, empresaId, profissionalScope);
    return this.prisma.bancoHorasMovimento.findMany({
      where: { contratoProfissionalId },
      orderBy: { data: 'desc' },
    });
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
