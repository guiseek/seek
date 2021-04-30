import { html } from '@guiseek/web-core'

export const style = html`
  <style>
    fieldset {
      border: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      /* justify-content: space-around; */
      button {
        align-self: flex-end;
      }
    }

    fieldset > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    fieldset em {
      display: inline-flex;
      padding: 10px;
    }

    progress {
      width: 100%;
      /* width: calc(100% - 8.5em); */
    }

    progress {
      --helper-theme: var(--theme-rgb, var(--primary-rgb, 33, 150, 243));
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
      /* width: 160px; */
      height: 4px;
      vertical-align: middle;
      color: rgb(var(--helper-theme));
      background-color: rgba(var(--helper-theme), 0.12);
    }

    progress::-webkit-progress-bar {
      background-color: transparent;
    }

    /* Determinate */
    progress::-webkit-progress-value {
      background-color: currentColor;
      transition: all 0.2s;
    }

    progress::-moz-progress-bar {
      background-color: currentColor;
      transition: all 0.2s;
    }

    progress::-ms-fill {
      border: none;
      background-color: currentColor;
      transition: all 0.2s;
    }

    /* Indeterminate */
    progress:indeterminate {
      background-size: 200% 100%;
      background-image: linear-gradient(
          to right,
          currentColor 16%,
          transparent 16%
        ),
        linear-gradient(to right, currentColor 16%, transparent 16%),
        linear-gradient(to right, currentColor 25%, transparent 25%);
      animation: progress-linear 1.8s infinite linear;
    }

    progress:indeterminate::-webkit-progress-value {
      background-color: transparent;
    }

    progress:indeterminate::-moz-progress-bar {
      background-color: transparent;
    }

    progress:indeterminate::-ms-fill {
      animation-name: none;
    }

    @keyframes progress-linear {
      0% {
        background-position: 32% 0, 32% 0, 50% 0;
      }
      2% {
        background-position: 32% 0, 32% 0, 50% 0;
      }
      21% {
        background-position: 32% 0, -18% 0, 0 0;
      }
      42% {
        background-position: 32% 0, -68% 0, -27% 0;
      }
      50% {
        background-position: 32% 0, -93% 0, -46% 0;
      }
      56% {
        background-position: 32% 0, -118% 0, -68% 0;
      }
      66% {
        background-position: -11% 0, -200% 0, -100% 0;
      }
      71% {
        background-position: -32% 0, -200% 0, -100% 0;
      }
      79% {
        background-position: -54% 0, -242% 0, -100% 0;
      }
      86% {
        background-position: -68% 0, -268% 0, -100% 0;
      }
      100% {
        background-position: -100% 0, -300% 0, -100% 0;
      }
    }

    /* Checkbox */
    label.checkbox {
      --helper-theme: var(--theme-rgb, var(--primary-rgb, 33, 150, 243));
      --helper-ontheme: var(--ontheme-rgb, var(--onprimary-rgb, 255, 255, 255));
      z-index: 0;
      position: relative;
      display: inline-block;
      color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.87);
      font-size: 16px;
      line-height: 1.5;
    }

    /* Box */
    label.checkbox > input {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      z-index: 1;
      position: absolute;
      display: block;
      box-sizing: border-box;
      margin: 3px 1px;
      border: solid 2px; /* Safari */
      border-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.6);
      border-radius: 2px;
      width: 18px;
      height: 18px;
      outline: none;
      cursor: pointer;
      transition: border-color 0.2s, background-color 0.2s;
    }

    /* Span */
    label.checkbox > input + span {
      display: inline-block;
      box-sizing: border-box;
      padding-left: 30px;
      width: inherit;
      cursor: pointer;
    }

    /* Highlight */
    label.checkbox > input + span::before {
      content: '';
      position: absolute;
      left: -10px;
      top: -8px;
      display: block;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: rgb(var(--onsurface-rgb, 0, 0, 0));
      opacity: 0;
      transform: scale(1);
      pointer-events: none;
      transition: opacity 0.3s, transform 0.2s;
    }

    /* Check Mark */
    label.checkbox > input + span::after {
      content: '';
      z-index: 1;
      display: block;
      position: absolute;
      top: 3px;
      left: 1px;
      box-sizing: content-box;
      width: 10px;
      height: 5px;
      border: solid 2px transparent;
      border-right-width: 0;
      border-top-width: 0;
      pointer-events: none;
      transform: translate(3px, 4px) rotate(-45deg);
      transition: border-color 0.2s;
    }

    /* Checked, Indeterminate */
    label.checkbox > input:checked,
    label.checkbox > input:indeterminate {
      border-color: rgb(var(--helper-theme));
      background-color: rgb(var(--helper-theme));
    }

    label.checkbox > input:checked + span::before,
    label.checkbox > input:indeterminate + span::before {
      background-color: rgb(var(--helper-theme));
    }

    label.checkbox > input:checked + span::after,
    label.checkbox > input:indeterminate + span::after {
      border-color: rgb(var(--helper-ontheme, 255, 255, 255));
    }

    label.checkbox > input:indeterminate + span::after {
      border-left-width: 0;
      transform: translate(4px, 3px);
    }

    /* Hover, Focus */
    label.checkbox:hover > input + span::before {
      opacity: 0.04;
    }

    label.checkbox > input:focus + span::before {
      opacity: 0.12;
    }

    label.checkbox:hover > input:focus + span::before {
      opacity: 0.16;
    }

    /* Active */
    label.checkbox:active > input,
    label.checkbox:active:hover > input {
      border-color: rgb(var(--helper-theme));
    }

    label.checkbox:active > input:checked {
      border-color: transparent;
      background-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.6);
    }

    label.checkbox:active > input + span::before {
      opacity: 1;
      transform: scale(0);
      transition: transform 0s, opacity 0s;
    }

    /* Disabled */
    label.checkbox > input:disabled {
      border-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.38);
      cursor: initial;
    }

    label.checkbox > input:checked:disabled,
    label.checkbox > input:indeterminate:disabled {
      border-color: transparent;
      background-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.38);
    }

    label.checkbox > input:disabled + span {
      color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.38);
      cursor: initial;
    }

    label.checkbox > input:disabled + span::before {
      opacity: 0;
      transform: scale(0);
    }

    /* Textfield */
    .textfield-filled {
      --helper-theme: var(--theme-rgb, var(--primary-rgb, 33, 150, 243));
      position: relative;
      display: inline-block;
      font-size: 16px;
      line-height: 1.5;
    }

    /* Input, Textarea */
    .textfield-filled > input,
    .textfield-filled > textarea {
      display: block;
      box-sizing: border-box;
      margin: 0;
      border: none;
      border-top: solid 24px transparent;
      border-bottom: solid 1px rgba(var(--onsurface-rgb, 0, 0, 0), 0.6);
      border-radius: 4px 4px 0 0;
      padding: 0 12px 7px;
      width: 100%;
      height: inherit;
      color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.87);
      -webkit-text-fill-color: currentColor; /* Safari */
      background-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.04);
      box-shadow: none; /* Firefox */
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      caret-color: rgb(var(--helper-theme));
      transition: border-bottom 0.2s, background-color 0.2s;
    }

    /* Span */
    .textfield-filled > input + span,
    .textfield-filled > textarea + span {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      box-sizing: border-box;
      padding: 7px 12px 0;
      color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.6);
      font-size: 75%;
      line-height: 18px;
      pointer-events: none;
      transition: color 0.2s, font-size 0.2s, line-height 0.2s;
    }

    /* Underline */
    .textfield-filled > input + span::after,
    .textfield-filled > textarea + span::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      display: block;
      width: 100%;
      height: 2px;
      background-color: rgb(var(--helper-theme));
      transform-origin: bottom center;
      transform: scaleX(0);
      transition: transform 0.3s;
    }

    /* Hover */
    .textfield-filled:hover > input,
    .textfield-filled:hover > textarea {
      border-bottom-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.87);
      background-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.08);
    }

    /* Placeholder-shown */
    .textfield-filled > input:not(:focus):placeholder-shown + span,
    .textfield-filled > textarea:not(:focus):placeholder-shown + span {
      font-size: inherit;
      line-height: 48px;
    }

    /* Focus */
    .textfield-filled > input:focus,
    .textfield-filled > textarea:focus {
      outline: none;
    }

    .textfield-filled > input:focus + span,
    .textfield-filled > textarea:focus + span {
      color: rgb(var(--helper-theme));
    }

    .textfield-filled > input:focus + span::after,
    .textfield-filled > textarea:focus + span::after {
      transform: scale(1);
    }

    /* Disabled */
    .textfield-filled > input:disabled,
    .textfield-filled > textarea:disabled {
      border-bottom-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.38);
      color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.38);
      background-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.24);
    }

    .textfield-filled > input:disabled + span,
    .textfield-filled > textarea:disabled + span {
      color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.38);
    }

    /* Faster transition in Safari for less noticable fractional font-size issue */
    @media not all and (min-resolution: 0.001dpcm) {
      @supports (-webkit-appearance: none) {
        .textfield-filled > input,
        .textfield-filled > input + span,
        .textfield-filled > input + span::after,
        .textfield-filled > textarea,
        .textfield-filled > textarea + span,
        .textfield-filled > textarea + span::after {
          transition-duration: 0.1s;
        }
      }
    }

    /* Button */
    .button-contained {
      --helper-theme: var(--theme-rgb, var(--primary-rgb, 33, 150, 243));
      --helper-ontheme: var(--ontheme-rgb, var(--onprimary-rgb, 255, 255, 255));
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      border: none;
      border-radius: 4px;
      padding: 0 16px;
      min-width: 64px;
      height: 36px;
      vertical-align: middle;
      text-align: center;
      text-overflow: ellipsis;
      color: rgb(var(--helper-ontheme));
      background-color: rgb(var(--helper-theme));
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      font-size: 14px;
      font-weight: 500;
      line-height: 36px;
      outline: none;
      cursor: pointer;
      transition: box-shadow 0.2s;
    }

    .button-contained::-moz-focus-inner {
      border: none;
    }

    /* Highlight, Ripple */
    .button-contained::before,
    .button-contained::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      opacity: 0;
    }

    .button-contained::before {
      background-color: rgb(var(--helper-ontheme));
      transition: opacity 0.2s;
    }

    .button-contained::after {
      background: radial-gradient(
          circle at center,
          currentColor 1%,
          transparent 1%
        )
        center/10000% 10000% no-repeat;
      transition: opacity 1s, background-size 0.5s;
    }

    /* Hover, Focus */
    .button-contained:hover,
    .button-contained:focus {
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    }

    .button-contained:hover::before {
      opacity: 0.08;
    }

    .button-contained:focus::before {
      opacity: 0.24;
    }

    .button-contained:hover:focus::before {
      opacity: 0.32;
    }

    /* Active */
    .button-contained:active {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .button-contained:active::after {
      opacity: 0.32;
      background-size: 100% 100%;
      transition: background-size 0s;
    }

    /* Disabled */
    .button-contained:disabled {
      color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.38);
      background-color: rgba(var(--onsurface-rgb, 0, 0, 0), 0.12);
      box-shadow: none;
      cursor: initial;
    }

    .button-contained:disabled::before,
    .button-contained:disabled::after {
      opacity: 0;
    }
  </style>
`
