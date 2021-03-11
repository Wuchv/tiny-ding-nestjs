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

@WebSocketGateway({ namespace: 'im', transports: ['websocket'] })
export class ImGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ImGateway');

  afterInit() {
    this.logger.log('ImGateway Init');
  }

  async handleConnection(@ConnectedSocket() client: Socket): Promise<any> {
    this.logger.log(`Client connected: ${client.id}`);
    // const userRoom = client.handshake.query;
    return client.id;
  }

  async handleDisconnect(@ConnectedSocket() client: Socket): Promise<any> {
    this.logger.log(`Client disconnected: ${client.id}`);
    return client.id;
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    this.logger.log('message');
    return { event: 'message', data };
  }
}
