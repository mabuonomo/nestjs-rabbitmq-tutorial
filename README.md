# Tutorial: RabbitMQ + Nestjs

This tutorial show how to use rabbitmq topic and fanout exchange in NestJS.
To do this we use an external npm package [golevelup/nestjs-rabbitmq](https://www.npmjs.com/package/@golevelup/nestjs-rabbitmq) because the default module supports only the direct exchange

RabbitMQ supports the following exchange types:

- Direct: The message is routed to the queues whose binding key exactly matches the routing key of the message.
- Fanout: A fanout exchange routes messages to all of the queues bound to it.
- Topic: The topic exchange does a wildcard match between the routing key and the routing pattern specified in the binding.
- Headers: Headers exchanges use the message header attributes for routing.

## Prerequisites

- docker
- docker-compose

## 🚧 Structure

The project has:

- 2 nestjs's modules (plus the app module): topic and fanout.
- 2 rabbitmq's exchanges: exchange_topic and exchange_fanout
- 4 rabbitmq's queues: queue1_fanout, queue2_fanout, queue1_topic, queue2_topic

To edit/replace these queues you can edit .docker/rabbitmq/definitions.json to rebuild the image

## 🚀 Running the app

```bash
$ docker-compose up
```

## 💾 Publish a message

To publish a message in a topic exchange open:

```
http://localhost:3000/topic/topic1
http://localhost:3000/topic/topic2
```

or if you want publish in a fanout open:

```
http://localhost:3000/fanout
```

and see the logs into your terminal

```
nestjs_1    | publishing topic 2
nestjs_1    | Received message from topic 2: {"msg":"publish topic queue2"}
nestjs_1    | publishing topic 1
nestjs_1    | Received message from topic 1: {"msg":"publish topic queue1"}
nestjs_1    | publishing fanout
nestjs_1    | Received message from fanout 2: {"msg":"publish fanout"}
nestjs_1    | Received message from fanout 1: {"msg":"publish fanout"}
nestjs_1    | publishing topic 1
nestjs_1    | Received message from topic 1: {"msg":"publish topic queue1"}
nestjs_1    | publishing topic 2
nestjs_1    | Received message from topic 2: {"msg":"publish topic queue2"}
```
