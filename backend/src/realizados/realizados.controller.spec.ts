import { Test, TestingModule } from '@nestjs/testing';
import { RealizadosController } from './realizados.controller';
import { RealizadosService } from './realizados.service';

describe('RealizadosController', () => {
  let controller: RealizadosController;
  const service = {
    fecharLote: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealizadosController],
      providers: [{ provide: RealizadosService, useValue: service }],
    }).compile();

    controller = module.get(RealizadosController);
  });

  it('delegates fecharLote to service', () => {
    const dto = { agendamentoIds: [1, 2] };
    controller.fecharLote(dto);
    expect(service.fecharLote).toHaveBeenCalledWith(dto);
  });
});
