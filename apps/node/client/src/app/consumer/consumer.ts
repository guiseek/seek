import { WebElementConfig, WebProp } from '../../core/element'
import { headers, servers } from '../common'

@WebElementConfig('web-consumer', { extends: 'video' })
export class WebConsumer extends HTMLVideoElement {
  static observedAttributes = ['autoplay', 'playsinline', 'muted']

  autoplay = true

  @WebProp()
  playsInline = true

  @WebProp()
  muted = true

  connectedCallback() {
    const button = document.createElement('button')
    button.textContent = 'Consumer'
    button.onclick = () => this.init()
    this.insertAdjacentElement('afterend', button)
  }

  async init() {
    const peer = this.createPeer()
    peer.addTransceiver('video', { direction: 'recvonly' })
  }

  createPeer() {
    const peer = new RTCPeerConnection(servers)
    peer.ontrack = (e) => (this.srcObject = e.streams[0])
    peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(peer)
    return peer
  }

  async handleNegotiationNeededEvent(peer: RTCPeerConnection) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)

    const body = JSON.stringify({ sdp: peer.localDescription })

    fetch('http://localhost:3333/api/consumer', {
      method: 'post',
      headers,
      body,
    })
      .then((res) => res.json())
      .then(({ sdp }: { sdp: RTCSessionDescription }) => {
        const desc = new RTCSessionDescription(sdp)
        peer.setRemoteDescription(desc).catch((e) => alert(e))
      })
  }
}
