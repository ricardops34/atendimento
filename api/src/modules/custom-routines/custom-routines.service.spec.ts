import { Test, TestingModule } from '@nestjs/testing';
import { CustomRoutinesService } from './custom-routines.service';

describe('CustomRoutinesService', () => {
  let service: CustomRoutinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomRoutinesService],
    }).compile();

    service = module.get<CustomRoutinesService>(CustomRoutinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
