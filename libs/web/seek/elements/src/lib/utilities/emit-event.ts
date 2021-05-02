import 'reflect-metadata'

const eventMetadataKey = Symbol('event')

export function event(eventString: string) {
  return Reflect.metadata(eventMetadataKey, eventString)
}

export function getEvent(target: any, propertyKey: string) {
  return Reflect.getMetadata(eventMetadataKey, target, propertyKey)
}

export function emitEvent<T>(detail: T) {
  const type = getEvent(this, 'emitEvent')
  this.dispatchEvent(new CustomEvent(type, { detail }))
}
