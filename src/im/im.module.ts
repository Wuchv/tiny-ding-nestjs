import { Module } from '@nestjs/common';
import { ImService } from './im.service';
import { ImGateway } from './im.gateway';

@Module({
  providers: [ImService, ImGateway],
})
export class ImModule {}
