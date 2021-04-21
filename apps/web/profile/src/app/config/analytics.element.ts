import { ExtendElement, OnConnect } from '@guiseek/web-core'

type WindowAnalytics = Window & {
  dataLayer?: any[]
}

/**
 * @example
 *
 * <script is="seek-analytics" id="G-49VFMJPFG7" />
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
  private _url = 'https://www.googletagmanager.com/gtag/js'

  public id = 'G-49VFMJPFG7'

  src = this._url + '?id=' + this.id

  onConnect(): void {
    const win: WindowAnalytics = window
    win.dataLayer = win.dataLayer || []

    function gtag(...args: any[]) {
      win.dataLayer.push(args)
    }

    gtag('js', new Date())
    gtag('config', this.id)
  }
}
