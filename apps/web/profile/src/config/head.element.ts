import { ExtendElement } from '@guiseek/web-core'
import { environment } from './../envs/env'
import { MetaDefinition } from '../core'

@ExtendElement({
  selector: 'seek-head',
  extend: 'head',
})
export class HeadElement extends HTMLHeadElement {
  metaTags: MetaDefinition[] = environment.meta

  constructor() {
    super()

    const title = document.createElement('title')
    title.textContent = environment.title
    this.appendChild(title)

    this.metaTags.map(this.appendMeta)
  }

  createMetaTag(definition: MetaDefinition) {
    const meta = document.createElement('meta')
    Object.entries(definition).map(([name, content]) => {
      meta.setAttribute(name, content)
    })
    return meta
  }

  appendMeta = (meta: MetaDefinition) => {
    this.appendChild(this.createMetaTag(meta))
  }
}
