import { Test, TestingModule } from '@nestjs/testing';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';

describe('ContratosController', () => {
  let controller: ContratosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosController],
      providers: [
        {
          provide: ContratosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(ContratosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
