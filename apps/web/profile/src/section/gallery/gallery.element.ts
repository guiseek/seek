import { html, Element, OnConnect } from '@guiseek/web-core'
import { cloneAs, delClass, select } from '../../shared'
import { Photo } from '../../core'
import { Subject } from 'rxjs'

import './gallery.element.scss'

declare global {
  interface HTMLElementTagNameMap {
    'seek-gallery': GalleryElement
  }
}

@Element({
  selector: 'seek-gallery',
  template: html`
    <div class="grid"></div>

    <template id="template">
      <figure class="skeleton">
        <img src="" alt="" />
        <figcaption></figcaption>
      </figure>
    </template>
  `,
})
export class GalleryElement extends HTMLElement implements OnConnect {
  destroy = new Subject<void>()

  grid: HTMLDivElement
  tmpl: HTMLTemplateElement

  onConnect(): void {
    this.grid = select(this, '.grid')
    this.tmpl = select(this, '#template')

    fetch('/assets/photos.json').then((res) => {
      res.json().then(this.handleResponse)
    })
  }

  handleResponse = (photos: Photo[]) => {
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

  appendPhoto = (photo: Photo) => {
    const clone = cloneAs(this.tmpl)
    const figure = select(clone, 'figure')
    const caption = select(clone, 'figcaption')
    const img = select<HTMLImageElement>(clone, 'img')

    img.onload = () => delClass(img.parentElement, 'skeleton')

    img.setAttribute('data-src', photo.src)
    img.setAttribute('alt', photo.title)

    caption.textContent = photo.title

    figure.classList.add(photo.position)
    figure.classList.add(photo.size)

    this.grid.appendChild(clone)
  }
}
