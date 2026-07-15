import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

describe('ClientesController', () => {
  let controller: ClientesController;
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
      controllers: [ClientesController],
      providers: [{ provide: ClientesService, useValue: service }],
    }).compile();

    controller = module.get(ClientesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates the client in the authenticated company', () => {
    const dto = { nome: 'Cliente A' } as any;

    controller.create(dto, { user: { empresaId: 1 } } as any);

    expect(service.create).toHaveBeenCalledWith(dto, 1);
  });

  it('delegates search query to service', () => {
    controller.search({ page: '1', pageSize: '20', search: 'acme' } as any, { user: { empresaId: 1 } } as any);
    expect(service.search).toHaveBeenCalledWith({ page: '1', pageSize: '20', search: 'acme' }, 1);
  });
});
