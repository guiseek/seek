import { WebPageConfig, WebPage } from '../page'

@WebPageConfig('/screen', 'screen-page')
export class ScreenPage extends WebPage {
  constructor() {
    super(`
      <h2>Screen</h2>
    `)
  }
}
