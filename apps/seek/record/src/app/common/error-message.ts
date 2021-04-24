export function errorMessage(element: HTMLElement, msg: string, error?: Error) {
  element.innerHTML += `<p>${msg}</p>`
  if (typeof error !== 'undefined') {
    console.error(error)
  }
}
