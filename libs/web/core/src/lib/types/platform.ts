/**
 * A policy for use with the standard trustedTypes platform API.
 * @public
 */
export type TrustedTypesPolicy = {
  /**
   * Creates trusted HTML.
   * @param html - The HTML to clear as trustworthy.
   */
  createHTML(html: string): string
}

/**
 * Enables working with trusted types.
 * @public
 */
export type TrustedTypes = {
  /**
   * Creates a trusted types policy.
   * @param name - The policy name.
   * @param rules - The policy rules implementation.
   */
  createPolicy(name: string, rules: TrustedTypesPolicy): TrustedTypesPolicy
}

/**
 * The platform global type.
 * @public
 */
export type Global = typeof globalThis & {
  /**
   * Enables working with trusted types.
   */
  trustedTypes: TrustedTypes
}

declare const global: any

/**
 * A reference to globalThis, with support
 * for browsers that don't yet support the spec.
 * @public
 */
export const $global: Global = (function () {
  if (typeof globalThis !== 'undefined') {
    // We're running in a modern environment.
    return globalThis
  }

  if (typeof global !== 'undefined') {
    // We're running in NodeJS
    return global
  }

  if (typeof self !== 'undefined') {
    // We're running in a worker.
    return self
  }

  if (typeof window !== 'undefined') {
    // We're running in the browser's main thread.
    return window
  }

  try {
    // Hopefully we never get here...
    // Not all environments allow eval and Function. Use only as a last resort:
    // eslint-disable-next-line no-new-func
    return new Function('return this')()
  } catch {
    // If all fails, give up and create an object.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {}
  }
})()

/**
 * Represents a callable type such as a function or an object with a "call" method.
 * @public
 */
export type Callable = typeof Function.prototype.call | { call(): void }

/**
 * Allows for the creation of Constructable mixin classes.
 *
 * @public
 */
export type Constructable<T = any> = {
  new (...args: any[]): T
}

/**
 * Reverses all readonly members, making them mutable.
 * @internal
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
