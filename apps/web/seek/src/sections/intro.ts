import { Element, html } from '@web-seek/elements'
import { BaseSection } from './base/section'

@Element('intro-section', { extends: 'section' })
export class IntroSection extends BaseSection {
  title = 'web-seek'

  innerHTML = html`
    <h1 slot="header" is="text-image">${this.title}</h1>

    <h3 slot="content">Envie sua talk, palestre e leve sua xícara</h3>
  `
}
