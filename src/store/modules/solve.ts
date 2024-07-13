import { defineStore } from 'pinia'
import { store } from '../utils'

export const useSolveStore = defineStore({
  id: 'pure-solve',
  state: () => ({
    solveObj:''
  }),
  actions: {
   formattedPrice (price:number){
      if (price >= 10000) {
        return Math.floor(price / 10000) + '万元';
      } else {
        return Math.floor(price) + '元';
      }
    }
  }
})
export function useSolveStoreHook() {
  return useSolveStore(store)
}