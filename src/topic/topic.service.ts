import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TopicService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish1() {
    console.log('publishing topic 1');

    this.amqpConnection.publish('exchange_topic', 'queue1', {
      msg: 'publish topic queue1',
    });
  }

  publish2() {
    console.log('publishing topic 2');

    this.amqpConnection.publish('exchange_topic', 'queue2', {
      msg: 'publish topic queue2',
    });
  }

  @RabbitRPC({
    exchange: 'exchange_topic',
    routingKey: 'queue1',
  })
  public async pubSubHandler1(msg: {}) {
    console.log(`Received message from topic 1: ${JSON.stringify(msg)}`);
  }

  @RabbitRPC({
    exchange: 'exchange_topic',
    routingKey: 'queue2',
  })
  public async pubSubHandler2(msg: {}) {
    console.log(`Received message from topic 2: ${JSON.stringify(msg)}`);
  }
}
