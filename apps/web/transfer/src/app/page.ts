import 'reflect-metadata'

export const routes = new Map<string, string>()

export const WebPageConfig = (path: string, selector: string) => (
  target: typeof WebPage & CustomElementConstructor
) => {
  /* Registra rota e seletor */
  routes.set(path, selector)
  /* Define web component */
  customElements.define(selector, target)
}

export abstract class WebPage extends HTMLElement {
  _shadowRoot: ShadowRoot
  set shadowRoot(value: ShadowRoot) {
    this._shadowRoot = value
  }
  get shadowRoot() {
    return this._shadowRoot
  }

  constructor(html: string = '', mode: ShadowRootMode = 'open') {
    super()
    this.shadowRoot = this.attachShadow({ mode })
    const template = document.createElement('template')
    template.innerHTML = html

    const clone = template.content.cloneNode(true)
    this.shadowRoot.appendChild(clone)
  }

  query<T extends HTMLElement>(query: keyof HTMLElementTagNameMap | string) {
    return this.shadowRoot.querySelector<T>(query)
  }

  queryAll<T extends HTMLElement>(query: keyof HTMLElementTagNameMap | string) {
    return this.shadowRoot.querySelectorAll<T>(query)
  }
}
