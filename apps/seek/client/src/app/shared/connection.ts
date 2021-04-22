export class Connection {
  signaler = {
    onmessage: async ({ data: { description, candidate } }) => {
      return new Promise((resolve, reject) => resolve(null))
    },
    send: ({ description: RTCSessionDescription }) => {
      return null
    },
  }

  pc: RTCPeerConnection

  handle() {
    let ignoreOffer = false

    let makingOffer = false

    let polite

    this.pc.onnegotiationneeded = async () => {
      try {
        makingOffer = true
        await this.pc.setLocalDescription({})
        this.signaler.send({ description: this.pc.localDescription })
      } catch (err) {
        console.error(err)
      } finally {
        makingOffer = false
      }
    }

    this.signaler.onmessage = async ({ data: { description, candidate } }) => {
      try {
        if (description) {
          const offerCollision =
            description.type == 'offer' &&
            (makingOffer || this.pc.signalingState != 'stable')

          ignoreOffer = !polite && offerCollision
          if (ignoreOffer) {
            return
          }

          await this.pc.setRemoteDescription(description)
          if (description.type == 'offer') {
            await this.pc.setLocalDescription({})
            this.signaler.send({ description: this.pc.localDescription })
          }
        } else if (candidate) {
          try {
            await this.pc.addIceCandidate(candidate)
          } catch (err) {
            if (!ignoreOffer) {
              throw err
            }
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
