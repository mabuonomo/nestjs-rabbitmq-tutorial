import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TopicService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish1() {
    this.amqpConnection.publish('exchange_topic', 'queue1', {
      msg: 'publish topic queue1',
    });
  }

  publish2() {
    this.amqpConnection.publish('exchange_topic', 'queue2', {
      msg: 'publish topic queue2',
    });
  }

  @RabbitSubscribe({
    exchange: 'exchange_topic',
    routingKey: 'queue1',
  })
  public async pubSubHandler1(msg: {}) {
    console.log(`Received message from topic 1: ${JSON.stringify(msg)}`);
  }

  @RabbitSubscribe({
    exchange: 'exchange_topic',
    routingKey: 'queue2',
  })
  public async pubSubHandler2(msg: {}) {
    console.log(`Received message from topic 2: ${JSON.stringify(msg)}`);
  }
}
