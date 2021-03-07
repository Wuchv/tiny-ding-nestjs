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
    };
    let err = null;
    try {
      await this.userRepository.save(user);
    } catch (e) {
      err = e;
    }
    return [err, null];
  }

  async queryUser(user: UserDto): ServiceReturn<UserEntity> {
    let err = null;
    let result: UserEntity = null;
    try {
      result = await this.userRepository.findOne(user);
      if (!result) {
        err = '账号或密码错误';
      }
    } catch (e) {
      err = e;
    }
    return [err, result];
  }
}
