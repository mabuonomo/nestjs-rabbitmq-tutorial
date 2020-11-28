import { Test, TestingModule } from '@nestjs/testing';
import { FanoutService } from './fanout.service';

describe('FanoutService', () => {
  let service: FanoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanoutService],
    }).compile();

    service = module.get<FanoutService>(FanoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
