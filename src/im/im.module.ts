import { Module } from '@nestjs/common';
import { ImService } from './im.service';
import { ImGateway } from './im.gateway';
import { SocketStateService } from './socket.state.service';

@Module({
  providers: [ImService, ImGateway, SocketStateService],
})
export class ImModule {}
