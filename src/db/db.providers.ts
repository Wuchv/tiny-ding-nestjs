import { Provider } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { UserEntity, MessageEntity } from './db.entity';

export enum EDbProvide {
  DATABASE_CONNECTION = 'DATABASE_CONNECTION',
  USER_REPOSITORY = 'USER_REPOSITORY',
  MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY',
}

export const dbProviders: Provider[] = [
  {
    provide: EDbProvide.DATABASE_CONNECTION,
    useFactory: async (): Promise<Connection> =>
      await createConnection({
        type: 'mysql',
        host: 'rm-bp15s839w0ll9s5oyxo.mysql.rds.aliyuncs.com',
        port: 3306,
        username: 'tiny_ding',
        password: 'mysql_2021',
        database: 'tiny-ding',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
  },
];

export const userProviders = [
  {
    provide: EDbProvide.USER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [EDbProvide.DATABASE_CONNECTION],
  },
];

export const messageProviders = [
  {
    provide: EDbProvide.MESSAGE_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(MessageEntity),
    inject: [EDbProvide.DATABASE_CONNECTION],
  },
];
