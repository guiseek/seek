let refSeek = 0

export class BaseSection extends HTMLElement {
  static observedAttributes = ['id']

  id = `refSeek${refSeek++}`

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const template = this._cloneTemplateNode('#web-section')
    this.classList.add('section')
    shadowRoot.append(template)
  }

  private _cloneTemplateNode(id: string): Node {
    const templateElement: HTMLTemplateElement = document.querySelector(id)

    const templateContent = templateElement.content

    return templateContent.cloneNode(true)
  }
}
