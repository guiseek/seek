const typeInfoRegex = /^:([a-z])(\((.+)\))?/

export type Parser = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => any

export type Parseable = {
  locale: string
  defaultCurrency: string
  messageBundle: Record<string, string>
}

export class Parse {
  static locale: string
  static defaultCurrency: string
  static messageBundle: Record<string, string>

  static use({ locale, defaultCurrency, messageBundle }: Parseable) {
    Parse.locale = locale
    Parse.defaultCurrency = defaultCurrency
    Parse.messageBundle = messageBundle
    return Parse.translate
  }

  static translate(strings: TemplateStringsArray, ...values: string[]) {
    const translationKey = Parse._buildKey(strings)

    const translationString = Parse.messageBundle[translationKey]

    if (translationString) {
      const typeInfoForValues = strings.slice(1).map(Parse._extractTypeInfo)
      const localizedValues = values.map((v, i) =>
        Parse._localize(v, typeInfoForValues[i])
      )
      return Parse._buildMessage(translationString, ...localizedValues)
    }

    return 'Error: translation missing!'
  }

  private static _buildMessage(str, ...values) {
    return str.replace(/{(\d)}/g, (_, index) => values[Number(index)])
  }

  private static _buildKey(strings: TemplateStringsArray) {
    const stripType = (s: string) => s.replace(typeInfoRegex, '')

    const lastPartialKey = stripType(strings[strings.length - 1])

    const prependPartialKey = (memo: string, curr: string, i: number) => {
      return `${stripType(curr)}{${i}}${memo}`
    }

    return strings.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey)
  }

  private static _localize(value: string, { type, options }) {
    return Parse._localizers[type](value, options)
  }

  private static _extractTypeInfo(str: string) {
    const match = typeInfoRegex.exec(str)
    if (match) {
      return { type: match[1], options: match[3] }
    } else {
      return { type: 's', options: '' }
    }
  }

  private static _localizers = {
    s /*string*/: (v) => v.toLocaleString(Parse.locale),
    c /*currency*/: (v, currency) =>
      v.toLocaleString(Parse.locale, {
        style: 'currency',
        currency: currency || Parse.defaultCurrency,
      }),
    n /*number*/: (v, fractionalDigits) =>
      v.toLocaleString(Parse.locale, {
        minimumFractionDigits: fractionalDigits,
        maximumFractionDigits: fractionalDigits,
      }),
  }
}
