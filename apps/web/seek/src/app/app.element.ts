import { Element, html } from '@web-seek/elements'
import './app.element.scss'

@Element('web-seek')
export class AppElement extends HTMLElement {
  public static observedAttributes = []

  title = 'web-seek'

  constructor() {
    super()
    this.innerHTML = html`
      <header>
        <nav>
          <a data-href="#refSeek0" role="link">Wek Seek</a>
          <a data-href="#refSeek1" role="link">Talks</a>
          <a data-href="#refSeek2" role="link">Photos</a>
        </nav>
      </header>
      <main class="wrapper">
        <section is="intro-section"></section>

        <section is="talks-section"></section>

        <section is="photos-section"></section>
      </main>
    `
  }
}
