export interface CurrencyItem {
  id: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Value: number
  Previous: number
}

export interface CurrencyElement {
  [key: string]: CurrencyItem
}

export interface CurrencyList {
  Date: string
  PreviousDate: string
  PreviousURL: string
  Timestamp: string
  Valute: CurrencyElement
}