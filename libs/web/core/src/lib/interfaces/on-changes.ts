import { AttrChange } from '../types/attr-change'

/**
 * Interface para implementação do método
 * executado a cada alteração de atributos
 *
 * @export
 * @interface OnChanges
 */
export interface OnChanges {
  onChanges(changes: AttrChange): void
}
