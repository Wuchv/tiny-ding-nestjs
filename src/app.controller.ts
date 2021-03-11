import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get('/token')
  getHello(@Req() req): string {
    const res = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    return res;
  }
}
