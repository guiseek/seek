/**
 * Interface para implementação do método
 * executado a cada alteração de atributos
 *
 * @export
 * @interface OnInject
 */
export interface OnInject<T> {
  onInject(dependencies: T): void
}
