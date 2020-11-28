import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FanoutService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish() {
    this.amqpConnection.publish('exchange_fanout', '', {
      msg: 'publish fanout',
    });
  }

  @RabbitSubscribe({
    exchange: 'exchange_fanout',
    routingKey: '',
    queue: 'queue1_fanout',
  })
  public async pubSubHandler(msg: {}) {
    console.log(`Received message from fanout: ${JSON.stringify(msg)}`);
  }
}
