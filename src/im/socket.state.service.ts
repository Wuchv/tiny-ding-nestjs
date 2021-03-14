import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketStateService {
  private socketState = new Map<string, Socket>();

  public save(uid: string, socket: Socket) {
    this.socketState.set(uid, socket);
  }

  public remove(uid) {
    const existingSocket = this.socketState.get(uid);

    if (!existingSocket) {
      return;
    }

    this.socketState.delete(uid);
  }

  public get(uid: string): Socket {
    return this.socketState.get(uid) || null;
  }
}
