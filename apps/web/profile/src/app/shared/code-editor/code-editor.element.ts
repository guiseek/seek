import { Element, html } from '@guiseek/web-core'

import './code-editor.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-code-editor': CodeEditorElement
  }
}

@Element({
  selector: 'seek-code-editor',
  template: html`
    <div id="browser"></div>
    <div id="editor"></div>
    <div id="file"></div>
    <div id="code"></div>
    <div id="lib"></div>
    <div id="lang"></div>
  `,
})
export class CodeEditorElement extends HTMLElement {
  constructor() {
    super()
    this.classList.add('seek-code-editor')
  }
}
