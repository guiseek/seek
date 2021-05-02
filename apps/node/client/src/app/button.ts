import { WebElementConfig, WebProp } from '../core/element'
import { html } from '@guiseek/web-core'

@WebElementConfig('mac-button', { extends: 'button' })
export class MacButton extends HTMLButtonElement {
  static observedAttributes = ['textContent']

  type = 'button'

  @WebProp()
  textContent: string

  innerHTML = html`
    <div class="button__content">
      <div class="button__icon">
        <img src="assets/button.svg" />
      </div>
      <p class="button__text">play</p>
    </div>
  `
  connectedCallback() {
    this.classList.add('button')
    const text = this.querySelector('.button__text')
    text.textContent = this.textContent ?? 'play'
    if (this.textContent === undefined) {
      this.disabled = true
    }
  }
}
