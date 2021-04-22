import { ExtendElement } from '@guiseek/web-core'

import './font-flame.element.scss'

@ExtendElement({
  selector: 'seek-flame',
  extend: 'p',
})
export class FontFlameElement extends HTMLParagraphElement {
  constructor() {
    super()
    this.classList.add('blazing')
  }
}
