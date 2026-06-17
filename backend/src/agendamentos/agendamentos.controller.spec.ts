import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

describe('AgendamentosController', () => {
  let controller: AgendamentosController;
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamentosController],
      providers: [{ provide: AgendamentosService, useValue: service }],
    }).compile();

    controller = module.get(AgendamentosController);
  });

  it('delegates findAll to service', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});
