import { Module } from '@nestjs/common';
import { ImService } from './im.service';
import { ImGateway } from './im.gateway';
import { SocketStateService } from './socket.state.service';
import { dbModule, messageProviders, attachmentProviders } from '../db';

@Module({
  imports: [dbModule],
  providers: [
    ImService,
    ImGateway,
    SocketStateService,
    ...messageProviders,
    ...attachmentProviders,
  ],
})
export class ImModule {}
