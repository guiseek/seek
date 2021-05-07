import { Element } from '@guiseek/web-elements'

@Element('section-header', { extends: 'h2' })
export class SectionHeader extends HTMLHeadingElement {
  connectedCallback() {
    this.classList.add('section__header')
    this.setAttribute('slot', 'header')
  }
}
