import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  async login(@Query() user: LoginDto): Promise<any> {
    const res = await this.userService.login();
    console.log(user);
    return res;
  }
}
