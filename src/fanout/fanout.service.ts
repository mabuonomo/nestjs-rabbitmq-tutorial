import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  Injectable,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ValidationDTO } from './validation/validation.dto';
import { ValidationInterceptor } from './validation/validation.interceptor';

@Injectable()
export class FanoutService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish() {
    console.log('publish fanout (show only on 2)');
    this.amqpConnection.publish('exchange_fanout', '', {
      msg: 'publish fanout (show only on 2)',
    });

    console.log('publish fanout hello (show on 1 and 2)');
    this.amqpConnection.publish('exchange_fanout', '', {
      msg: 'publish fanout hello (show on 1 and 2)',
    });
  }

  @RabbitSubscribe({
    exchange: 'exchange_fanout',
    routingKey: '',
    queue: 'queue1_fanout',
  })
  @UseInterceptors(new ValidationInterceptor<ValidationDTO>(ValidationDTO))
  public async pubSubHandler1(msg: {}) {
    console.log(`Received message from fanout 1: ${JSON.stringify(msg)}`);
  }

  @RabbitSubscribe({
    exchange: 'exchange_fanout',
    routingKey: '',
    queue: 'queue2_fanout',
  })
  public async pubSubHandler2(msg: {}) {
    console.log(`Received message from fanout 2: ${JSON.stringify(msg)}`);
  }
}
