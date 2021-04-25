abstract class WebPageProps {
  public active?: boolean

  public route: string

  public params: Record<string, string | number>

  public selector: string
}

export class WebPage extends HTMLElement implements WebPageProps {
  static observedAttributes = ['route', 'params', 'selector']

  public active?: boolean

  public route: string

  public params: Record<string, string | number>

  public selector: string

  setProps(props: WebPageProps) {
    this.route = props.route
    this.params = props.params
    this.selector = props.selector
  }

  /**
   * Shadow DOM é o nó raiz de uma subárvore
   * DOM que é renderizada separadamente da
   * árvore DOM principal de um documento.
   *
   * @private
   * @type {ShadowRoot}
   * @memberof WebPage
   */
  private _shadowRoot: ShadowRoot
  get shadowRoot() {
    return this._shadowRoot
  }
  set shadowRoot(root) {
    this._shadowRoot = root
  }

  attach(template: string) {
    this.shadowRoot = this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = template
  }

  connectedCallback() {
    console.log('route', this.route)
    console.log('params', this.params)
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    this[name] = next
  }
}
customElements.define('web-page', WebPage)

declare global {
  interface HTMLElementTagNameMap {
    'web-page': WebPage
  }
}
