import { SystemModulesService } from './system-modules.service';

describe('SystemModulesService', () => {
  const prisma: any = {
    module: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  const service = new SystemModulesService(prisma);

  beforeEach(() => jest.clearAllMocks());

  it('uses module order and name as the default maintenance order', async () => {
    prisma.module.count.mockResolvedValue(0);
    prisma.module.findMany.mockResolvedValue([]);

    await service.search({ page: '1', pageSize: '20' });

    expect(prisma.module.findMany).toHaveBeenCalledWith(expect.objectContaining({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    }));
  });

  it('maps order as a number when saving a module', async () => {
    prisma.module.create.mockResolvedValue({ id: 1, name: 'Cadastro', key: 'cadastro', sortOrder: 20 });

    await service.create({ name: ' Cadastro ', key: ' cadastro ', sortOrder: '20', ignored: true });

    expect(prisma.module.create).toHaveBeenCalledWith({
      data: { name: 'Cadastro', key: 'cadastro', sortOrder: 20 },
    });
  });
});
