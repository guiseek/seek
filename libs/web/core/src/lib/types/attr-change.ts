export interface AttrChange<T = any> {
  name: string
  prev: T | null
  next: T | null
}
