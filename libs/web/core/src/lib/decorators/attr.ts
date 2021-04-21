import 'reflect-metadata'

export function Attr<T>(entity?: new () => T): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, property: keyof T) => {
    if (entity !== undefined) {
      target[property] = new entity()
    }

    target.attributeChangedCallback = function (
      name: string,
      prev: string,
      next: string
    ) {
      if (prev !== next) {
        this[name] = next
      }

      if (target.onChanges) {
        this.onChanges({
          name,
          prev,
          next,
        })
      }
    }
  }
}
