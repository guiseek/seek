import { ElementConfig } from '../types/element-config'

/**
 * Função respnsável pela validação do seletor
 * do elemento, é obrigatório ter no mínimo 1 hífen
 *
 * @param {Pick<ElementConfig, 'selector'} config
 */
export const validateSelector = (config: Pick<ElementConfig, 'selector'>) => {
  if (!config.selector.includes('-')) {
    throw new Error('Seletores devem ter no mínimo 1 hífen')
  }
}
