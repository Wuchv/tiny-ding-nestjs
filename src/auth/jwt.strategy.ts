import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/db';

export const jwtConstants = {
  secret: 'ting-ding-jwt-secret',
  expiresIn: 1000 * 60 * 60 * 24 * 15,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<Partial<UserEntity>> {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }
    return { uid: payload.sub };
  }
}
