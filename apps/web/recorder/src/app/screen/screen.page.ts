import { html } from '@guiseek/web-core'
import { WebPageConfig, WebPage } from '../page'

@WebPageConfig('/screen', 'screen-page')
export class ScreenPage extends WebPage {
  constructor() {
    super(html`
      <section>
        <video id="gum" playsinline width="800" autoplay muted></video>
      </section>
    `)
  }
}
