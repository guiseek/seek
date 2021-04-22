import { RenderElement, html } from '@guiseek/web-core'

import './app.element.scss'

/**
 * Não está em uso! todos os elementos
 * apresentados na tela estão no index
 * @internal
 * @todo usar quando tiver page router
 */
@RenderElement({ selector: 'web-profile-root' })
export class AppElement extends HTMLElement {
  public static observedAttributes = []

  title = 'web-profile'

  render() {
    return html`<h1>${this.title}</h1>`
  }
}
