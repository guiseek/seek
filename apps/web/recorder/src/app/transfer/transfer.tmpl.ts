import { html } from '@guiseek/web-core'

export const tmpl = html`
  <section>
    <div id="button">
      <button class="primary" id="sendTheData" type="button">
        Generate and send data
      </button>
    </div>
    <div class="input">
      <input type="number" id="megsToSend" min="1" name="megs" value="16" />
      <label for="megsToSend">
        MB
        <b>
          (warning: very large values will potentially cause memory problems)
        </b>
      </label>
      <div id="errorMsg"></div>
    </div>
    <div class="input">
      <input type="checkbox" id="ordered" checked />
      <label for="ordered">Ordered mode</label>
    </div>
    <div class="progress">
      <div class="label">Send progress:</div>
      <progress id="sendProgress" max="0" value="0"></progress>
    </div>

    <div class="progress">
      <div class="label">Receive progress:</div>
      <progress id="receiveProgress" max="0" value="0"></progress>
    </div>

    <div>
      <span id="transferStatus"></span>
    </div>
  </section>
`
