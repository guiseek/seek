import { Element } from '@web-seek/elements'
import { BaseSection } from '../../sections/base'

@Element('web-nav', { extends: 'nav' })
export class Nav extends HTMLElement {
  addSection(section: BaseSection) {
    if (section.querySelector('h2')) {
      const header = section.querySelector('h2')
      this._newItem(section.id, header.textContent)
    }
  }

  private _newItem(ref: string, textContent: string) {
    const link = this._newLink(ref)
    link.textContent = textContent
    this.appendChild(link)
  }

  private _newLink(ref: string) {
    const link = document.createElement('a')
    link.setAttribute('role', 'link')
    link.dataset.href = `#${ref}`
    return link
  }
}
