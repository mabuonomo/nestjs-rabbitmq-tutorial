import { Contains } from 'class-validator';

export class ValidationDTO {
  @Contains('hello')
  msg: string;
  
}
