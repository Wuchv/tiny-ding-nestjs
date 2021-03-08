import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../db/db.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    phone_number: string,
    password: string,
  ): Promise<[string | SafeObject, UserEntity]> {
    return await this.userService.queryUser({
      phone_number,
      password,
    });
  }

  async generateToken(user: Partial<UserEntity>): Promise<string> {
    const payload = { iss: 'server', sub: user.uid };
    return this.jwtService.sign(payload);
  }
}
