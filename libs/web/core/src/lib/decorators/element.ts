import { ElementConfig } from '../types'
import {
  noop,
  applyInjectors,
  validateSelector,
  validateTemplate,
} from '../utilities'

export const Element = (config: ElementConfig) => (
  target: CustomElementConstructor
) => {
  validateSelector(config)
  validateTemplate(config)

  const connectedCallback = target.prototype.connectedCallback ?? noop
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop

  const template = document.createElement('template')

  if (config.style) {
    config.template = `${config.style} ${config.template}`
  }

  template.innerHTML = config.template

  target.prototype.connectedCallback = function (): void {
    const clone = document.importNode(template.content, true)

    if (config.useShadow) {
      this.attachShadow({ mode: 'open' }).appendChild(clone)
    } else {
      this.appendChild(clone)
    }

    connectedCallback.call(this)

    /** Coleta dependências para injeção */
    if (config.providers && this.onInject) {
      this.onInject(applyInjectors(config))
    }

    if (this.onConnect) {
      this.onConnect()
    }
  }

  target.prototype.disconnectedCallback = function () {
    if (this.beforeDestroy) {
      this.beforeDestroy()
    }
    disconnectedCallback.call(this)
    if (this.onDestroy) {
      this.onDestroy()
    }
  }

  customElements.define(config.selector, target)
}
