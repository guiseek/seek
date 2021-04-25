import { WebRouter, webRouter } from './web-router'
import { html } from '@guiseek/web-core'
import { WebPage } from './web-page'

// Page A
const pageATmpl = `Page A`
class PageA extends WebPage {
  constructor() {
    super()
    this.attach(pageATmpl)
  }
}
customElements.define('a-page', PageA)

// Page B
const pageBTmpl = `Page B`
class PageB extends WebPage {
  constructor() {
    super()
    this.attach(pageBTmpl)
  }
}
customElements.define('b-page', PageB)

const layout = html`
  <nav slot="web-nav">
    <ul class="menu">
      <li class="active"><a data-nav-to="/">Home</a></li>
      <li><a data-nav-to="/contact">Contact</a></li>
    </ul>
  </nav>

  <web-page route="/" selector="a-page"></web-page>
  <web-page route="/b" selector="b-page"></web-page>
`
export class WebApp extends WebRouter {
  constructor() {
    super(layout)
  }
}
customElements.define('web-app', WebApp)

describe('webRouter', () => {
  it('should work', () => {
    expect(webRouter()).toEqual('web-router')
  })
  it('should page A check if defined', async () => {
    await customElements.whenDefined('a-page')
    const pageA = customElements.get('a-page')
    expect(pageA).toBeDefined()
  })

  it('should page B check if defined', async () => {
    await customElements.whenDefined('b-page')
    const pageB = customElements.get('b-page')
    expect(pageB).toBeDefined()
  })

  it('should web App check if defined', async () => {
    await customElements.whenDefined('web-app')
    const webApp = customElements.get('web-app')
    expect(webApp).toBeDefined()
  })

  it('should web App check if defined', async () => {
    await customElements.whenDefined('web-app')
    const webApp = customElements.get('web-app')
    console.log(webApp.innerHTML)

    expect(webApp).toBeDefined()
  })
})
