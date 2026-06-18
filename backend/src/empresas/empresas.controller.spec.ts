import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';

describe('EmpresasController', () => {
  let controller: EmpresasController;
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
      controllers: [EmpresasController],
      providers: [{ provide: EmpresasService, useValue: service }],
    }).compile();

    controller = module.get(EmpresasController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates search query to service', () => {
    controller.search({ page: '1', pageSize: '20', search: 'acme' } as any);
    expect(service.search).toHaveBeenCalledWith({ page: '1', pageSize: '20', search: 'acme' });
  });
});
