import { ExtendElement, OnConnect } from '@guiseek/web-core'
import { environment } from '../envs/env'

type SeekAnalytics = Window & {
  dataLayer?: unknown[]
}

/**
 * @example
 *
 * <script is="seek-analytics"></script>
 *
 * @class AnalyticsElement
 * @extends {HTMLScriptElement}
 * @implements {OnConnect}
 */
@ExtendElement({
  selector: 'seek-analytics',
  extend: 'script',
})
export class AnalyticsElement extends HTMLScriptElement implements OnConnect {
  private _url = 'https://www.googletagmanager.com/gtag/js?id='

  public _id = environment.gTag

  constructor() {
    super()
    if (environment.production) {
      const URL = this._url + this._id
      this.setAttribute('async', '')
      this.setAttribute('src', URL)
    }
  }

  onConnect(): void {
    if (environment.production) {
      this.onload = () => {
        const winSeek = window as SeekAnalytics
        winSeek.dataLayer = winSeek.dataLayer || []
        function gtag(...args: unknown[]) {
          winSeek.dataLayer.push(args)
        }
        gtag('js', new Date())
        gtag('config', this._id)
      }
    }
  }
}
