import { Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { omit } from 'lodash';
import { SocketStateService } from './socket.state.service';
import { MessageEntity, AttachmentEntity, EDbProvide } from '../db';

enum EMessageEvent {
  SEND_MESSAGE = 'send_message_to_server',
  OBTAIN_MESSAGE = 'obtain_message_from_server',
  THROW_ERROR = 'throw_send_message_error',
  SEND_SIGNAL = 'send_signal_to_server',
  OBTAIN_SIGNAL = 'obtain_signal_from_server',
}

enum ESignalType {
  INITIATE_VIDEO_CALL = 'initiate_video_call',
  AGREE_TO_VIDEO_CALL = 'agree_to_video_call',
  REJECT_VIDEO_CALL = 'reject_video_call',
  USER_OFFLINE = 'user_offline',
  NOT_ANSWERED = 'not_answered',
  SYNC_ICECANDIDATE = 'sync_icecandidate',
  PREPARE_TO_RECEIVE_VIDEO_STREAM = 'prepare_to_receive_video_stream',
  STOP_SEND_PREPARE = 'stop_send_prepare_to_receive_video_stream',
  HANG_UP = 'hang_up',
}

@WebSocketGateway({ namespace: 'im', transports: ['websocket'] })
export class ImGateway {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ImGateway');

  constructor(
    private readonly socketStateService: SocketStateService,
    @Inject(EDbProvide.MESSAGE_REPOSITORY)
    private readonly msgRepository: Repository<MessageEntity>,
    @Inject(EDbProvide.ATTACHMENT_REPOSITORY)
    private readonly attachmentRepository: Repository<AttachmentEntity>,
  ) {}

  public async handleConnection(
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const { uid } = client.handshake.query;
    if (uid) {
      this.socketStateService.save(uid, client);
    }
    this.logger.log(`connected sid:${client.id},uid:${uid}`);
    return uid;
  }

  public async handleDisconnect(
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const { uid } = client.handshake.query;
    if (uid) {
      this.socketStateService.remove(uid);
    }
    this.logger.log(`disconnected sid:${client.id},uid:${uid}`);
    return client.id;
  }

  @SubscribeMessage(EMessageEvent.SEND_MESSAGE)
  public async handleMessageFromClient(
    @MessageBody() msg: IMessage,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    try {
      let _msg = msg;
      const { attachment } = msg;
      if (attachment) {
        _msg = omit(msg, ['attachment']);
        await this.attachmentRepository.save({
          ...attachment,
          msgId: msg.msgId,
        });
      }
      await this.msgRepository.save(_msg);
    } catch (e) {
      console.log(e);
      client.to(client.id).emit('throwSendMessageError', e);
      return;
    }
    const { toId } = msg;
    const toSocket = this.socketStateService.get(toId);
    if (toSocket) {
      this.logger.log(`send msg to ${toSocket.id}`);
      this.server.to(toSocket.id).emit(EMessageEvent.OBTAIN_MESSAGE, msg);
    }
  }

  @SubscribeMessage(EMessageEvent.SEND_SIGNAL)
  public async handleSignalFromClient(@MessageBody() signal: ISignal) {
    const { fromId, toId } = signal.payload;
    const fromSocket = this.socketStateService.get(fromId);
    const toSocket = this.socketStateService.get(toId);
    if (!toSocket) {
      this.server.to(fromSocket.id).emit(EMessageEvent.OBTAIN_SIGNAL, {
        type: ESignalType.USER_OFFLINE,
      });
    } else {
      this.server.to(toSocket.id).emit(EMessageEvent.OBTAIN_SIGNAL, signal);
    }
  }
}
