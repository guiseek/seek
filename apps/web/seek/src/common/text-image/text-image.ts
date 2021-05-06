import './style.scss'

export class TextImage extends HTMLHeadingElement {}
customElements.define('text-image', TextImage, { extends: 'h1' })
