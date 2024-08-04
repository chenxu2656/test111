import { defineStore } from "pinia";
import { getSolveList } from "@/api/solve";
export const useSolveStore = defineStore('pure-solve',{
  // id: "pure-solve",
  state: () => ({
    solveObj: {},
    current_page: 1,
    keyWord: "",
    category: "",
    type: "",
    region: "",
    supplyList: [],
    randomList: [],
    supplyLength: 0,
  }),
  actions: {
    formattedPrice(price: number) {
      if (price >= 10000) {
        return Math.floor(price / 10000) + "万元";
      } else {
        return Math.floor(price) + "元";
      }
    },
    setCategory(category: string) {
      if (category == "全部") category = "";
      this.category = category;
      this.searchSupply();
    },
    setType(type: string) {
      this.type = type == "全部" ? "" : type;
      this.searchSupply();
    },
    setRegion(region: string) {
      if (region == "全部") region = "";
      this.region = region;
      this.searchSupply();
    },
    reset() {
      this.region = "";
      this.category = "";
      this.type = "";
      this.current_page = 1;
      this.keyWord = "";
      this.searchSupply();
    },
    //用于查询
    searchSupply() {
      this.current_page = 1;
      getSolveList(
        this.current_page,
        this.keyWord,
        this.category,
        this.type,
        this.region,
      ).then((res) => {
        this.supplyList = res.data;
        this.supplyLength = res.length;
        console.log(res);
      });
    },
    //用于换页
    searchSupply2() {
      getSolveList(
        this.current_page,
        this.keyWord,
        this.category,
        this.type,
        this.region,
      ).then((res) => {
        this.supplyList = res.data;
        this.supplyLength = res.length;
        console.log(res);
      });
    },
  },
  persist:{
    paths:['solveObj']
  },
});
export default useSolveStore
