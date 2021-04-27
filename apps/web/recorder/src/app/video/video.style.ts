import { html } from '@guiseek/web-core'

export const style = html`
  <style>
    :host {
      display: flex;
      padding: 32px;
      border-radius: 12px;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.4);
    }
    section {
      position: relative;
      width: 800px;
      height: 500px;
    }
    section video {
      position: absolute;
      width: 800px;
      height: 500px;
      border-radius: 8px;
      overflow: hidden;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    button.primary {
      position: relative;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 0 16px;

      gap: 6px;
      height: 32px;
      min-width: 100px;
      text-align: center;
      vertical-align: middle;
      justify-content: center;
      text-overflow: ellipsis;

      /* Color */
      color: var(--seek-primary-default-color);
      background-color: var(--seek-primary-default-background);

      /* Font */
      font-size: var(--seek-primary-large-button-font-size);
      text-decoration: var(--seek-primary-large-button-text-decoration);
      font-family: var(--seek-primary-large-button-font-family);
      font-weight: var(--seek-primary-large-button-font-weight);
      font-style: var(--seek-primary-large-button-font-style);
      font-stretch: var(--seek-primary-large-button-font-stretch);
      letter-spacing: var(--seek-primary-large-button-letter-spacing);
      line-height: var(--seek-primary-large-button-line-height);
      text-transform: var(--seek-primary-large-button-text-case);

      /* Border / Box shadow */
      border-color: var(--seek-primary-default-border);
      border-radius: var(--seek-primary-default-drop-shadow-radius);
      border: none;
      box-shadow: 0 3px 1px -2px var(--seek-primary-default-drop-shadow-color),
        0 2px 2px 0 var(--seek-primary-default-drop-shadow-color),
        0 1px 5px 0 var(--seek-primary-default-drop-shadow-color);

      outline: none;
      cursor: pointer;

      transition: box-shadow 0.2s;
    }
    button.primary::-moz-focus-inner {
      border: none;
    }

    /* Highlight, Ripple */
    button.primary::before,
    button.primary::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      opacity: 0;
    }

    button.primary::before {
      background-color: var(--seek-primary-default-background);
      transition: opacity 0.2s;
    }

    button.primary::after {
      background: radial-gradient(
          circle at center,
          currentColor 1%,
          transparent 1%
        )
        center/10000% 10000% no-repeat;
      transition: opacity 1s, background-size 0.5s;
    }

    /* Hover, Focus */
    button.primary:hover,
    button.primary:focus {
      box-shadow: 0 0 0 2px rgba(var(--seek-primary-default-color, 0.12));
      /* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), */
      /*   0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12); */
    }

    button.primary:hover::before {
      opacity: 0.08;
    }

    button.primary:focus::before {
      opacity: 0.24;
    }

    button.primary:hover:focus::before {
      opacity: 0.32;
    }

    /* Active */
    button.primary:active {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    button.primary:active::after {
      opacity: 0.32;
      background-size: 100% 100%;
      transition: background-size 0s;
    }

    /* Disabled */
    button.primary:disabled {
      color: var(--seek-primary-disabled-color);
      background-color: var(--seek-primary-disabled-background);
      box-shadow: none;
      cursor: initial;
    }

    button.primary:disabled::before,
    button.primary:disabled::after {
      opacity: 0;
    }

    button.secondary {
      margin: 0;
      padding: 0 16px;

      min-width: 100px;
      height: 32px;

      position: relative;
      display: inline-block;

      text-align: center;
      vertical-align: middle;
      text-overflow: ellipsis;

      border: solid 1px; /* Safari */
      box-sizing: border-box;

      outline: none;
      cursor: pointer;

      /* Color */
      color: var(--seek-secondary-default-color);
      background-color: var(--seek-secondary-default-background);

      /* Font */
      font-size: var(--seek-secondary-large-button-font-size);
      text-decoration: var(--seek-secondary-large-button-text-decoration);
      font-family: var(--seek-secondary-large-button-font-family);
      font-weight: var(--seek-secondary-large-button-font-weight);
      font-style: var(--seek-secondary-large-button-font-style);
      font-stretch: var(--seek-secondary-large-button-font-stretch);
      letter-spacing: var(--seek-secondary-large-button-letter-spacing);
      line-height: var(--seek-secondary-large-button-line-height);
      text-transform: var(--seek-secondary-large-button-text-case);

      /* Border / Box shadow */
      border-color: var(--seek-secondary-default-border);
      border-radius: var(--seek-secondary-default-drop-shadow-radius);
      box-shadow: 0 3px 1px -2px var(--seek-secondary-default-drop-shadow-color),
        0 2px 2px 0 var(--seek-secondary-default-drop-shadow-color),
        0 1px 5px 0 var(--seek-secondary-default-drop-shadow-color);
    }
    button.secondary::-moz-focus-inner {
      border: none;
    }

    /* Highlight, Ripple */
    button.secondary::before,
    button.secondary::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 3px;
      opacity: 0;
    }

    button.secondary::before {
      background-color: var(--seek-secondary-default-background);
      transition: opacity 0.2s;
    }

    button.secondary::after {
      background: radial-gradient(
          circle at center,
          currentColor 1%,
          transparent 1%
        )
        center/10000% 10000% no-repeat;
      transition: opacity 1s, background-size 0.5s;
    }

    /* Hover, Focus */
    button.secondary:hover::before {
      opacity: 0.04;
    }

    button.secondary:focus::before {
      opacity: 0.12;
    }

    button.secondary:hover:focus::before {
      opacity: 0.16;
    }

    /* Active */
    button.secondary:active::after {
      opacity: 0.16;
      background-size: 100% 100%;
      transition: background-size 0s;
      background-color: var(--seek-secondary-pressed-background);
      color: var(--seek-secondary-pressed-color);
      border-color: var(--seek-secondary-pressed-border);
    }

    /* Pressed */
    button.secondary:active {
      background-color: var(--seek-secondary-pressed-background);
      color: var(--seek-secondary-pressed-color);
      border-color: var(--seek-secondary-pressed-border);
    }

    /* Disabled */
    button.secondary:disabled {
      background-color: var(--seek-secondary-disabled-background);
      color: var(--seek-secondary-disabled-color);
      border-color: var(--seek-secondary-disabled-border);
      box-shadow: none;
      cursor: initial;
    }

    button.secondary:disabled::before,
    button.secondary:disabled::after {
      opacity: 0;
    }
  </style>
`
