import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

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
      count: jest.Mock;
    };
    $transaction: jest.Mock;
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
        count: jest.fn(),
      },
      $transaction: jest.fn((fn: (tx: any) => any) => fn(prisma)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendamentosService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(AgendamentosService);
  });

  const expectedStartDate = new Date('2026-06-01');
  expectedStartDate.setHours(0, 0, 0, 0);

  const expectedEndDate = new Date('2026-06-30');
  expectedEndDate.setHours(23, 59, 59, 999);

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

  it('confirmar transitions status A to R', async () => {
    const agendamento = { id: 5, tipo: 'A', empresaId: 1 };
    prisma.agendamento.findUnique.mockResolvedValue(agendamento);
    prisma.agendamento.update.mockResolvedValue({ ...agendamento, tipo: 'R' });

    const result = await service.confirmar(5, 1);

    expect(prisma.agendamento.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { tipo: 'R' },
      include: { contrato: true, profissional: true },
    });
    expect(result.tipo).toBe('R');
  });

  it('confirmar throws 422 when status is not A', async () => {
    prisma.agendamento.findUnique.mockResolvedValue({ id: 5, tipo: 'R', empresaId: 1 });

    await expect(service.confirmar(5, 1)).rejects.toMatchObject({ status: 422 });
    expect(prisma.agendamento.update).not.toHaveBeenCalled();
  });

  it('generateExport returns a Buffer for csv with no records', async () => {
    prisma.agendamento.findMany.mockResolvedValue([]);
    prisma.agendamento.count.mockResolvedValue(0);

    const buffer = await service.generateExport({}, 'csv');

    expect(Buffer.isBuffer(buffer)).toBe(true);
  });

  it('allows update for non-agendado entries', async () => {
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
    prisma.agendamento.update.mockResolvedValue({
      id: 1,
      tipo: 'R',
      observacao: 'teste',
    });

    await expect(service.update(1, { observacao: 'teste' } as any)).resolves.toMatchObject({
      id: 1,
      tipo: 'R',
      observacao: 'teste',
    });
    expect(prisma.agendamento.update).toHaveBeenCalled();
  });

  it('returns paginated appointments with advanced filters', async () => {
    prisma.agendamento.count.mockResolvedValue(1);
    prisma.agendamento.findMany.mockResolvedValue([{ id: 99 }]);

    const result = await service.search({
      page: '2',
      pageSize: '10',
      search: 'fallback',
      tipo: 'A',
      local: 'P',
      contratoId: '8',
      profissionalId: '1',
      dataInicial: '2026-06-01',
      dataFinal: '2026-06-30',
    } as any, 1);

    expect(prisma.agendamento.count).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            OR: [
              { descricao: { contains: 'fallback', mode: 'insensitive' } },
              { contrato: { descricao: { contains: 'fallback', mode: 'insensitive' } } },
              { profissional: { nome: { contains: 'fallback', mode: 'insensitive' } } },
            ],
          },
          { tipo: 'A' },
          { local: 'P' },
          { contratoId: 8 },
          { profissionalId: 1 },
          {
            dataAgenda: {
              gte: expectedStartDate,
              lte: expectedEndDate,
            },
          },
          { empresaId: 1 },
        ],
      },
    });
    expect(prisma.agendamento.findMany).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            OR: [
              { descricao: { contains: 'fallback', mode: 'insensitive' } },
              { contrato: { descricao: { contains: 'fallback', mode: 'insensitive' } } },
              { profissional: { nome: { contains: 'fallback', mode: 'insensitive' } } },
            ],
          },
          { tipo: 'A' },
          { local: 'P' },
          { contratoId: 8 },
          { profissionalId: 1 },
          {
            dataAgenda: {
              gte: expectedStartDate,
              lte: expectedEndDate,
            },
          },
          { empresaId: 1 },
        ],
      },
      include: { contrato: true, profissional: true },
      orderBy: [{ dataAgenda: 'desc' }, { horaInicio: 'desc' }],
      skip: 10,
      take: 10,
    });
    expect(result).toEqual({
      items: [{ id: 99 }],
      page: 2,
      pageSize: 10,
      total: 1,
      hasNext: false,
    });
  });

  it('search without clienteId keeps current behavior (no contrato.clienteId filter)', async () => {
    prisma.agendamento.count.mockResolvedValue(0);
    prisma.agendamento.findMany.mockResolvedValue([]);

    await service.search({}, 1);

    const where = prisma.agendamento.findMany.mock.calls[0][0].where;
    const andFilters = where.AND ?? [];
    expect(andFilters).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ contrato: expect.objectContaining({ clienteId: expect.anything() }) })]),
    );
  });

  it('search with clienteId scopes results to that cliente (portal do cliente)', async () => {
    prisma.agendamento.count.mockResolvedValue(0);
    prisma.agendamento.findMany.mockResolvedValue([]);

    await service.search({}, 1, 15);

    const where = prisma.agendamento.findMany.mock.calls[0][0].where;
    expect(where.AND).toEqual(expect.arrayContaining([{ contrato: { clienteId: 15 } }]));
  });

  it('findAll with clienteId scopes results to that cliente', async () => {
    prisma.agendamento.findMany.mockResolvedValue([]);

    await service.findAll(1, 15);

    expect(prisma.agendamento.findMany).toHaveBeenCalledWith({
      where: { empresaId: 1, contrato: { clienteId: 15 } },
      include: { contrato: true, profissional: true },
    });
  });
});
