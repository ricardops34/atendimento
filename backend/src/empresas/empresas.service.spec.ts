import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasService } from './empresas.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EmpresasService', () => {
  let service: EmpresasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpresasService,
        {
          provide: PrismaService,
          useValue: {
            empresa: {
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

    service = module.get(EmpresasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
