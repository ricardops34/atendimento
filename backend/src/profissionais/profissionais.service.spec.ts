import { Test, TestingModule } from '@nestjs/testing';
import { ProfissionaisService } from './profissionais.service';

describe('ProfissionaisService', () => {
  let service: ProfissionaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfissionaisService],
    }).compile();

    service = module.get<ProfissionaisService>(ProfissionaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
