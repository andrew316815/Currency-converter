import { createStore } from 'vuex'
import axios from 'axios'
import { CurrencyElement, CurrencyList } from '@/types'

export default createStore({
  state: {
    currency: {} as CurrencyElement,
    defaultCurrency: [{
      id: 'rub',
      NumCode: '1',
      CharCode: 'RUB',
      Name: 'Российский рубль',
      Value: 1,
      Previous: 1
    }]
  },
  getters: {
    currencyValues: ( state ) => {
      return state.defaultCurrency.concat( Object.values( state.currency ) )
    }
  },
  mutations: {
    setCurrency( state, currencyList: CurrencyList ) {
      state.currency = currencyList.Valute
    }
  },
  actions: {
    getCurrencies() {
      return axios( 'https://www.cbr-xml-daily.ru/daily_json.js' )
        .then( ( response ) => {
          this.commit( 'setCurrency', response.data )
        })
    }
  },
  modules: {},
})
