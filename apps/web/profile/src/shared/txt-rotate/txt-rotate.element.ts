import {
  Attr,
  OnChanges,
  OnDestroy,
  OnConnect,
  AttrChange,
  ExtendElement,
} from '@guiseek/web-core'
import { parse } from 'json5'

import './txt-rotate.element.scss'

/**
 * @example
 *
 * ```html
 * <span is="txt-rotate" period="2000" rotate='[ "web.", "custom.", "pure TS.", "pretty.", "fun!" ]' ></span>
 * ```
 *
 * @export
 * @class TxtRotateElement
 * @extends {HTMLSpanElement}
 */
@ExtendElement({
  selector: 'txt-rotate',
  extend: 'span',
})
export class TxtRotateElement
  extends HTMLSpanElement
  implements OnConnect, OnChanges, OnDestroy {
  static observedAttributes = ['rotate', 'period']

  @Attr()
  public rotate: string[] = []

  @Attr()
  public period: number

  private timeout: number
  private isDeleting = false
  private loopNum = 0
  private txt = ''

  onConnect(): void {
    this.period = this.period ?? 2000
    this.tick()
  }

  onChanges({ name, next }: AttrChange<string>): void {
    if (name === 'period' && typeof next === 'string') {
      this.period = +next
    }
    if (name === 'rotate' && typeof next === 'string') {
      this.rotate = parse(next)
    }
  }

  tick() {
    const i = this.loopNum % this.rotate.length
    const fullTxt = this.rotate[i]

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    this.innerHTML = '<span class="wrap">' + this.txt + '</span>'

    let delta = 300 - Math.random() * 100

    if (this.isDeleting) {
      delta /= 2
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      this.loopNum++
      delta = 500
    }

    this.timeout = window.setTimeout(() => this.tick(), delta)
  }

  onDestroy(): void {
    window.clearTimeout(this.timeout)
  }
}
