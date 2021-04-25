import { WebRouter } from '@guiseek/web-router'
import { html } from '@guiseek/web-core'

const layout = html`
  <header slot="web-head">
    <h1>Web Router</h1>
  </header>

  <nav slot="web-nav">
    <ul class="menu">
      <li class="active">
        <a data-nav-to="/">Home</a>
      </li>
      <li>
        <a data-nav-to="/contact">Contact</a>
      </li>
    </ul>
  </nav>

  <web-page route="/" selector="home-page" active></web-page>
  <web-page route="/contact" selector="contact-page"></web-page>

  <footer slot="web-foot">
    <p>Page Router for Web Components</p>
  </footer>
`

export class AppElement extends WebRouter {
  constructor() {
    super(layout)
  }
}
customElements.define('seek-root', AppElement)

declare global {
  interface HTMLElementTagNameMap {
    'seek-root': AppElement
  }
}
