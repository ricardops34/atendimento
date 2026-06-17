import { Test, TestingModule } from '@nestjs/testing';
import { ProfissionaisController } from './profissionais.controller';
import { ProfissionaisService } from './profissionais.service';

describe('ProfissionaisController', () => {
  let controller: ProfissionaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfissionaisController],
      providers: [
        {
          provide: ProfissionaisService,
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

    controller = module.get(ProfissionaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
