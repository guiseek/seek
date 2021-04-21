import { applyInjectors, noop, validateSelector } from '../utilities'
import { RenderElementConfig } from '../types'

export const RenderElement = (config: RenderElementConfig) => (
  target: CustomElementConstructor
) => {
  validateSelector(config)

  const connectedCallback = target.prototype.connectedCallback ?? noop
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop

  const render = target.prototype.render

  const template = document.createElement('template')

  target.prototype.connectedCallback = function () {
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

  target.prototype.attributeChangedCallback = function (
    name: string,
    prev: string,
    next: string
  ) {
    if (this[name] !== next) {
      this[name] = next
    }

    /**
     * Verificar conflito com @Attr
     */
    // attributeChangedCallback.call(name, prev, next);
    if (this.render) {
      this.innerHTML = render.call(this)
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
