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

    this.amqpConnection.publish('exchange_topic', 'abc', {
      msg: 'publish topic queue1',
    });
  }

  publish2() {
    console.log('publishing topic 2');

    this.amqpConnection.publish('exchange_topic', 'cde', {
      msg: 'publish topic queue2',
    });
  }

  @RabbitSubscribe({
    exchange: 'exchange_topic',
    routingKey: 'abc',
    queue: 'queue1_topic',
  })
  public async pubSubHandler1(msg: {}) {
    console.log(`Received message from topic 1: ${JSON.stringify(msg)}`);
  }

  @RabbitSubscribe({
    exchange: 'exchange_topic',
    routingKey: 'cde',
    queue: 'queue2_topic',
  })
  public async pubSubHandler2(msg: {}) {
    console.log(`Received message from topic 2: ${JSON.stringify(msg)}`);
  }
}
