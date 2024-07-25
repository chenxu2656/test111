import { defineStore } from 'pinia'
import {  store } from '../utils'
import { getSupplyList,getRandomRequirments } from '@/api/supply'
export const useSupplyStore = defineStore({
  id: 'pure-supply',
  state:()=> ({
    supplyId: '123',
    current_page: 1,
    keyWord:'',
    category: '',
    type: '',
    region: '',
    supplyList: [],
    supplyLength:0,
  }),
  actions: {
    setCategory(category: string) {
      if (category == '全部') category = '';
      this.category = category
      this.searchSupply()
    },
    setType(type: string) {
      this.type = type == '全部' ? '' : type;
      this.searchSupply();
    },
    setRegion(region: string) {
      if (region == '全部') region = '';
      this.region = region;
      this.searchSupply();
    },
    reset() {
      this.region = '';
      this.category = '';
      this.type = '';
      this.current_page = 1;
      this.keyWord = '';
      this.searchSupply();
    },
    //用于查询
    searchSupply() {
      this.current_page = 1;
      getSupplyList(this.current_page,this.keyWord,this.category, this.type, this.region).then(res => {
        this.supplyList = res.data;
        this.supplyLength = res.length;
        console.log(res);
      })
    },
    //用于换页
    searchSupply2() {
      getSupplyList(this.current_page, this.keyWord, this.category, this.type, this.region).then(res => {
        this.supplyList = res.data;
        this.supplyLength = res.length;
        console.log(res);
      })
    },
    //获取三个随机同品类需求
    getRandomRequirments(category:string){
      getRandomRequirments(category).then(res=>{
        return res.data
      })
    }
  }
})
export function useSupplyStoreHook() {
  return useSupplyStore(store)
}