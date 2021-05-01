/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as webrtc from 'wrtc'
import * as cors from 'cors'

const app = express()

app.use(cors())

let stream: MediaStream
const servers = {
  iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/consumer', async ({ body }, res) => {
  const peer: RTCPeerConnection = new webrtc.RTCPeerConnection(servers)

  const desc: RTCSessionDescription = new webrtc.RTCSessionDescription(body.sdp)
  await peer.setRemoteDescription(desc)

  stream.getTracks().forEach((track) => peer.addTrack(track, stream))

  const answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)
  const payload = { sdp: peer.localDescription }

  res.json(payload)
})

app.post('/api/broadcast', async ({ body }, res) => {
  const peer: RTCPeerConnection = new webrtc.RTCPeerConnection(servers)

  peer.ontrack = (e) => handleTrackEvent(e, peer)
  const desc: RTCSessionDescription = new webrtc.RTCSessionDescription(body.sdp)
  await peer.setRemoteDescription(desc)
  const answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)
  const payload = { sdp: peer.localDescription }

  res.json(payload)
})

function handleTrackEvent(e: RTCTrackEvent, peer: RTCPeerConnection) {
  stream = e.streams[0]
}

const port = process.env.port || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})

server.on('error', console.error)
