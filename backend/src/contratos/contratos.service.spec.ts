import { Test, TestingModule } from '@nestjs/testing';
import { ContratosService } from './contratos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ContratosService', () => {
  let service: ContratosService;
  let prisma: {
    contrato: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
      count: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      contrato: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratosService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(ContratosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns paginated contracts with advanced filters and ordering', async () => {
    prisma.contrato.count.mockResolvedValue(21);
    prisma.contrato.findMany.mockResolvedValue([{ id: 7, descricao: 'Contrato B' }]);

    const result = await service.search({
      page: '1',
      pageSize: '20',
      search: 'empresa',
      empresaId: '3',
      isFeriado: 'true',
      sortProperty: 'empresa.nome',
      sortDirection: 'ascending',
    });

    expect(prisma.contrato.count).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            OR: [
              { descricao: { contains: 'empresa', mode: 'insensitive' } },
              { empresa: { nome: { contains: 'empresa', mode: 'insensitive' } } },
            ],
          },
          { empresaId: 3 },
          { isFeriado: true },
        ],
      },
    });
    expect(prisma.contrato.findMany).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            OR: [
              { descricao: { contains: 'empresa', mode: 'insensitive' } },
              { empresa: { nome: { contains: 'empresa', mode: 'insensitive' } } },
            ],
          },
          { empresaId: 3 },
          { isFeriado: true },
        ],
      },
      include: { empresa: true },
      orderBy: { empresa: { nome: 'asc' } },
      skip: 0,
      take: 20,
    });
    expect(result).toEqual({
      items: [{ id: 7, descricao: 'Contrato B' }],
      page: 1,
      pageSize: 20,
      total: 21,
      hasNext: true,
    });
  });

  it('filters by tipo', async () => {
    prisma.contrato.count.mockResolvedValue(5);
    prisma.contrato.findMany.mockResolvedValue([{ id: 1, tipo: 'F' }]);

    await service.search({ tipo: 'F' });

    expect(prisma.contrato.count).toHaveBeenCalledWith({
      where: { AND: [{ tipo: 'F' }] },
    });
  });

  it('filters by dtInicio and dtFim', async () => {
    prisma.contrato.count.mockResolvedValue(2);
    prisma.contrato.findMany.mockResolvedValue([]);

    await service.search({ dtInicio: '2026-01-01', dtFim: '2026-12-31' });

    expect(prisma.contrato.count).toHaveBeenCalledWith({
      where: {
        AND: [
          { dtInicio: new Date('2026-01-01') },
          { dtFim: new Date('2026-12-31') },
        ],
      },
    });
  });
});
