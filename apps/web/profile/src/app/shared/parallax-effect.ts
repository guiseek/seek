const LIMIT = 100 // pixel movement

export const genMapper = (
  inLower: number,
  inUpper: number,
  outLower: number,
  outUpper: number
) => {
  const range = inUpper - inLower
  const output = outUpper - outLower
  const MAP = (input: number) => {
    return outLower + (((input - inLower) / range) * output || 0)
  }
  return MAP
}

export const getX = genMapper(0, window.innerWidth, -LIMIT, LIMIT)
export const getY = genMapper(0, window.innerHeight, -LIMIT, LIMIT)
