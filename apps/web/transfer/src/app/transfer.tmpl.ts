import { html } from '@guiseek/web-core'

export const tmpl = html`
  <section>
    <div id="button"></div>
    <fieldset>
      <div>
        <div class="textfield-filled">
          <input
            type="number"
            id="megsToSend"
            placeholder=" "
            name="megs"
            value="16"
            min="1"
          />
          <span>Quantidade em MB</span>
        </div>
        <label class="checkbox">
          <input type="checkbox" id="ordered" checked />
          <span for="ordered">Enviar em ordem</span>
        </label>
      </div>
      <em>
        <strong>Aviso:</strong> valores altos podem causar problemas de memória
      </em>
      <button class="button-contained" id="sendTheData" type="button">
        Gerar e enviar dados
      </button>
    </fieldset>
    <div class="input">
      <br />
      <p for="megsToSend">Em megabytes</p>
      <div id="errorMsg"></div>
    </div>
    <div class="progress">
      <div class="label">Progresso do envio:</div>
      <progress id="sendProgress" max="0" value="0"></progress>
    </div>

    <div class="progress">
      <div class="label">Progresso de recebimento:</div>
      <progress id="receiveProgress" max="0" value="0"></progress>
    </div>

    <div>
      <span id="transferStatus"></span>
    </div>
  </section>
`
