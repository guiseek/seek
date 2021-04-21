import { cloneAs, select } from '../../shared'
import { takeUntil } from 'rxjs/operators'
import { Photo } from '../../core'
import { Subject } from 'rxjs'
import {
  html,
  Http,
  Element,
  OnConnect,
  OnDestroy,
  OnInject,
} from '@guiseek/web-core'

import './gallery.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-gallery': GalleryElement
  }
}

@Element({
  selector: 'seek-gallery',
  providers: [Http],
  template: html`
    <div class="grid"></div>

    <template id="template">
      <figure>
        <img src="" alt="" />
        <figcaption></figcaption>
      </figure>
    </template>
  `,
})
export class GalleryElement
  extends HTMLElement
  implements OnConnect, OnDestroy, OnInject<[Http]> {
  destroy = new Subject<void>()

  http: Http

  grid: HTMLDivElement
  tmpl: HTMLTemplateElement

  onConnect(): void {
    this.grid = select(this, '.grid')
    this.tmpl = select(this, '#template')
  }

  onInject([http]: [Http]): void {
    this.http = http
    this.findPhotos('/assets/data/photos.json')
  }

  findPhotos(path: string) {
    this.http
      .get<Photo[]>(path)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => res.map(this.appendPhoto))
  }

  appendPhoto = (photo: Photo) => {
    const clone = cloneAs(this.tmpl)
    const img = select<HTMLImageElement>(clone, 'img')
    const caption = select(clone, 'figcaption')

    img.src = photo.src
    img.alt = photo.title
    img.alt = photo.title

    caption.textContent = photo.title

    this.grid.appendChild(clone)
  }

  onDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
