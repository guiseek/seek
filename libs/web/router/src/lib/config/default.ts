import { WebConfig } from '../interfaces/web-config'

export const defaultConfig: WebConfig = {
  templateId: '#web-layout',
  pageSelector: 'web-page',
  itemSelector: 'li',
  activeClass: 'active',
  logColor: '#33A2F8',
  theme: {
    lightClass: 'light',
    darkClass: 'dark',
  },
}

export function mergeConfig(config?: WebConfig) {
  const theme = Object.assign(defaultConfig.theme, config?.theme ?? {})
  const newConfig = Object.assign(defaultConfig, config ?? {})
  return Object.assign(newConfig, { theme })
}
