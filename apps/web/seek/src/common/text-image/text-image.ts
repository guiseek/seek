import './style.scss'

export class TextImage extends HTMLHeadingElement {
  static observedAttributes = ['url']

  url = '/assets/maringa-laranja.jpeg'

  connectedCallback() {
    if (this.url && typeof this.url === 'string') {
      this.style.backgroundImage = `url(${this.url})`
    }
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    this[name] = next
  }
}
customElements.define('text-image', TextImage, { extends: 'h1' })
