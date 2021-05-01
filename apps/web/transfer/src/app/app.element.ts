import { createTemplate, WebApp, WebRoot } from './core/app'
import { html } from '@guiseek/web-core'

import './app.element.scss'

const template = createTemplate(
  html`
    <main>
      <h1>Transfer</h1>
      <slot name="outlet"></slot>
    </main>
  `
)

@WebApp('app-boot', {}, template)
export class AppElement extends WebRoot {
  onBoot() {
    console.log('this: ', this)
    console.log('main: ', this.queryAll('main'))
  }

  onChild(child: HTMLElement) {
    console.log('child; ', child)
    console.log('input', this.queryAll('input'))
    console.log('input', this.querySelectorAll('input'))
    console.log('child->input', child.querySelectorAll('input'))
  }
}
