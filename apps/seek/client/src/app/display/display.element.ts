import { Element, html, OnConnect } from '@guiseek/web-core'
import adapter from 'webrtc-adapter'

import './display.element.scss';

declare global {
  interface HTMLElementTagNameMap {
    'seek-display': DisplayElement
  }
  interface MediaDevices extends EventTarget {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
  }
}

function errorMsg(msg: string, error?: Error) {
  const errorElement = document.querySelector('#errorMsg')
  errorElement.innerHTML += `<p>${msg}</p>`
  if (typeof error !== 'undefined') {
    console.error(error)
  }
}

@Element({
  selector: 'seek-display',
  template: html`
    <h1>Seek Tips</h1>
    <video id="gum-local" autoplay playsinline muted></video>
    <button id="startButton" disabled>Start</button>

    <div id="errorMsg"></div>
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
      errorMsg('getDisplayMedia is not supported')
    }
  }

  handleSuccess = (stream: MediaStream) => {
    this.startButton.disabled = true
    const video = document.querySelector('video')
    video.srcObject = stream

    // demonstrates how to detect that the user has stopped
    // sharing the screen via the browser UI.
    stream.getVideoTracks()[0].addEventListener('ended', () => {
      errorMsg('The user has ended sharing the screen')
      this.startButton.disabled = false
    })
  }

  handleError(error: Error) {
    errorMsg(`getDisplayMedia error: ${error.name}`, error)
  }
}
