<script setup>
import { Search, CaretRight,Location } from "@element-plus/icons-vue";
import { getAddressByCode } from "@/utils/address";
import useSolveStore from '@/store/modules/solve'
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const keyWord = ref("");
var currentPage = ref(1);
var total = computed(() => {
  return useSolveStore().supplyLength;
});
var solveInfos = computed(() => {
  return useSolveStore().supplyList;
});
const handleCurrentChange = () => {
  useSolveStore().current_page = currentPage.value;
  useSolveStore().searchSupply2();
};
onMounted(() => {
  handleCurrentChange();
})
const searchKeyword = () => {
  useSolveStore().keyWord = keyWord.value;
  useSolveStore().searchSupply();
};
const formattedPrice = (price) => {
  return useSolveStore().formattedPrice(price)
}

const goToDetail = (info) => {
  useSolveStore().solveObj=info
  router.push('/solve_detail')
}
const cancelHtml=(item)=>{
  return item.replace(/<[^>]*>?/gm, '');  
}
</script>
<template>
  <div>
    <div class="picture">
      <div class="search">
      <h2>科技成果</h2>
      <el-input
      v-model="keyWord"
      placeholder="请输入关键词"
      class="input-with-select"
    >
      <template #append>
        <el-button :icon="Search"  @click="searchKeyword()"></el-button>
      </template>
    </el-input>
    <el-button type="success" class="sussessBt">
      提供方案 <el-icon :size="20"><CaretRight/></el-icon></el-button>
      </div>
      
    </div>
    <div class="allCard">
        <el-card class="myCard" v-for="solveInfo,i in solveInfos" 
         shadow="none" :key="i"
        @click="goToDetail(solveInfo)">
        <el-image :src="solveInfo.achievement_image"></el-image>
        <div style="float:right;height: 26vh;width: 30vw;">
       <div style="display: flex">
<div class="titleName">{{solveInfo.achievement_name}}</div> <el-tag type="success" id="tagC">{{ solveInfo.achievement_maturity }}</el-tag>
       </div> 
          <el-row>
    <el-col :span="12"><span >转让方式：{{solveInfo.achievement_transfer_method}}</span></el-col>
    <el-col :span="12"><el-tooltip effect="light" :content="solveInfo.achievement_category" placement="bottom"> 
      <el-text line-clamp="1">
      <span style="width:10vw">技术领域：{{solveInfo.achievement_category}}</span> </el-text> 
      </el-tooltip>
    </el-col>
  </el-row>      
   
        <el-text line-clamp="2" class="introduceBrief">  
          技术简介：{{ cancelHtml(solveInfo.achievement_brief_introduction) }}  
          </el-text>
          <el-row class="bottomC">
           <el-col :span="10"> <span >成果价格：<el-tag type="error" class="price" style="font-size:calc((1rem + 1vw)*0.6);border-width:0;color:rgb(255,77,72);">{{formattedPrice(solveInfo.achievement_transfer_price)}}</el-tag></span></el-col>
            <el-col  :span="14">
         <el-text class="iconF"><el-icon>
              <Location />
            </el-icon>{{getAddressByCode(solveInfo.region)}}</el-text>
              <span class="achieve_year">完成年份：{{ solveInfo.achievement_year }}</span>
            </el-col>   
         </el-row>
        </div>
          
        </el-card>
    </div>
      <el-pagination
      class="pageSet"
      v-model:current-page="currentPage"
      default-page-size
      :disabled="disabled"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style scoped lang='less'>
@big:calc((1rem + 1vw)*0.7);
@middle:calc((1rem + 1vw)*0.5);
@small:calc((1rem + 1vw)*0.4);
.picture{
  background-image: url("https://preprod.lingyangplat.com/antelope-static-resource/website/images/second-page-banners/banner-demand-EDF2FA.jpg");
  background-size: 100% 100%;
  width:60vw;
  height: 40vh;
}
.picture h2{
  font-size: calc(1rem + 1vw);
  font-size: 2.5vw;
  padding-top: 10vh;
  padding-bottom: 8vh;
}
.search{
  margin-left: 5vw;
  font-size:@middle
}
.input-with-select{
  max-width: 30vw;
   height: 6vh;
   font-size:@middle;
}
.el-image{
  height:20vh;
  width: 15vw;
}
.titleName{
  // padding: 10px;
  width: 23vw;
  font-size:@big;
  font-weight:600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.allCard{
  width:60vw;
  // display: block;
}
.myCard{
  width:50vw;
  margin-left: 5vw;
  margin-top:4vh;
  height: 26vh;
  cursor: pointer;
  border-width: 0.5px;
}
.myCard .el-text{
  padding-top: 0vh;
  font-size: @middle;
}
.introduceBrief{
  font-size: @middle;
  line-height: 3vh;
  min-height: 6vh;
}
.myCard span{
  color:black;
  // min-height: 8vh;
  // line-height:3vh;
  font-size: @middle;
  margin-top:0.3vh;
}
.myCard:hover{
  color:rgb(103,194,58);
  border-color:rgb(103,194,58);
}
#tagC{
  margin-left: 2vw;
  font-size:@middle;
  color:rgb(19,194,104);
  margin-top: 0.5vh;
}
.iconF{
  font-size:@small;
}
.sussessBt{
  margin-left:3vw;
  height: 6vh;
  font-size:@middle;
}
.achieve_year{
  font-size:@small;
  margin-left: 2vw;
}
.pageSet{
  margin: 5vh 0 5vh 25vw;
  font-size:@middle;
}

</style>