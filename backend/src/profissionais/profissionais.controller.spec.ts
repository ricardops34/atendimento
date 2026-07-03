import { Test, TestingModule } from '@nestjs/testing';
import { ProfissionaisController } from './profissionais.controller';
import { ProfissionaisService } from './profissionais.service';

describe('ProfissionaisController', () => {
  let controller: ProfissionaisController;
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    search: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfissionaisController],
      providers: [{ provide: ProfissionaisService, useValue: service }],
    }).compile();

    controller = module.get(ProfissionaisController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates search query to service', () => {
    controller.search({ page: '1', pageSize: '20', search: 'joao' } as any, { user: { empresaId: 1 } } as any);
    expect(service.search).toHaveBeenCalledWith({ page: '1', pageSize: '20', search: 'joao' }, 1);
  });
});
