import 'reflect-metadata'

export const Element = (
  selector: string,
  options?: ElementDefinitionOptions
) => (target: CustomElementConstructor) => {
  customElements.define(selector, target, options)
}

export function attr(): any {
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

  constructor(html = '', mode: ShadowRootMode = 'open') {
    super()

    if (html) {
      const template = document.createElement('template')
      template.innerHTML = html

      this.shadowRoot = this.attachShadow({ mode })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }
}

//
export function webSeekElements(): string {
  return 'web-seek-elements'
}
