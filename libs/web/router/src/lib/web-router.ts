import { WebConfig } from './interfaces/web-config'
import { mergeConfig } from './config/default'
import { WebPage } from './web-page'

export function webRouter(): string {
  return 'web-router'
}

export class WebRouter extends HTMLElement {
  /**
   * Web router configuration
   *
   * @type {WebConfig}
   * @memberof WebRouter
   */
  readonly config: WebConfig

  /**
   * Navigation menu items
   *
   * @type {NodeListOf<HTMLLIElement>}
   * @memberof WebRouter
   */
  items: NodeListOf<HTMLLIElement>

  /**
   * Navigation slots to web pages
   *
   * @type {NodeListOf<HTMLSlotElement>}
   * @memberof WebRouter
   */
  slots: NodeListOf<HTMLSlotElement>

  /**
   * Web page routes application
   *
   * @type {NodeListOf<WebPage>}
   * @memberof WebRouter
   */
  pages: NodeListOf<WebPage>

  /**
   * Assign html from string
   *
   * @readonly
   * @type {string} innerHTML
   * @memberof WebRouter
   */

  readonly innerHTML: string

  constructor(html: string, config?: WebConfig) {
    super()
    this.innerHTML = html
    this.config = mergeConfig(config)

    const shadowRoot = this.attachShadow({ mode: 'open' })
    const template = this._cloneTemplateNode(this.config.templateId)
    shadowRoot.appendChild(template)

    this.items = this.querySelectorAll(this.config.itemSelector)
    this.pages = this.querySelectorAll(this.config.pageSelector)
    this.slots = this.shadowRoot.querySelectorAll('slot')

    this.items.forEach(this._handleOnClick)
    this.slots.forEach(this._handleOnChange)
  }

  connectedCallback() {
    const active = Array.from(this.items).find((item) =>
      item.classList.contains('active')
    )
    if (active && active.hasChildNodes()) {
      setTimeout(() => active.click(), 100)
    }
  }

  private _handleOnClick = (item: HTMLLIElement) => {
    item.onclick = () => {
      this.items.forEach((item) => this._removeActive(item))
      this.pages.forEach((page) => this._updateRoute(page, item))
    }
  }

  private _removeActive(item: HTMLLIElement) {
    item.classList.remove(this.config.activeClass)
  }

  private _updateRoute(page: WebPage, item: HTMLLIElement) {
    page.removeAttribute('slot')
    const route = item.querySelector('a').dataset.navTo

    if (page.getAttribute('route') === route) {
      page.innerHTML = ''

      const tag = page.getAttribute('selector')
      const child = document.createElement(tag) as WebPage

      child.setProps({
        route: page.route,
        params: page.params,
        selector: page.selector,
      })

      page.appendChild(child)

      page.setAttribute('slot', 'web-main')

      item.classList.add(this.config.activeClass)
    }
  }

  private _handleOnChange = (slot: HTMLSlotElement) => {
    if (slot.name === 'web-main') {
      slot.addEventListener('slotchange', () => {
        const page = slot.assignedNodes().shift() as WebPage

        const { route, params, selector } = page
        const props = { route, params, selector }

        const child = page.firstChild as WebPage

        if (page.hasChildNodes()) {
          child.setProps(props)
        }

        const payload = { detail: { page, child, props } }
        const event = new CustomEvent('route-change', payload)

        this.dispatchEvent(event)
      })
    }
  }

  private _cloneTemplateNode(id: string) {
    let templateElement: HTMLTemplateElement

    templateElement = document.querySelector(id)
    const templateContent = templateElement.content

    return templateContent.cloneNode(true)
  }
}
