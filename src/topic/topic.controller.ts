import { Controller, Get } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  publish(): string {
    this.topicService.publish1();
    this.topicService.publish2();

    return 'Published a message in a topic queues';
  }
}
