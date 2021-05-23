import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ImModule } from './im/im.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [UserModule, AuthModule, ImModule, MessageModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
