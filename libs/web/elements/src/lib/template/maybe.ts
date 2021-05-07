export const maybeNot = (condition: boolean, fn: () => void) => fn

export const maybe = (condition: boolean, fn: () => void) => !condition ?? fn
