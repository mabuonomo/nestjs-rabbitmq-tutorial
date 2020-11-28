import { Controller, Get } from '@nestjs/common';
import { FanoutService } from './fanout.service';

@Controller('fanout')
export class FanoutController {
  constructor(private readonly fanoutService: FanoutService) {}

  @Get()
  publish(): string {
    this.fanoutService.publish();
    return 'Published a message in a fanout queue';
  }
}
