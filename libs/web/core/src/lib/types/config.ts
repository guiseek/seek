export interface Config {
  selector: string
  providers?: (new (...args: unknown[]) => unknown)[]
}

export class Http {
  async get<T>(url: string) {
    return fetch(url).then((result) => result.json() as Promise<T>)
  }
}
