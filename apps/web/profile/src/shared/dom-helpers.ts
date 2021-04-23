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

export const removeClass = () => {}

export const delClass = <T extends HTMLElement>(
  element: HTMLElement,
  selector: string
) => {
  element.classList.remove(selector)
  return element as T
}
