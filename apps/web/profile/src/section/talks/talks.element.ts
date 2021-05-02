import { Element, html } from '@guiseek/web-core'

@Element({
  selector: 'seek-talks',
  template: html`
    <ul>
      <li>
        <iframe
          src="https://slides.com/guilhermesiquinelli/webrtc/embed?style=light"
          width="576"
          height="420"
          scrolling="no"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        ></iframe>
      </li>
    </ul>
  `,
})
export class TalksElement extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'seek-talks': TalksElement
  }
}
