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
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ValidationDTO } from './validation.dto';

interface ClassType<T> {
  new (): T;
}

@Injectable()
export class ValidationInterceptor<T>
  implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly classType: ClassType<T>) {}

  async intercept<A>(context: ExecutionContext, next: CallHandler<any>) {
    let obj = context.getArgs()[0];

    const object = plainToClass(this.classType, obj);
    const errors = await validate(object);
    if (errors.length > 0) {
      new Nack(false);
      return null;
    }

    return next.handle();
  }
}
