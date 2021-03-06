import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { responseFactory } from 'src/utils';

interface ILoginPayLoad {
  uid: string;
  nickname?: string;
  avatarUrl?: string;
}
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() user: UserDto): Promise<IResponse<null>> {
    const [err] = await this.userService.addUser(user);
    if (err) {
      return responseFactory(400, err);
    }
    return responseFactory(200, '注册成功');
  }

  @Get('/login')
  async login(@Query() user: UserDto): Promise<IResponse<ILoginPayLoad>> {
    const [err, result] = await this.userService.queryUser(user);
    if (err) {
      return responseFactory(400, err);
    }
    return responseFactory(200, '登录成功', result);
  }
}
