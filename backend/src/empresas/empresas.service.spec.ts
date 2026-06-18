import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasService } from './empresas.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EmpresasService', () => {
  let service: EmpresasService;
  let prisma: {
    empresa: {
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
      empresa: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresasService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(EmpresasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns paginated companies with search and ordering', async () => {
    prisma.empresa.count.mockResolvedValue(3);
    prisma.empresa.findMany.mockResolvedValue([{ id: 2, nome: 'Beta' }]);

    const result = await service.search({
      page: '2',
      pageSize: '10',
      search: 'beta',
      sortProperty: 'nome',
      sortDirection: 'descending',
    });

    expect(prisma.empresa.count).toHaveBeenCalledWith({
      where: {
        nome: { contains: 'beta', mode: 'insensitive' },
      },
    });
    expect(prisma.empresa.findMany).toHaveBeenCalledWith({
      where: {
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
