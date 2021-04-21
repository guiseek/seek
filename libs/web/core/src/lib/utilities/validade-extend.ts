import { ExtendElementConfig } from '../types/extend-element-config'

/**
 * Função respnsável pela validação do atributo extend obrigatório
 *
 * @param {Pick<ElementConfigExtend, 'extend'} config
 */
export function validateExtend(config: Pick<ExtendElementConfig, 'extend'>) {
  if (!config.extend) {
    throw new Error('Construções em outros elementos devem ter um extend')
  }
}
