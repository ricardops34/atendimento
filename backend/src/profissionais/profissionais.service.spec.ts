import { Test, TestingModule } from '@nestjs/testing';
import { ProfissionaisService } from './profissionais.service';
import { PrismaService } from '../prisma/prisma.service';

const userSelect = { select: { id: true, name: true } };

describe('ProfissionaisService', () => {
  let service: ProfissionaisService;
  let prisma: {
    profissional: {
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
      profissional: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfissionaisService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(ProfissionaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns paginated professionals with search and ordering', async () => {
    prisma.profissional.count.mockResolvedValue(25);
    prisma.profissional.findMany.mockResolvedValue([{ id: 1, nome: 'Ana', user: null }]);

    const result = await service.search({
      page: '1',
      pageSize: '20',
      search: 'ana',
      sortProperty: 'nome',
      sortDirection: 'ascending',
    });

    expect(prisma.profissional.count).toHaveBeenCalledWith({
      where: { nome: { contains: 'ana', mode: 'insensitive' } },
    });
    expect(prisma.profissional.findMany).toHaveBeenCalledWith({
      where: { nome: { contains: 'ana', mode: 'insensitive' } },
      include: { user: userSelect },
      orderBy: { nome: 'asc' },
      skip: 0,
      take: 20,
    });
    expect(result).toEqual({
      items: [{ id: 1, nome: 'Ana', user: null }],
      page: 1,
      pageSize: 20,
      total: 25,
      hasNext: true,
    });
  });
});
