import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
