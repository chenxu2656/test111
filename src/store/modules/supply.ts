import { defineStore } from 'pinia'
import {  store } from '../utils'

export const useSupplyStore = defineStore({
  id: 'pure-supply',
  state:()=> ({
    supplyId:'123'
  }),
  actions: {

  }
})
export function useSupplyStoreHook() {
  return useSupplyStore(store)
}