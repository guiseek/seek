import {
  html,
  Attr,
  OnConnect,
  OnChanges,
  RenderElement,
} from '@guiseek/web-core'

import './social-icon.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-social-icon': SocialIconElement
  }
}

@RenderElement({ selector: 'seek-social-icon' })
export class SocialIconElement
  extends HTMLElement
  implements OnConnect, OnChanges {
  static observedAttributes = ['href', 'use']

  @Attr()
  public href: string

  @Attr()
  public use: string

  private useEl: SVGUseElement

  render() {
    return html`
      <svg>
        <use xlink:href=""></use>
      </svg>
    `
  }

  onConnect(): void {
    this.useEl = this.querySelector('use')
    console.log('this.useEl: ', this.useEl)

    this.attrSwapped()
  }

  onChanges(): void {
    if (this.useEl) this.attrSwapped()
  }

  attrSwapped() {
    const href = `${this.href}#${this.use}`
    this.useEl.setAttribute('xlink:href', href)
  }
}
