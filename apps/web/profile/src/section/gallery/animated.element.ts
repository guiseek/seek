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

declare global {
  interface HTMLElementTagNameMap {
    'seek-animated-gallery': AnimatedGalleryElement
  }
}

const log = (type: string) => (message: unknown) => console.log(type, message)

@Element({
  selector: 'seek-animated-gallery',
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
export class AnimatedGalleryElement
  extends HTMLElement
  implements OnConnect, OnDestroy, OnInject<[Http]> {
  destroy = new Subject<void>()

  grid: HTMLDivElement
  tmpl: HTMLTemplateElement

  onConnect(): void {
    this.grid = select(this, '.grid')
    this.tmpl = select(this, '#template')
  }

  onInject([http]: [Http]): void {
    console.log(http)
    http
      .get<Photo[]>('/assets/gifs.json')
      .pipe(takeUntil(this.destroy))
      .subscribe(this.processPhotos)
  }

  processPhotos = (photos: Photo[]) => {
    const total = photos.length - 1
    let count = 0
    photos.forEach((photo) => {
      this.appendPhoto(photo)
      if (total === count++) {
        const images = this.querySelectorAll('img')
        this.observeImagesToLoadWhenVisible(images)
      }
    })
  }

  observeImagesToLoadWhenVisible(images: NodeListOf<HTMLImageElement>) {
    if ('IntersectionObserverEntry' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.map((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement
            image.src = image.dataset.src
            imageObserver.unobserve(image)
          }
        })
      })
      images.forEach((image) => imageObserver.observe(image))
    }
  }

  appendPhoto = ({ src, title }: Photo) => {
    const clone = cloneAs(this.tmpl)
    const img = select<HTMLImageElement>(clone, 'img')
    const caption = select(clone, 'figcaption')

    img.onload = log('lazy image')

    img.setAttribute('data-src', src)
    img.setAttribute('alt', title)
    caption.textContent = title

    this.grid.appendChild(clone)
  }

  onDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
