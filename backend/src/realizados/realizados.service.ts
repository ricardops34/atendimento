// @ts-nocheck
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FecharLoteDto } from './dto/fechar-lote.dto';

@Injectable()
export class RealizadosService {
  constructor(private prisma: PrismaService) {}

  async fecharLote(dto: FecharLoteDto) {
    // BR-MIGRAR-008: Fechamento de Apontamentos em Lote
    
    // 1. Busca os agendamentos pendentes
    const agendamentos = await this.prisma.agendamento.findMany({
      where: {
        id: { in: dto.agendamentoIds },
        tipo: 'A', // Só permite fechar os que estão Agendados
      },
    });

    if (agendamentos.length === 0) {
      throw new BadRequestException('Nenhum agendamento pendente encontrado para os IDs fornecidos.');
    }

    const updates = [];
    const inserts = [];

    for (const agendamento of agendamentos) {
      // Calcula as horas decimais líquidas (duracao / 60)
      const horasDecimais = +(agendamento.duracaoMinutos / 60).toFixed(2);

      // Prepara a transação
      updates.push(
        this.prisma.agendamento.update({
          where: { id: agendamento.id },
          data: { tipo: 'R' } as any, // Muda para Realizada
        })
      );

      inserts.push(
        this.prisma.realizado.create({
          data: {
            agendamentoId: agendamento.id,
            horasDecimais,
          },
        })
      );
    }

    // Executa tudo dentro de uma transação atômica
    await this.prisma.$transaction([...updates, ...inserts]);

    return {
      message: 'Fechamento concluído com sucesso.',
      registrosProcessados: agendamentos.length,
    };
  }

  findAll() {
    return this.prisma.realizado.findMany({
      include: { agendamento: true },
    });
  }
}
