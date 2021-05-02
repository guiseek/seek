import { WebElementConfig, WebProp } from '../core/element'
import { headers, servers } from './common'

@WebElementConfig('web-broadcast', { extends: 'video' })
export class WebBroadcast extends HTMLVideoElement {
  static observedAttributes = ['host', 'autoplay', 'playsinline', 'muted']

  autoplay = true

  @WebProp()
  playsInline = true

  @WebProp()
  muted = true

  @WebProp()
  host = '/api/web-broadcast'

  connectedCallback() {
    const button = document.createElement('button', { is: 'mac-button' })
    button.textContent = 'Broadcast'
    button.onclick = () => this.init()
    this.insertAdjacentElement('afterend', button)
  }

  init() {
    console.log(this.host)

    this.getUserMedia({ video: true }).then((stream) => {
      this.srcObject = stream
      const peer = new RTCPeerConnection(servers)
      peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(peer)
      stream.getTracks().forEach((track) => peer.addTrack(track, stream))
    })
  }

  getUserMedia(constraints: MediaStreamConstraints) {
    return navigator.mediaDevices.getUserMedia(constraints)
  }

  async handleNegotiationNeededEvent(peer: RTCPeerConnection) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)

    const body = JSON.stringify({ sdp: peer.localDescription })

    fetch(this.host, { method: 'post', headers, body })
      .then((res) => res.json())
      .then(({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
        const desc = new RTCSessionDescription(sdp)
        peer.setRemoteDescription(desc).catch((e) => alert(e))
      })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'web-broadcast': WebBroadcast
  }
}
