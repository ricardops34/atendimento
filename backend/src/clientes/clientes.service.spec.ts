import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ClientesService', () => {
  let service: ClientesService;
  let prisma: {
    cliente: {
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
      cliente: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(ClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns paginated companies with search and ordering', async () => {
    prisma.cliente.count.mockResolvedValue(3);
    prisma.cliente.findMany.mockResolvedValue([{ id: 2, nome: 'Beta' }]);

    const result = await service.search({
      page: '2',
      pageSize: '10',
      search: 'beta',
      sortProperty: 'nome',
      sortDirection: 'descending',
    }, 1);

    expect(prisma.cliente.count).toHaveBeenCalledWith({
      where: {
        empresaId: 1,
        nome: { contains: 'beta', mode: 'insensitive' },
      },
    });
    expect(prisma.cliente.findMany).toHaveBeenCalledWith({
      where: {
        empresaId: 1,
        nome: { contains: 'beta', mode: 'insensitive' },
      },
      orderBy: { nome: 'desc' },
      skip: 10,
      take: 10,
    });
    expect(result).toEqual({
      items: [{ id: 2, nome: 'Beta' }],
      page: 2,
      pageSize: 10,
      total: 3,
      hasNext: false,
    });
  });
});
