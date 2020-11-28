import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FanoutModule } from './fanout/fanout.module';

@Module({
  imports: [FanoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
