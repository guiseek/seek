/**
 * ### Template literals &nbsp; 🚧  &nbsp; Experimental &nbsp; 🚧
 *
 * Experiências pra melhorar solução de data binding e consequentemente e também
 * a solução do arquivo de template, mais informações dos links abaixo:
 *
 * - Escopo de data binding: https://github.com/guiseek/swap/issues/13
 * - Solução de template: https://github.com/guiseek/swap/issues/12
 *
 */
export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  return strings.map((str, i) => str + (values[i] ?? '')).join('')
}
