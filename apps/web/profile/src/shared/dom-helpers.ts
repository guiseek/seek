export const cloneAs = <T extends HTMLElement>({
  content,
}: HTMLTemplateElement) => {
  return content.cloneNode(true) as T
}

export const select = <T extends HTMLElement>(
  element: HTMLElement,
  selector: keyof HTMLElementTagNameMap | string
) => {
  return element.querySelector<T>(selector)
}

export const delClass = <T extends HTMLElement>(
  element: HTMLElement,
  selector: string
) => {
  element.classList.remove(selector)
  return element as T
}

export function adaptButton(button: HTMLButtonElement) {
  const disable = () => (button.disabled = true)
  const enable = () => (button.disabled = false)
  const set = (prop: string, val: string) => button.setAttribute(prop, val)
  const text = button.textContent
  const on = <K extends keyof HTMLElementEventMap>(
    event: K,
    callback: (
      event: HTMLElementEventMap[K] & { target: HTMLButtonElement }
    ) => void
  ) => button.addEventListener(event, callback)

  return { disable, enable, set, text, on }
}

export type AdaptedButton = {
  disable: () => boolean
  enable: () => boolean
  set: (prop: string, val: string) => void
  text: string
  on: <K extends keyof HTMLElementEventMap>(
    ev: K,
    cb: (
      ev: HTMLElementEventMap[K] & {
        target: HTMLButtonElement
      }
    ) => void
  ) => void
}
