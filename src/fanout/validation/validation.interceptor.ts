import { Nack } from '@golevelup/nestjs-rabbitmq';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationDTO } from './validation.dto';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    let obj = context.getArgs()[0];

    const object = plainToClass(ValidationDTO, obj);
    const errors = await validate(object);
    if (errors.length > 0) {
      new Nack(false);
      return null;
    }

    return next.handle();
  }
}
