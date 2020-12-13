import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { PeerEvent, IPeerTransport } from '@seek-peer/core'
import { PeerSignalingLogger } from './peer-signaling.logger'
import { Server, Socket, Client } from 'socket.io'

@WebSocketGateway()
export class PeerSignalingGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: PeerSignalingLogger = new PeerSignalingLogger()

  sockets = new Map<string, Client>([])

  @WebSocketServer()
  server: Server

  @SubscribeMessage(PeerEvent.Message)
  onPeerMessage(socket: Socket, data: IPeerTransport) {
    this.logger.log(`Forward message ${JSON.stringify(data)}`)

    socket.broadcast.emit(PeerEvent.Message, data)
  }

  @SubscribeMessage(PeerEvent.JoinToRoom)
  onPeerJoin(socket: Socket) {
    this.logger.log(`joined to room: ${socket.id}`)

    socket.broadcast.emit(PeerEvent.JoinedToRoom, { id: socket.id })
  }

  handleConnection(socket: Socket, ...args: any[]) {
    this.sockets.set(socket.id, socket.client)

    this.logger.connected(socket.id, this.sockets.size)

    this.server.emit(PeerEvent.Connected, JSON.stringify(this.sockets.keys()))
    socket.broadcast.emit(
      PeerEvent.Connected,
      JSON.stringify(this.sockets.keys())
    )
  }
  handleDisconnect(socket: Socket) {
    if (this.sockets.has(socket.id)) {
      this.sockets.delete(socket.id)
    }
    this.logger.disconnected(socket.id, this.sockets.size)
    socket.broadcast.emit(PeerEvent.Disconnected, {
      id: socket.id,
    })
    socket.broadcast.emit(
      PeerEvent.Disconnected,
      JSON.stringify(this.sockets.keys())
    )
  }
}
