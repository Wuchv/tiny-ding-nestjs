import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MessageEntity, UserEntity, EDbProvide } from '../db';

@Injectable()
export class MessageService {
  constructor(
    @Inject(EDbProvide.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(EDbProvide.MESSAGE_REPOSITORY)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async queryUnreadMessage(uid: string): ServiceReturn<MessageEntity[]> {
    let err = null;
    let result: MessageEntity[] = [];
    try {
      const user: UserEntity = await this.userRepository.findOne({ uid });
      const { offline } = user;

      result = await this.messageRepository
        .createQueryBuilder('message')
        .where('message.toId = :uid', { uid })
        .andWhere('message.timestamp >= :timestamp', { timestamp: offline })
        .getMany();

      result = result.map((msg) => ({
        ...msg,
        timestamp: parseInt(`${msg.timestamp}`),
      }));
    } catch (e) {
      err = e;
    }
    return [err, result];
  }

  async queryMessage(
    uid: string,
    start: number,
    end: number,
  ): ServiceReturn<MessageEntity[]> {
    let err = null;
    let result: MessageEntity[] = [];
    try {
      result = await this.messageRepository
        .createQueryBuilder('message')
        .where('message.toId = :uid', { uid })
        .andWhere('message.timestamp >= :start', { start })
        .andWhere('message.timestamp <= :end', { end })
        .getMany();

      result = result.map((msg) => ({
        ...msg,
        timestamp: parseInt(`${msg.timestamp}`),
      }));
    } catch (e) {
      err = e;
    }
    return [err, result];
  }
}
