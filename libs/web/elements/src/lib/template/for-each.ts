export const forEach = <E>(
  list: E[],
  fn: (element: E, index: number) => void
) => list.map(fn).join('')
