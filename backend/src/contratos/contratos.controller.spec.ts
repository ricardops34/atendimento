import { Test, TestingModule } from '@nestjs/testing';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';

describe('ContratosController', () => {
  let controller: ContratosController;
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
      controllers: [ContratosController],
      providers: [{ provide: ContratosService, useValue: service }],
    }).compile();

    controller = module.get(ContratosController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates search query to service', () => {
    controller.search({ page: '1', pageSize: '20', search: 'plano', empresaId: '2' } as any);
    expect(service.search).toHaveBeenCalledWith({ page: '1', pageSize: '20', search: 'plano', empresaId: '2' });
  });
});
