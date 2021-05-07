import { BaseSection } from '../../sections/base'
import { Nav } from '../nav/nav'

export class SnapNav extends HTMLBodyElement {
  navs = document.querySelectorAll('nav')

  constructor() {
    super()

    customElements.whenDefined('web-seek').then(() => {
      const nav = this.querySelector<Nav>('[is="web-nav"]')

      const sections = this.querySelectorAll<BaseSection>('section')
      sections.forEach((section) => nav.addSection(section))

      this.navs = document.querySelectorAll('nav')
      this.navs.forEach((nav) => {
        const links = nav.querySelectorAll('a')
        links.forEach((a) => this.onClick(a))
      })
    })
  }

  onClick(target: HTMLAnchorElement) {
    target.addEventListener('click', () => this.navTo(target))
  }

  navTo = ({ dataset }: HTMLAnchorElement) => {
    const section = this.querySelector(dataset.href)
    if (section instanceof HTMLElement) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
customElements.define('snap-nav', SnapNav, { extends: 'body' })
