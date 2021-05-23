import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { UserEntity, EDbProvide } from '../db';
import { UserDto } from './user.dto';
import { getRandomChineseWord } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @Inject(EDbProvide.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addUser(newUser: UserDto): ServiceReturn<null> {
    const user: UserEntity = {
      ...newUser,
      uid: uuidV4(),
      nickname: getRandomChineseWord() + getRandomChineseWord(),
      offline: Date.now(),
    };
    let err = null;
    try {
      const [, isExist] = await this.queryUser({
        account: user.account,
      } as UserDto);
      if (isExist) {
        err = '用户已存在';
      } else {
        await this.userRepository.save(user);
      }
    } catch (e) {
      err = e;
    }
    return [err, null];
  }

  async queryUser(user: UserDto): ServiceReturn<UserEntity> {
    let err = null;
    let result: UserEntity = null;
    try {
      result = await this.userRepository.findOne(user, {
        select: ['uid', 'account', 'avatarUrl', 'nickname'],
      });
      if (!result) {
        err = '账号或密码错误';
      }
    } catch (e) {
      err = e;
    }
    return [err, result];
  }

  async queryAllUser(): ServiceReturn<UserEntity[]> {
    let err = null;
    let result: UserEntity[] = [];
    try {
      result = await this.userRepository.find({
        select: ['uid', 'account', 'avatarUrl', 'nickname'],
      });
    } catch (e) {
      err = e;
    }
    return [err, result];
  }

  async userOffline(uid: string, timestamp: number) {
    let err = null;
    let result: UserEntity = null;
    try {
      result = await this.userRepository.findOne({ uid });
      result.offline = timestamp;
      await this.userRepository.save(result);
    } catch (e) {
      err = e;
    }
    return [err, result];
  }
}
