import { WebPage, WebPageConfig, routes } from './page'
import { style } from './app.style'
import { tmpl } from './app.tmpl'

import './app.element.scss'
import { html } from '@guiseek/web-core'

@WebPageConfig('/', 'app-page')
export class AppPage extends WebPage {
  constructor() {
    super(html`<video-page></video-page>`)
    // super(html`<transfer-page></transfer-page>`)

    const route = location.pathname

    if (routes.get(route) && route !== '/') {
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
