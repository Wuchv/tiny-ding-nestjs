import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/db';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    const [err, user] = await this.authService.validateUser(username, password);
    if (err) {
      throw new UnauthorizedException(err);
    }
    return {
      uid: user.uid,
      account: user.account,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
    };
  }
}
