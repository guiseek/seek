import { WebPage, WebPageConfig } from './page'

@WebPageConfig('/', 'web-recorder')
export class AppElement extends WebPage {
  constructor() {
    super(`<app-home></app-home>`)
  }
}
