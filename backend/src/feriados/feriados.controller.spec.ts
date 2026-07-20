import { Test, TestingModule } from '@nestjs/testing';
import { FeriadosController } from './feriados.controller';
import { FeriadosService } from './feriados.service';
import { PrismaService } from '../prisma/prisma.service';

describe('FeriadosController', () => {
  let controller: FeriadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeriadosController],
      providers: [
        { provide: FeriadosService, useValue: {} },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<FeriadosController>(FeriadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
