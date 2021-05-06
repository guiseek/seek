import { Element } from '@web-seek/elements'

@Element('section-content', { extends: 'p' })
export class SectionContent extends HTMLParagraphElement {
  connectedCallback() {
    this.classList.add('section__content')
    this.setAttribute('slot', 'content')
  }
}
