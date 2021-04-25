import { WebPage } from '@guiseek/web-router'
import { html } from '@guiseek/web-core'

/**
 * html não faz nada por enquanto, mas estou usando
 * pq instalando a extensão do link abaixo, acaba
 * fazendo syntax highlighting e autocomplete, hehe
 *
 * VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin
 */
const template = html` <h1>Home</h1> `

export class HomePage extends WebPage {
  constructor() {
    super()
    this.attach(template)
    console.log('LAZY')
  }

  connectedCallback() {
    console.log('home-page: ', this.route)
    console.log('home-page: ', this.params)
    console.log('home-page: ', this.selector)
  }
}
customElements.define('home-page', HomePage)
