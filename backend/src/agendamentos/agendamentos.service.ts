// @ts-nocheck
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { composeDateTime, calculateDuration } from './agendamentos.utils';

@Injectable()
export class AgendamentosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAgendamentoDto) {
    let cor = dto.cor;
    let descricao = dto.descricao;

    // BR-MIGRAR-004: Herança de Propriedades de Contrato no Agendamento
    if (dto.contratoId && (!cor || !descricao)) {
      const contrato = await this.prisma.contrato.findUnique({ where: { id: dto.contratoId } });
      if (contrato) {
        if (!cor) cor = contrato.cor;
        if (!descricao) descricao = contrato.descricao;
      }
    }

    // BR-MIGRAR-001 e BR-MIGRAR-002: Lógicas de tempo e duração
    const horarioInicial = composeDateTime(dto.dataAgenda, dto.horaInicio);
    const horarioFinal = composeDateTime(dto.dataAgenda, dto.horaFim);
    const duracaoMinutos = calculateDuration(
      dto.horaInicio,
      dto.horaFim,
      dto.horaIntervaloInicial || '00:00',
      dto.horaIntervaloFinal || '00:00'
    );

    return this.prisma.agendamento.create({
      data: {
        contratoId: dto.contratoId,
        profissionalId: dto.profissionalId,
        descricao: descricao || 'Agendamento sem descrição',
        dataAgenda: new Date(dto.dataAgenda),
        horaInicio: dto.horaInicio,
        horaFim: dto.horaFim,
        horaIntervaloInicial: dto.horaIntervaloInicial || '00:00',
        horaIntervaloFinal: dto.horaIntervaloFinal || '00:00',
        duracaoMinutos,
        horarioInicial,
        horarioFinal,
        local: dto.local || 'P', // BR-MIGRAR-005
        tipo: dto.tipo || 'A',   // BR-MIGRAR-005
        cor: cor || '#333333',
        observacao: dto.observacao,
      },
    });
  }

  findAll() {
    return this.prisma.agendamento.findMany({
      include: { contrato: true, profissional: true },
    });
  }

  async findOne(id: number) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
      include: { contrato: true, profissional: true },
    });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado.');
    return agendamento;
  }

  async update(id: number, dto: UpdateAgendamentoDto) {
    const current = await this.findOne(id);

    // BR-MIGRAR-003: Validação de Mudança de Status (Imutabilidade)
    if (current.tipo !== 'A' && dto.tipo !== 'A' && dto.tipo !== current.tipo) {
       // Se o tipo atual não é 'A', não pode ser alterado a não ser que não esteja mudando
       // Mas na verdade a regra diz "Apenas agendamentos com status atual igual a A podem sofrer alterações"
       throw new HttpException('Agendamentos finalizados ou cancelados não podem ser editados.', HttpStatus.FORBIDDEN);
    }
    if (current.tipo !== 'A' && Object.keys(dto).length > 0) {
        // Se já está finalizado, rejeita edição de qualquer dado
        throw new HttpException('Agendamentos finalizados ou cancelados não podem ser editados.', HttpStatus.FORBIDDEN);
    }

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

  async remove(id: number) {
    const current = await this.findOne(id);
    if (current.tipo !== 'A') {
      throw new HttpException('Apenas agendamentos com status "Agendado" podem ser excluídos.', HttpStatus.FORBIDDEN);
    }
    return this.prisma.agendamento.delete({ where: { id } });
  }
}
