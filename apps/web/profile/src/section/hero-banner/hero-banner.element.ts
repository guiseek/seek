import { Element, html, OnConnect, OnDestroy } from '@guiseek/web-core'
import { getX, getY } from '../../shared/parallax-effect'

import './hero-banner.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-hero-banner': HeroBannerElement
  }
}

@Element({
  selector: 'seek-hero-banner',
  template: html`
    <seek-front-end></seek-front-end>
    <seek-code-editor></seek-code-editor>
    <header>
      <h1>Guilherme Siquinelli</h1>
      <h2>
        This web page is
        <span
          is="txt-rotate"
          period="1000"
          rotate='[  "my profile", "web components", "custom elements", "pure native technology", "pretty", "fun!" ]'
        ></span>
      </h2>
    </header>
  `,
})
export class HeroBannerElement
  extends HTMLElement
  implements OnConnect, OnDestroy {
  swapPositions: (pos: Record<'x' | 'y', number>) => void

  onConnect(): void {
    this.swapPositions = ({ x, y }) => {
      this.style.setProperty('--x', String(getX(x)))
      this.style.setProperty('--y', String(getY(y)))
    }

    this.addEventListener('pointermove', this.swapPositions)
  }

  onDestroy(): void {
    this.removeEventListener('pointermove', this.swapPositions)
  }
}
