import { Config } from './config'

export interface ElementConfig extends Config {
  template: string
  style?: string
  templateUrl?: string
  useShadow?: boolean
}
