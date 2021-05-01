import { WebElementConfig } from '../core/element'
import { html } from '@guiseek/web-core'

import './app.element.scss'

@WebElementConfig('seek-peer-root')
export class AppElement extends HTMLElement {
  innerHTML = html`
    <video is="web-broadcast"></video>
    <video is="web-consumer"></video>
  `
}
