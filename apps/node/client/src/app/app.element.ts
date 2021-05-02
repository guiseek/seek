import { WebElementConfig } from '../core/element'
import { html } from '@guiseek/web-core'
import { env } from './../envs/env'

import './app.element.scss'

@WebElementConfig('seek-peer-root')
export class AppElement extends HTMLElement {
  outlet: HTMLSlotElement

  element: HTMLVideoElement

  items = [
    { href: '/#/web-broadcast', label: 'Broadcast' },
    { href: '/#/web-consumer', label: 'Consumer' },
  ]

  getListItem({ href, label }) {
    return html`<li><a href="${href}">${label}</a></li>`
  }

  innerHTML = html`
    <nav>
      <ul>
        ${this.items.map(this.getListItem).join('')}
      </ul>
    </nav>

    <main>
      <slot name="outlet"></slot>
    </main>
  `

  connectedCallback() {
    const slotSelector = 'slot[name="outlet"]'
    this.outlet = this.querySelector(slotSelector)
    window.onpopstate = this.checkState.bind(this)
    this.checkState()
  }

  checkState() {
    const name = location.hash.replace(/#\//, '')
    if (name && name !== '/') {
      this.createElement(name)
    }
  }

  createElement(name: string) {
    this.element = document.createElement('video', { is: name })
    this.element.setAttribute('host', env.endpoint + '/' + name)
    this.element.setAttribute('is', name)
    this.changeRoute(this.element)
  }

  changeRoute(element: HTMLVideoElement) {
    this.outlet.innerHTML = ''
    this.outlet.appendChild(element)
  }
}
