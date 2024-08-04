import { defineStore } from "pinia";
import { getSupplyList, getRandomRequirments } from "@/api/supply";
import {createNotification} from "@/api/notice"
export const useSupplyStoreHook = defineStore('pure-supply',{
  state: () => ({
    supplyId: "",
    current_page: 1,
    keyWord: "",
    category: "",
    type: "",
    region: "",
    supplyList: [],
    randomList: [],
    supplyLength: 0,
    notification:{
      from_user_name: "",
      from_user_id: "",
      target_id: "",
      notification_type: 1,
      notification_title: "需求留言",
      notification_content: "",
      status: false
    }
  }),
  actions: {
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
      getSupplyList(
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
      getSupplyList(
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
    //获取5个随机同品类需求
    getRandomRequirments(category: string) {
      getRandomRequirments(category).then((res) => {
        this.randomList = res.data;
      });
    },
    createComment(flag: boolean,content:string){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.notification.from_user_name=flag?'匿名':userInfo.username;
      this.notification.from_user_id=userInfo.id;
      this.notification.target_id=this.supplyId;
      this.notification.notification_content=content;
      createNotification(this.notification).then(res=>{
        console.log(res)
      })
    }
  },
  persist: {  
    paths:['supplyId']
   },  
});
export default  useSupplyStoreHook