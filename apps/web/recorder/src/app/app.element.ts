import { WebPage, WebPageConfig } from './page'

import './app.element.scss'

@WebPageConfig('/', 'web-recorder')
export class AppElement extends WebPage {
  constructor() {
    super(`<app-page></app-page>`)
  }
}
