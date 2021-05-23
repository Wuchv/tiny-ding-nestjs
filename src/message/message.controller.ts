import {
  Controller,
  HttpException,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(readonly messageService: MessageService) {}

  @Get('/unreadMessage')
  @HttpCode(HttpStatus.OK)
  async unreadMessage(@Query('uid') uid: string) {
    const [err, result] = await this.messageService.queryUnreadMessage(uid);

    if (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get('/queryMessage')
  @HttpCode(HttpStatus.OK)
  async queryMessage(
    @Query('uid') uid: string,
    @Query('start') start: number,
    @Query('end') end: number,
  ) {
    const [err, result] = await this.messageService.queryMessage(
      uid,
      start,
      end,
    );

    if (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
