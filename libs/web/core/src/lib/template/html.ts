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

let counter = 0
function generateId() {
  counter++
  return `p-${counter}-${Date.now()}`
}

/**
 * Generate Nodes
 *
 * @param {Node} doc
 * @param {...any[]} partials
 */
function generateNodes(doc: Document, ...partials: any[]) {
  const placeholders = []
  function reducer(carry: any[], partial: Node | NodeListOf<ChildNode>) {
    if (partial && (partial as Node).nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
      partial = (partial as Node).childNodes
    }

    if (Array.isArray(partial)) {
      carry.concat(partial)
    } else if (typeof partial === 'object' && partial instanceof Node) {
      const id = generateId()
      placeholders.push({ id, node: partial })

      return carry.concat(
        `<${partial.nodeName} id="${id}"></${partial.nodeName}>`
      )
    } else if (
      partial &&
      typeof partial.item == 'function' &&
      typeof partial.length == 'number'
    ) {
      return carry.concat(Array.prototype.reduce.call(partial, reducer, []))
    } else {
      return carry.concat(partial)
    }
  }

  const html = partials
    .reduce(reducer, [])
    .join('')
    .replace(/^\s*</, '<')
    .replace(/>\s*$/, '>')

  const template = doc.createElement('template')
  template.innerHTML = html
  const container = template.content

  //
  placeholders.forEach(({ id, node }) => {
    const placeholder = container.querySelector(`${node.nodeName}#${id}`)
    placeholder.parentNode.replaceChild(node, placeholder)
  })

  let shouldBeFragment = false
  for (let i = 0; i < partials.length; i++) {
    if (partials[i] == '') {
      continue
    } else if (partials[i] instanceof Node) {
      shouldBeFragment = true
      break
    } else {
      break
    }
  }

  if (container.childNodes.length == 1 && !shouldBeFragment) {
    const child = container.firstChild
    container.removeChild(child)
    return child
  } else {
    return container
  }

  return container
}

/**
 * Tagged Template Handler
 *
 * @param {Node} doc
 * @param {TemplateStringsArray} strings
 * @param {...string[]} values
 * @returns
 */
function taggedTemplateHandler(
  doc: Document,
  strings: TemplateStringsArray,
  ...values: string[]
) {
  // Create an array that puts the values back in their place
  const arr: string[] = strings.reduce((carry, current, index) => {
    return carry.concat(
      current,
      index + 1 === strings.length ? [] : values[index]
    )
  }, [])

  return generateNodes(doc, ...arr)
}

export function htmlify(strings: TemplateStringsArray, ...values: string[]) {
  let doc = document
  if (this) {
    if (this.nodeType == Node.DOCUMENT_NODE) {
      doc = this
    } else if (this.ownerDocument) {
      doc = this.ownerDocument
    }
  }

  return taggedTemplateHandler(doc, strings, ...values)

  // return strings.map((str, i) => str + (values[i] ?? '')).join('');
}

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
