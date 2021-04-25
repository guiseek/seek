import { html } from '@guiseek/web-core'
import { WebPage, WebPageConfig, routes } from './page'

import './app.element.scss'

@WebPageConfig('/', 'app-page')
export class AppPage extends WebPage {
  constructor() {
    super(html`
      <style>
        .menu-bar {
          border-radius: 25px;
          height: fit-content;
          display: inline-flex;
          background-color: rgba(0, 0, 0, 0.4);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          align-items: center;
          padding: 0 10px;
          margin: 50px 0 0 0;
        }
        .menu-bar li {
          list-style: none;
          display: inline-flex;
          align-items: center;
          color: white;
          height: 36px;
          font-family: sans-serif;
          padding: 2px 6px;
          margin: 0px 8px;
          position: relative;
          cursor: pointer;
          white-space: nowrap;
        }
        .menu-bar li::before {
          content: ' ';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: -1;
          transition: 0.2s;
          border-radius: 25px;
        }
        .menu-bar li::before:hover {
          color: black;
        }
        .menu-bar li a {
          text-decoration: none;
          color: #fff;
          display: inline-flex;
          border-radius: 20px;
          transition: filter 100ms ease-in, transform 200ms ease-in-out,
            background-color 300ms ease-out, padding 100ms ease-out;
        }

        .menu-bar li a:visited {
          color: #fff;
        }
      </style>
      <main>
        <ul class="menu-bar">
          <li>
            <a href="/video">Vídeo</a>
          </li>

          <li>
            <a href="/screen">Screen</a>
          </li>
        </ul>
      </main>
    `)

    const route = location.pathname

    if (routes.get(route) && route !== '/') {
      const tag = routes.get(route)
      const page = document.createElement(tag)
      this.shadowRoot.appendChild(page)
    }
  }

  connectedCallback() {
    const links = this.queryAll('ul.menu-bar li')
    if (!!links.length) {
      links.forEach((link) => {
        link.onmouseover = () => {
          document.body.style.filter = 'invert(1)'
        }
        link.onmouseout = () => {
          document.body.style.filter = 'none'
        }
      })
    }
  }
}
