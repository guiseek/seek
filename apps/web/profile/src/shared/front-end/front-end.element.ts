import { Element, html } from '@guiseek/web-core'

import './front-end.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-front-end': FrontEndElement
  }
}

@Element({
  selector: 'seek-front-end',
  template: html`
    <div id="browser"></div>
    <div id="pages"></div>
    <div id="templates"></div>
    <div id="organisms"></div>
    <div id="molecules"></div>
    <div id="atoms"></div>
  `,
})
export class FrontEndElement extends HTMLElement {
  constructor() {
    super()
    this.classList.add('seek-front-end')
  }
}
