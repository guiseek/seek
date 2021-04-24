import { ExtendElement, OnConnect } from '@guiseek/web-core'
import { errorMessage } from '../../common'

@ExtendElement({
  selector: 'seek-video',
  extend: 'video',
})
export class VideoElement extends HTMLVideoElement implements OnConnect {
  autoplay = true

  errorSpan: HTMLSpanElement

  onConnect(): void {
    this.errorSpan = document.createElement('span')
    this.errorSpan.id = 'video-error'
    this.insertAdjacentElement('afterend', this.errorSpan)
  }

  start(): Promise<void | MediaProvider> {
    return navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then(this.handleSuccess, this.handleError)
  }

  handleSuccess = (stream: MediaStream) => {
    this.srcObject = stream
    stream.getVideoTracks()[0].onended = (ended) => {
      const message = 'Você parou de compartilhar a tela'
      errorMessage(this.errorSpan, message)
    }
    return stream
  }

  handleError = (error: Error) => {
    const message = `getDisplayMedia: ${error.name}`
    errorMessage(this.errorSpan, message, error)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'seek-video': VideoElement
  }
  interface MediaDevices extends EventTarget {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
  }
}
