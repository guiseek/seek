export enum PeerEvent {
  Disconnected = 'peer-disconnected',
  Connected = 'peer-connected',
  JoinToRoom = 'join-to-room',
  JoinedToRoom = 'joined-to-room',
  ScreenShared = 'screen-shared',
  Message = 'peer-message',
  SdpAnswer = 'sdp-answer',
  SdpOffer = 'sdp-offer',
  Ice = 'ice',
}
