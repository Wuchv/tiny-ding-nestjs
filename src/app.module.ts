import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ImModule } from './im/im.module';
// import { RedisModule } from './redis/redis.module';

@Module({
  imports: [UserModule, AuthModule, ImModule],
  controllers: [AppController],
})
export class AppModule {}
