import { Module } from '@nestjs/common';
import { FanoutService } from './fanout.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { FanoutController } from './fanout.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange_fanout',
          type: 'fanout',
        },
      ],
      uri: 'amqp://guest:guest@rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [FanoutService],
  controllers: [FanoutController],
})
export class FanoutModule {}
