import { html } from '@guiseek/web-core'

export const tmpl = html`
  <main>
    <nav>
      <ul class="menu-bar">
        <li>
          <a href="video">Vídeo</a>
        </li>

        <li>
          <a href="screen">Screen</a>
        </li>
      </ul>
    </nav>
    <section id="outlet"></section>
  </main>
`
