import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { RealizadosService } from './realizados.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RealizadosService', () => {
  let service: RealizadosService;
  let prisma: {
    agendamento: {
      findMany: jest.Mock;
      update: jest.Mock;
    };
    realizado: {
      create: jest.Mock;
      findMany: jest.Mock;
    };
    $transaction: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      agendamento: {
        findMany: jest.fn(),
        update: jest.fn().mockResolvedValue(undefined),
      },
      realizado: {
        create: jest.fn().mockResolvedValue(undefined),
        findMany: jest.fn(),
      },
      $transaction: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RealizadosService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(RealizadosService);
  });

  it('fails when no pending appointments are found', async () => {
    prisma.agendamento.findMany.mockResolvedValue([]);

    await expect(service.fecharLote({ agendamentoIds: [1, 2] })).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('closes pending appointments in a transaction', async () => {
    prisma.agendamento.findMany.mockResolvedValue([
      { id: 1, duracaoMinutos: 90, tipo: 'A' },
    ]);
    prisma.agendamento.update.mockReturnValue(Promise.resolve({ id: 1, tipo: 'R' }));
    prisma.realizado.create.mockReturnValue(Promise.resolve({ id: 1, agendamentoId: 1 }));

    const result = await service.fecharLote({ agendamentoIds: [1] });

    expect(prisma.$transaction).toHaveBeenCalled();
    expect(result.registrosProcessados).toBe(1);
  });
});
