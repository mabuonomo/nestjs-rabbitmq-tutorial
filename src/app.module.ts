import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FanoutModule } from './fanout/fanout.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [FanoutModule, TopicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
