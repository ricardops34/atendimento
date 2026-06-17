import { Test, TestingModule } from '@nestjs/testing';
import { ProfissionaisService } from './profissionais.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProfissionaisService', () => {
  let service: ProfissionaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfissionaisService,
        {
          provide: PrismaService,
          useValue: {
            profissional: {
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

    service = module.get(ProfissionaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
