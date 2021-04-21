import { Element, html } from '@guiseek/web-core'

import './app.element.scss'

@Element({
  selector: 'web-profile-root',
  template: html`
    <seek-hero-banner></seek-hero-banner>

    <svg
      width="100%"
      height="100%"
      viewBox="30 -50 600 500"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <path id="path">
        <animate
          attributeName="d"
          from="m0,110 h0"
          to="m0,110 h1100"
          dur="6.8s"
          begin="0s"
          repeatCount="indefinite"
        />
      </path>
      <text
        font-size="26"
        font-family="Montserrat"
        fill="hsla(36, 95%, 85%, 1)"
      >
        <textPath xlink:href="#path">
          I'm An Animated Typing Example && I'm All SVG.
        </textPath>
      </text>
    </svg>
  `,
})
export class AppElement extends HTMLElement {
  public static observedAttributes = []

  connectedCallback() {
    console.log('opa')

    const title = 'web-profile'
  }
}
// customElements.define('web-profile-root', AppElement)
