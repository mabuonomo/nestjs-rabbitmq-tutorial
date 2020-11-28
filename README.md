# Tutorial: RabbitMQ with Nestjs

This tutorial show how to use rabbitmq topic and fanout exchange in NestJS.
To do this we use an external npm package [golevelup/nestjs-rabbitmq](https://www.npmjs.com/package/@golevelup/nestjs-rabbitmq) because the default module support only the direct exchange

<p align="center"><img src="./assets/rabbitmq.png" width="420" alt="Nest Logo" />
</p>

## Prerequisites

- docker
- docker-compose

## Running the app

```bash
# development
$ docker-compose up
```

Now open, to test the topic exchange

```
http://localhost:3000/topic/topic1
http://localhost:3000/topic/topic2
```

or to test the fanout exchange

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
