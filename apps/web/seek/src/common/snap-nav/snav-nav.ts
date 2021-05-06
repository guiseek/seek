export class SnapNav extends HTMLBodyElement {
  navs = document.querySelectorAll('nav')

  constructor() {
    super()
    customElements.whenDefined('web-seek').then(() => {
      this.navs = document.querySelectorAll('nav')
      this.navs.forEach((nav) => {
        const links = nav.querySelectorAll('a')
        links.forEach((a) => this.onClick(a))
      })
    })
  }

  onClick(target: HTMLAnchorElement) {
    target.addEventListener('click', (evt) => {
      this.navTo(evt.target as HTMLAnchorElement)
    })
  }

  navTo = ({ dataset }: HTMLAnchorElement) => {
    const section = this.querySelector(dataset.href)
    if (section instanceof HTMLElement) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
customElements.define('snap-nav', SnapNav, { extends: 'body' })
