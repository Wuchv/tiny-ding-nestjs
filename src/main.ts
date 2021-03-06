import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // 设置跨站访问
    logger: false,
  });
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7000, () => {
    Logger.log('服务已经启动,请访问 http://127.0.0.1:7000');
  });
}
bootstrap();
