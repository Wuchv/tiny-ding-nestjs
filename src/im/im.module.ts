import { Module } from '@nestjs/common';
import { ImService } from './im.service';
import { ImGateway } from './im.gateway';
import { SocketStateService } from './socket.state.service';
import { dbModule, messageProviders } from '../db';

@Module({
  imports: [dbModule],
  providers: [ImService, ImGateway, SocketStateService, ...messageProviders],
})
export class ImModule {}
