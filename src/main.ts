import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PeerServer } from 'peer';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // 设置跨站访问
  });
  PeerServer({ port: 9000, path: '/video' });
  app.use(helmet());
  app.use(cookieParser());
  // app.use(csurf());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7000, () => {
    Logger.log('服务已经启动,请访问 http://127.0.0.1:7000');
  });
}
bootstrap();
