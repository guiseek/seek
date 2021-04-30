import { html } from '@guiseek/web-core'

export const style = html`
  <style>
    div.progress {
      margin: 0 0 1em 0;
    }

    div.progress div.label {
      display: inline-block;
      font-weight: 400;
      width: 8.2em;
    }

    div.input {
      margin: 0 0 1em 0;
    }

    progress {
      width: calc(100% - 8.5em);
    }
  </style>
`
