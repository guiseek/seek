import './app.element.scss'

export class AppElement extends HTMLElement {
  public static observedAttributes = []
  vid1: HTMLVideoElement
  vid2: HTMLVideoElement

  callButton: HTMLButtonElement
  acceptButton: HTMLButtonElement
  hangUpButton: HTMLButtonElement

  pc1: RTCPeerConnection
  pc2: RTCPeerConnection

  localStream: MediaStream
  remoteStream: MediaStream

  offerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  }

  constructor() {
    super()

    this.innerHTML = `

    <section>
      <video id="vid1" playsinline autoplay muted></video>
      <video id="vid2" playsinline autoplay></video>
    </section>

    <nav>
      <button id="callButton">Call</button>
      <button id="acceptButton">Accept</button>
      <button id="hangUpButton">Hang Up</button>
    </nav>

    `
  }

  connectedCallback() {
    const title = 'web-phone'
    this.vid1 = this.querySelector('#vid1')
    this.vid2 = this.querySelector('#vid2')

    this.callButton = this.querySelector('#callButton')
    this.acceptButton = this.querySelector('#acceptButton')
    this.hangUpButton = this.querySelector('#hangUpButton')

    this.callButton.addEventListener('click', () => this.start())
    this.acceptButton.addEventListener('click', () => this.accept())
    this.hangUpButton.addEventListener('click', () => this.stop())

    this.callButton.disabled = true
    this.acceptButton.disabled = true
    this.hangUpButton.disabled = true

    this.remoteStream = new MediaStream()

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((s) => this.gotStream(s))
      .catch((e) => alert(e))
  }

  gotStream(stream: MediaStream) {
    console.log('Received local stream')
    this.vid1.srcObject = stream
    this.localStream = stream
    this.callButton.disabled = false
  }

  start = () => {
    this.callButton.disabled = true
    this.acceptButton.disabled = false
    this.hangUpButton.disabled = false
    console.log('Starting call')

    const videoTracks = this.localStream.getVideoTracks()
    const audioTracks = this.localStream.getAudioTracks()
    if (videoTracks.length > 0) {
      console.log(`Using video devicee: ${videoTracks[0].label}`)
    }
    if (audioTracks.length > 0) {
      console.log(`Using audio devicee: ${audioTracks[0].label}`)
    }

    const servers = null

    this.pc1 = new RTCPeerConnection(servers)
    console.log('created local peer connection object pc1')

    this.pc2 = new RTCPeerConnection(servers)
    console.log('created remote peer connection object pc2')

    this.pc2.onicecandidate = (e) => this.onIceCandidate(this.pc2, e)
    this.pc2.ontrack = (e) => this.gotRemoteStream(e)

    this.localStream
      .getTracks()
      .forEach((track) => this.pc1.addTrack(track, this.localStream))
    console.log('Adding Local Stream to peer connection')

    this.pc1
      .createOffer(this.offerOptions)
      .then(this.gotDescription1, this.onCreateSessionDescriptionError)
  }

  onCreateSessionDescriptionError(error: Error) {
    console.log(`Failed to create session description: ${error.toString()}`)
    this.stop()
  }

  onCreateAnswerError(error: Error) {
    console.log(`Failed to set createAnswer: ${error.toString()}`)
    stop()
  }

  onSetLocalDescriptionError(error: Error) {
    console.log(`Failed to set setLocalDescription: ${error.toString()}`)
    this.stop()
  }

  onSetLocalDescriptionSuccess() {
    console.log('localDescription success.')
  }

  gotDescription1 = (desc: RTCSessionDescriptionInit) => {
    this.pc1
      .setLocalDescription(desc)
      .then(this.onSetLocalDescriptionSuccess, this.onSetLocalDescriptionError)
    console.log(`Offer from pc1\n${desc.sdp}`)
    this.pc2.setRemoteDescription(desc)
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2
      .createAnswer()
      .then(this.gotDescription2, this.onCreateSessionDescriptionError)
  }

  gotDescription2 = (desc: RTCSessionDescriptionInit) => {
    // Provisional answer, set a=inactive & set sdp type to pranswer.
    desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive')
    desc.type = 'pranswer'
    this.pc2
      .setLocalDescription(desc)
      .then(this.onSetLocalDescriptionSuccess, this.onSetLocalDescriptionError)
    console.log(`Pranswer from pc2\n${desc.sdp}`)
    this.pc1.setRemoteDescription(desc)
  }

  gotDescription3 = (desc: RTCSessionDescriptionInit) => {
    // Final answer, setting a=recvonly & sdp type to answer.
    desc.sdp = desc.sdp.replace(/a=inactive/g, 'a=recvonly')
    desc.type = 'answer'
    this.pc2
      .setLocalDescription(desc)
      .then(this.onSetLocalDescriptionSuccess, this.onSetLocalDescriptionError)
    console.log(`Answer from pc2\n${desc.sdp}`)
    this.pc1.setRemoteDescription(desc)
  }

  accept = () => {
    this.pc2.createAnswer().then(this.gotDescription3, this.onCreateAnswerError)
    this.acceptButton.disabled = true
    this.callButton.disabled = true
  }

  stop() {
    console.log('Ending Call' + '\n\n')
    this.pc1.close()
    this.pc2.close()
    this.pc1 = null
    this.pc2 = null
    this.localStream.getTracks().forEach((t) => t.stop())
    this.acceptButton.disabled = true
    this.callButton.disabled = false
    this.hangUpButton.disabled = true
  }

  gotRemoteStream(e) {
    this.vid2.srcObject = this.remoteStream
    this.pc2.addTrack(e.track, this.remoteStream)
    // this.remoteStream.addTrack(e.track, this.remoteStream);
    this.remoteStream.addTrack(e.track)
  }

  getOtherPc(pc: RTCPeerConnection) {
    return pc === this.pc1 ? this.pc2 : this.pc1
  }

  getName(pc: RTCPeerConnection) {
    return pc === this.pc1 ? 'pc1' : 'pc2'
  }

  onIceCandidate(pc: RTCPeerConnection, event: RTCPeerConnectionIceEvent) {
    this.getOtherPc(pc)
      .addIceCandidate(event.candidate)
      .then(
        () => this.onAddIceCandidateSuccess(pc),
        (err) => this.onAddIceCandidateError(pc, err)
      )
    console.log(
      `${this.getName(pc)} ICE candidate:\n${
        event.candidate ? event.candidate.candidate : '(null)'
      }`
    )
  }

  onAddIceCandidateSuccess(pc: RTCPeerConnection) {
    console.log('AddIceCandidate success.')
  }

  onAddIceCandidateError(pc: RTCPeerConnection, error: Error) {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`)
  }
}
customElements.define('seek-peer-root', AppElement)
