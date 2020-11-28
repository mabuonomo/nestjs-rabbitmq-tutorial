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
