import { routes } from './page'

const noop = () => null

const config = {
  slot: 'slot[name="outlet"]',
}

export const WebApp = (
  selector: string,
  options?: ElementDefinitionOptions,
  template?: HTMLTemplateElement
) => (target: CustomElementConstructor) => {
  const connectedCallback = target.prototype.connectedCallback ?? noop

  const route = location.pathname

  target.prototype.connectedCallback = function (): void {
    const clone = document.importNode(template.content, true)
    this.attachShadow({ mode: 'open' }).appendChild(clone)

    if (routes.get(route)) {
      const tag = routes.get(route)

      const root = this.shadowRoot as ShadowRoot
      const outlet = root.querySelector(config.slot)

      const child = document.createElement(tag)
      if (outlet) outlet.appendChild(child)

      connectedCallback.call(this)

      if (this.onBoot) {
        this.onBoot()
      }

      if (this.onChild) {
        this.onChild(child.shadowRoot)
      }
    }
  }

  customElements.define(selector, target, options)
}

export abstract class WebRoot extends HTMLElement {
  query<T extends HTMLElement>(query: keyof HTMLElementTagNameMap | string) {
    return this.shadowRoot.querySelector<T>(query)
  }

  queryAll<T extends HTMLElement>(query: keyof HTMLElementTagNameMap | string) {
    return this.shadowRoot.querySelectorAll<T>(query)
  }
}

export const createTemplate = (html: string): HTMLTemplateElement => {
  const template = document.createElement('template')
  template.innerHTML = html
  return template
}
