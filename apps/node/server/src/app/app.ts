import { Response } from 'express'
import * as webrtc from 'wrtc'

let stream: MediaStream

const servers = {
  iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
}

export const webConsumer = async ({ body }, res: Response) => {
  console.log(body)

  const peer: RTCPeerConnection = new webrtc.RTCPeerConnection(servers)

  const desc = new webrtc.RTCSessionDescription(body.sdp)
  await peer.setRemoteDescription(desc)

  stream.getTracks().forEach((track) => peer.addTrack(track, stream))

  const answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)
  const payload = { sdp: peer.localDescription }

  res.json(payload)
}

export const webBroadcast = async ({ body }, res: Response) => {
  console.log(body)
  const peer: RTCPeerConnection = new webrtc.RTCPeerConnection(servers)

  peer.ontrack = (e) => handleTrackEvent(e, peer)
  const desc = new webrtc.RTCSessionDescription(body.sdp)
  await peer.setRemoteDescription(desc)
  const answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)
  const payload = { sdp: peer.localDescription }

  res.json(payload)
}

function handleTrackEvent(e: RTCTrackEvent, peer: RTCPeerConnection) {
  stream = e.streams[0]
}
