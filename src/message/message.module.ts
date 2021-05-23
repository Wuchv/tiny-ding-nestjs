import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { dbModule, userProviders, messageProviders } from '../db';

@Module({
  imports: [dbModule],
  providers: [MessageService, ...userProviders, ...messageProviders],
  controllers: [MessageController],
})
export class MessageModule {}
