import { Config } from '../types/config'
import { injector } from '../injectors'

/**
 * Verifica se foram declaradas
 * dependências, coleta pelo injector
 * as instâncias pré criadas e então
 * envia como argumentos no `onInject`
 */
export function applyInjectors(config: Config) {
  const providers = []

  config.providers.map((service) => {
    let dep: new () => void

    try {
      dep = injector.get(service)
    } catch (err) {
      injector.set(service)
      dep = injector.get(service)
    }

    providers.push(dep)
  })

  return providers
}
