import { html } from '@guiseek/web-core'

export const tmpl = html`
  <section>
    <video id="gum" width="800" playsinline autoplay muted></video>
    <video id="recorded" playsinline loop></video>
  </section>
  <nav>
    <div>
      <button class="secondary" id="start">Start camera</button>
      <button class="primary" id="record" disabled>Start Recording</button>
    </div>
    <div>
      <button class="secondary" id="play" disabled>Play</button>
      <button class="primary" id="download" disabled>Download</button>
    </div>
  </nav>
  <output id="error-message"></output>
`
