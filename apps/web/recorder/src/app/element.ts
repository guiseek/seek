import 'reflect-metadata'

export const WebElementConfig = (
  selector: string,
  options?: ElementDefinitionOptions
) => (target: CustomElementConstructor) => {
  customElements.define(selector, target, options)
}

export function WebProp(): any {
  return (target: any) => {
    target.attributeChangedCallback = function (
      name: string,
      prev: string,
      next: string
    ) {
      this[name] = next
    }
  }
}

export abstract class WebElement extends HTMLElement {
  _shadowRoot: ShadowRoot

  set shadowRoot(value: ShadowRoot) {
    this._shadowRoot = value
  }

  get shadowRoot() {
    return this._shadowRoot
  }

  constructor(html: string = '') {
    super()
    const template = document.createElement('template')
    template.innerHTML = html

    this.shadowRoot = this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
