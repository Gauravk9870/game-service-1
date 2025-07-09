import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('GamesGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected : ${client.id}`);
    client.emit('connected', '🟢 Welcome to the game!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('player-move')
  onPlayerMove(@MessageBody() data: any): string {
    this.logger.log(`Received move: ${JSON.stringify(data)}`);
    return `Server received move: ${JSON.stringify(data)}`;
  }
}
