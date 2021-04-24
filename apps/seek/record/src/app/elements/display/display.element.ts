import { Element, html, OnConnect } from '@guiseek/web-core'
import { errorMessage } from '../../common/error-message'
import adapter from 'webrtc-adapter'

import './display.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-display': DisplayElement
  }
  interface MediaDevices extends EventTarget {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
  }
}

@Element({
  selector: 'seek-display',
  template: html`
    <h1>Seek Records</h1>
    <video id="gum-local" autoplay playsinline muted></video>
    <button id="startButton" disabled>Start</button>

    <div id="error"></div>
  `,
})
export class DisplayElement extends HTMLElement implements OnConnect {
  startButton: HTMLButtonElement

  onConnect(): void {
    this.startButton = this.querySelector('button')

    this.startButton.onclick = () => {
      navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then(this.handleSuccess, this.handleError)
    }

    if (navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices) {
      this.startButton.disabled = false
    } else {
      errorMessage(
        this.querySelector('#error'),
        'getDisplayMedia is not supported'
      )
    }
  }

  handleSuccess = (stream: MediaStream) => {
    this.startButton.disabled = true
    const video = document.querySelector('video')
    video.srcObject = stream

    stream.getVideoTracks().shift().onended = (ended) => {
      errorMessage(
        this.querySelector('#error'),
        'The user has ended sharing the screen'
      )
      this.startButton.disabled = false
    }
  }

  handleError = (error: Error) => {
    errorMessage(
      this.querySelector('#error'),
      `getDisplayMedia error: ${error.name}`,
      error
    )
  }
}
