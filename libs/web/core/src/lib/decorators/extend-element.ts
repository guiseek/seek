import { ExtendElementConfig } from './../types'
import {
  noop,
  applyInjectors,
  validateExtend,
  validateSelector,
} from './../utilities'

export const ExtendElement = (config: ExtendElementConfig) => (
  target: CustomElementConstructor
) => {
  validateSelector(config)
  validateExtend(config)

  const connectedCallback = target.prototype.connectedCallback ?? noop
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop

  target.prototype.connectedCallback = function () {
    if (this.onInit) {
      this.onInit()
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
    if (prev !== next) {
      this[name] = next
    }

    /**
     * Caso tenha um método onChanges
     * executa encaminhando os valores
     */
    if (this.onChanges) {
      this.onChanges({
        name,
        prev,
        next,
      })
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

  customElements.define(config.selector, target, { extends: config.extend })
}
