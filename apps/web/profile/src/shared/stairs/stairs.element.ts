import { Element, html } from '@guiseek/web-core'

import './stairs.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-stairs': StairsElement
  }
}

@Element({
  selector: 'seek-stairs',
  template: html`
    <ul class="words">
      <li class="words-line">
        <p>&nbsp;</p>
        <p>CSS Only</p>
      </li>
      <li class="words-line">
        <p>CSS Only</p>
        <p>Perspective</p>
      </li>
      <li class="words-line">
        <p>Perspective</p>
        <p>Text Effect</p>
      </li>
      <li class="words-line">
        <p>Text Effect</p>
        <p>by</p>
      </li>
      <li class="words-line">
        <p>by</p>
        <p>James</p>
      </li>
      <li class="words-line">
        <p>James</p>
        <p>Bosworth</p>
      </li>
      <li class="words-line">
        <p>Bosworth</p>
        <p>&nbsp;</p>
      </li>
    </ul>
  `,
})
export class StairsElement extends HTMLElement {}
