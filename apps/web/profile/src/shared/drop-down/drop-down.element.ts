import { ExtendElement, OnConnect } from '@guiseek/web-core'

import './drop-down.element.scss'

@ExtendElement({
  selector: 'drop-down',
  extend: 'nav',
})
export class DropDownNavElement extends HTMLElement implements OnConnect {
  onConnect(): void {
    this.querySelectorAll('.dropdown > a').forEach((el) => {
      el.addEventListener('click', this.onClick, false)
    })
  }

  onClick = (evt: PointerEvent) => {
    evt.preventDefault()

    const el = (evt.target as Anchor).parentElement as ListItem

    el.classList.contains('show-submenu')
      ? this.hideSubMenu(el)
      : this.showSubMenu(el)
  }

  showSubMenu(el: ListItem) {
    el.classList.add('show-submenu')

    const onDocClick = (e: MouseEvent & { target: Anchor }) => {
      if (el.contains(e.target)) {
        e.preventDefault()
        console.log(el.contains(e.target))
        return
      }

      document.removeEventListener('click', onDocClick)

      this.hideSubMenu(el)
    }

    document.addEventListener('click', onDocClick)
  }

  hideSubMenu(el: HTMLElement) {
    el.classList.remove('show-submenu')
  }
}
