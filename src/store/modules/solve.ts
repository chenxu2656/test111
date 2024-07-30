import { defineStore } from "pinia";

export const useSolveStore = defineStore('pure-solve',{
  // id: "pure-solve",
  state: () => ({
    solveObj: {},
  }),
  actions: {
    formattedPrice(price: number) {
      if (price >= 10000) {
        return Math.floor(price / 10000) + "万元";
      } else {
        return Math.floor(price) + "元";
      }
    },
  },
  persist:{
    id:'pure-solve',
    path:['solveObj']
  },
});
export default useSolveStore
