import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketStateService } from './socket.state.service';

@WebSocketGateway({ namespace: 'im', transports: ['websocket'] })
export class ImGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly socketStateService: SocketStateService) {}

  private logger: Logger = new Logger('ImGateway');

  afterInit() {
    this.logger.log('ImGateway Init');
  }

  async handleConnection(@ConnectedSocket() client: Socket): Promise<any> {
    const { uid } = client.handshake.query;
    if (uid) {
      this.socketStateService.save(uid, client);
    }
    return uid;
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<any> {
    const { uid } = client.handshake.query;
    if (uid) {
      this.socketStateService.remove(uid);
    }
    return client.id;
  }

  @SubscribeMessage('sendMessageToServer')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    console.log(data);
    return { event: 'message', data };
  }
}
