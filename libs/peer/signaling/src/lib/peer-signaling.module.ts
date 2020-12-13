import { PeerSignalingGateway } from './peer-signaling.gateway'
import { PeerSignalingLogger } from './peer-signaling.logger'
import { Module } from '@nestjs/common'

@Module({
  providers: [PeerSignalingGateway, PeerSignalingLogger],
})
export class PeerSignalingModule {}
