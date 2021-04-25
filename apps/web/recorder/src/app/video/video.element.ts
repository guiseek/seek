import { WebElementConfig, WebProp } from '../element'

@WebElementConfig('web-video', { extends: 'video' })
export class VideoElement extends HTMLVideoElement {
  static observedAttributes = ['autoplay', 'mode', 'width']

  @WebProp()
  autoplay = true

  @WebProp()
  mode: 'user' | 'display' = 'display'

  @WebProp()
  width = 640

  start() {
    return this.mode === 'user'
      ? navigator.mediaDevices.getUserMedia({ video: true })
      : navigator.mediaDevices.getDisplayMedia({ video: true })
  }

  connectedCallback() {
    console.log(this.mode)
  }
}
