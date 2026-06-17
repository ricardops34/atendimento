import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';

describe('EmpresasController', () => {
  let controller: EmpresasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresasController],
      providers: [
        {
          provide: EmpresasService,
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

    controller = module.get(EmpresasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
