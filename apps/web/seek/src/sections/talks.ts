import { Element, html } from '@guiseek/web-elements'
import { BaseSection } from './base/section'

@Element('talks-section', { extends: 'section' })
export class TalksSection extends BaseSection {
  innerHTML = html`
    <h2 is="section-header">Talks</h2>
    <p is="section-content">
      Ut minim nisi dolore consectetur veniam eiusmod officia elit non ut cillum
      do. Sit officia exercitation id pariatur voluptate qui dolor excepteur
      exercitation. Enim sunt enim sunt Lorem aliquip fugiat ad. Ex consectetur
      consectetur labore Lorem eiusmod dolore sunt qui laborum laboris laborum.
      Enim consequat enim dolore tempor non. Pariatur qui commodo nisi labore
      velit in anim laboris veniam Lorem enim incididunt.
    </p>
  `
}
