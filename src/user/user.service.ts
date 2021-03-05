import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity, EDbProvide } from '../db';

@Injectable()
export class UserService {
  constructor(
    @Inject(EDbProvide.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
