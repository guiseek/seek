import { WebElementConfig } from './core/element'
import { WebPage, routes } from './core/page'
import { html } from '@guiseek/web-core'
import './app.element.scss'

@WebElementConfig('app-page')
export class AppElement extends WebPage {
  constructor() {
    super(html`<main id="outlet"></main>`)

    const route = location.pathname

    if (routes.get(route)) {
      const tag = routes.get(route)
      const page = document.createElement(tag)

      const outlet = this.query('#outlet')
      if (outlet) outlet.appendChild(page)
    }
  }
  connectedCallback() {
    const links = this.queryAll('ul.menu-bar li')
    if (links.length) this.toggleLinks(links)
  }

  toggleLinks(links: NodeListOf<HTMLElement>) {
    links.forEach((link) => {
      const classList = document.body.classList
      link.onmouseover = () => classList.toggle('invert')
      link.onmouseout = () => classList.toggle('invert')
    })
  }
}
