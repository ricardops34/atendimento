import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AgendamentosService', () => {
  let service: AgendamentosService;
  let prisma: {
    contrato: { findUnique: jest.Mock };
    agendamento: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      contrato: { findUnique: jest.fn() },
      agendamento: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendamentosService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(AgendamentosService);
  });

  it('inherits contract description and color on create', async () => {
    prisma.contrato.findUnique.mockResolvedValue({
      id: 10,
      descricao: 'Contrato Base',
      cor: '#112233',
    });
    prisma.agendamento.create.mockImplementation(({ data }) => Promise.resolve(data));

    const result = await service.create({
      contratoId: 10,
      profissionalId: 2,
      dataAgenda: '2026-06-17',
      horaInicio: '08:00',
      horaFim: '10:00',
      horaIntervaloInicial: '00:00',
      horaIntervaloFinal: '00:00',
      local: 'P',
    } as any);

    expect(prisma.contrato.findUnique).toHaveBeenCalledWith({ where: { id: 10 } });
    expect(result.descricao).toBe('Contrato Base');
    expect(result.cor).toBe('#112233');
    expect(result.duracaoMinutos).toBe(120);
  });

  it('blocks update for non-agendado entries', async () => {
    prisma.agendamento.findUnique.mockResolvedValue({
      id: 1,
      tipo: 'R',
      dataAgenda: new Date('2026-06-17'),
      horaInicio: '08:00',
      horaFim: '09:00',
      horaIntervaloInicial: '00:00',
      horaIntervaloFinal: '00:00',
      contrato: null,
      profissional: null,
    });

    await expect(service.update(1, { observacao: 'teste' } as any)).rejects.toBeInstanceOf(HttpException);
    expect(prisma.agendamento.update).not.toHaveBeenCalled();
  });
});
