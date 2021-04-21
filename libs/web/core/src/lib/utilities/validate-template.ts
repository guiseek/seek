import { ElementConfig } from '../types/element-config'

/**
 * Função respnsável pela validação do seletor obrigatório
 *
 * @param {Pick<ElementConfig, 'selector'} config
 */
export function validateTemplate(config: Pick<ElementConfig, 'template'>) {
  if (!config.template) {
    throw new Error('Elementos devem ter um template')
  }
}
