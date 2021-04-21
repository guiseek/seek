import { Http } from './../services'

class Injector {
  private _container = new Map()

  constructor(readonly providers: (new () => void)[] = []) {
    providers.forEach((service) => this._container.set(service, new service()))
  }

  set(service: new () => void) {
    this._container.set(service, new service())
  }

  get(service: unknown) {
    const serviceInstance = this._container.get(service)

    if (!serviceInstance) {
      throw Error('Provider not found')
    }

    return serviceInstance
  }
}

export const injector = new Injector([Http])
