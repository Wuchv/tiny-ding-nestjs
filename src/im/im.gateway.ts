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
import { SocketStateService } from './socket.state.service';
import { MessageEntity, EDbProvide } from '../db';

@WebSocketGateway({ namespace: 'im', transports: ['websocket'] })
export class ImGateway {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ImGateway');

  constructor(
    private readonly socketStateService: SocketStateService,
    @Inject(EDbProvide.MESSAGE_REPOSITORY)
    private readonly msgRepository: Repository<MessageEntity>,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket): Promise<any> {
    const { uid } = client.handshake.query;
    if (uid) {
      this.socketStateService.save(uid, client);
    }
    this.logger.log(`connected sid:${client.id}`);
    return uid;
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<any> {
    const { uid } = client.handshake.query;
    if (uid) {
      this.socketStateService.remove(uid);
    }
    this.logger.log(`disconnected sid:${client.id}`);
    return client.id;
  }

  @SubscribeMessage('sendMessageToServer')
  async handleMessageFromClient(
    @MessageBody() msg: MessageEntity,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    // try {
    //   await this.msgRepository.save(msg);
    // } catch (e) {
    //   client.to(client.id).emit('throwSendMessageError', e);
    //   return;
    // }
    const { fromId: toUid } = msg;
    const toSocket = this.socketStateService.get(toUid);
    if (toSocket) {
      this.logger.log(`send msg to ${toSocket.id}`);
      this.server.to(toSocket.id).emit('obtainMessageFromServer', msg);
    }
  }
}
