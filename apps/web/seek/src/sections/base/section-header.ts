import { Element } from '@web-seek/elements'

@Element('section-header', { extends: 'h2' })
export class SectionHeader extends HTMLHeadingElement {
  connectedCallback() {
    this.classList.add('section__header')
    this.setAttribute('slot', 'header')
  }
}
