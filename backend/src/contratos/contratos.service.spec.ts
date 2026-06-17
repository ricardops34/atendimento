import { Test, TestingModule } from '@nestjs/testing';
import { ContratosService } from './contratos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ContratosService', () => {
  let service: ContratosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContratosService,
        {
          provide: PrismaService,
          useValue: {
            contrato: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get(ContratosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
