<template lang="pug">
.calculator
    h1 Конвертация валюты
    form.calculator__container
      h3 Выберите базовую валюту
      select.calculator__item( v-model="initialCurrencyLabel" )
        option(
          v-for="currency, idx in currencies"
          :key="idx"
          ) {{ currency.Name + ' - ' + currency.CharCode }}
      h3 Значение для конвертации
      input.calculator__item(
        v-model="initialCurrencyValue"
        type="number"
        )
      h3 Выберите целевую валюту
      select.calculator__item( v-model="targetCurrencyLabel" )
        option(
          v-for="currency, idx in currencies"
          :key="idx"
          ) {{ currency.Name + ' - ' + currency.CharCode }}
      h3 Конвертированное значение
      input.calculator__item(
        v-model="targetCurrencyValue"
        disabled
        )
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import store from '@/store'
import type { CurrencyItem } from './types'

const currencies = computed( () => store.getters.currencyValues )

const initialCurrencyValue = ref( '100' )
const initialCurrencyLabel = ref( '' )
const targetCurrencyLabel = ref( 'Евро - EUR' )
const chosenInitialCurrency = computed( () => currencies.value[currencies.value.findIndex( ( item: CurrencyItem ) => initialCurrencyLabel.value.includes( item.CharCode ) )])
const chosenTargetCurrency = computed( () => currencies.value[currencies.value.findIndex( ( item: CurrencyItem ) => targetCurrencyLabel.value.includes( item.CharCode ) )])
const targetCurrencyValue = computed( () => {
  if ( !chosenInitialCurrency.value || !chosenTargetCurrency.value ) return
  const x = chosenInitialCurrency.value === 'RUB' ? 1 : chosenInitialCurrency.value.Value
  const y = chosenTargetCurrency.value === 'RUB' ? 1 : chosenTargetCurrency.value.Value
  return ( +initialCurrencyValue.value * ( x / y ) ).toFixed( 2 )
})

onMounted( async () => {
  await store.dispatch( 'getCurrencies' )
  switch ( navigator.language.slice( 0, 2 ) ) {
    case ( 'en' ):
      initialCurrencyLabel.value = 'Доллар США - USD'
      break
    case ( 'ru' ):
      initialCurrencyLabel.value = 'Российский рубль - RUB'
      break
    default:
      initialCurrencyLabel.value = 'Евро - EUR'
  }
})

</script>


<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

body
  margin: 0px
  padding: 0px

.calculator
  height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  &__container
    width: 400px
    padding: 40px 20px
    box-shadow: 0px 0px 15px 2px rgb(218 210 210)
    display: flex
    flex-direction: column
    justify-content: center
  &__item
    padding: 15px 8px
    outline: none
    background-color: white
    border: 1px solid #b0b0b5
    color: #2c3e50

</style>
