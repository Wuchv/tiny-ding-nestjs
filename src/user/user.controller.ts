import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return responseFactory(HttpStatus.OK, '注册成功');
  }

  @UseGuards(AuthGuard('local'))
  @Get('/login')
  async login(@Query() user: UserDto): Promise<IResponse<ILoginPayLoad>> {
    const [err, result] = await this.userService.queryUser(user);
    if (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return responseFactory(HttpStatus.OK, '登录成功', result);
  }
}
