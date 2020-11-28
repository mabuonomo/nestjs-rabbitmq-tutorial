import { Test, TestingModule } from '@nestjs/testing';
import { FanoutController } from './fanout.controller';

describe('FanoutController', () => {
  let controller: FanoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FanoutController],
    }).compile();

    controller = module.get<FanoutController>(FanoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
