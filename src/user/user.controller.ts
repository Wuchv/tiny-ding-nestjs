import {
  Req,
  Res,
  Body,
  Post,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { responseFactory } from 'src/utils';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';

interface ILoginPayLoad {
  uid: string;
  nickname?: string;
  avatarUrl?: string;
  access_token: string;
}
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() user: UserDto): Promise<IResponse<null>> {
    const [err] = await this.userService.addUser(user);
    if (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return responseFactory(HttpStatus.OK, '注册成功');
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: UserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ILoginPayLoad> {
    const access_token = await this.authService.generateToken(req.user);

    res.cookie('access_token', access_token, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: false,
    });

    return {
      ...req.user,
      access_token,
    } as ILoginPayLoad;
    // return responseFactory(HttpStatus.OK, '登录成功', {
    //   ...req.user,
    //   access_token,
    // });
  }
}
