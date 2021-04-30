import { html } from '@guiseek/web-core'
import './app.element.scss'

export class AppElement extends HTMLElement {
  public static observedAttributes = []

  connectedCallback() {
    this.innerHTML = html`
      <main>
        <transfer-page></transfer-page>
      </main>
    `
  }
}
customElements.define('seek-peer-root', AppElement)
