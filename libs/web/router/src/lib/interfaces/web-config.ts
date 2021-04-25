export interface WebThemeConfig {
  lightClass: string
  darkClass: string
}

export interface WebConfig {
  templateId: string
  pageSelector: string
  itemSelector: string
  activeClass: string
  logColor: string
  theme: WebThemeConfig
}
