<script setup>
import { Search, CaretRight,Location } from "@element-plus/icons-vue";
import { getSolveList } from '@/api/solve';
import { useSolveStoreHook } from '@/store/modules/solve'
import { ref,reactive,onMounted } from "vue";
import router from '@/router'
const keyWord = ref("");
const currentPage = ref(1);
const pageSize = 10;
var size = ref(11);
var solveInfos =reactive([]);
onMounted(() => {
  getSolveList().then(res => {
    console.log(res)
     solveInfos.splice(0, solveInfos.length, ...res.data);
      size = res.length;
    console.log(solveInfos)
  })
})
const formattedPrice = (price) => {
  return useSolveStoreHook().formattedPrice(price)
}

const goToDetail = (info) => {
  useSolveStoreHook().solveObj=info
  // console.log(useSupplyStoreHook().supplyId)
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
      style="max-width: 30vw;height: 6vh"
      placeholder="请输入关键词"
      class="input-with-select"
    >
      <template #append>
        <el-button :icon="Search"></el-button>
      </template>
    </el-input>
    <el-button type="success" 
    style="margin-left:3vw;height: 6vh">提供方案 <el-icon :size="20"><CaretRight/></el-icon></el-button>
      </div>
      
    </div>
    <div class="allCard">
        <el-card class="myCard" v-for="solveInfo in solveInfos" 
         shadow="none" 
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
   
        <el-text line-clamp="2" >  
          技术简介：{{ cancelHtml(solveInfo.achievement_brief_introduction) }}  
          </el-text>
          <el-row>
           <el-col :span="12"> <span >成果价格：<el-tag type="error" style="font-size: 1.2vw;color:rgb(255,77,72)">{{formattedPrice(solveInfo.achievement_transfer_price)}}</el-tag></span></el-col>
            <el-col  :span="12">
         <el-text style="font-size: 1vw;"><el-icon>
              <Location />
            </el-icon>{{solveInfo.region}}</el-text>
              <span style="margin-left: 2vw;font-size: 1vw;">完成年份：{{ solveInfo.achievement_year }}</span>
            </el-col>   
         </el-row>
        </div>
          
        </el-card>
    </div>
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :size="size"
      :disabled="disabled"
      layout="prev, pager, next, jumper"
      :total="2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin: 5vh 0 5vh 25vw"
    />
  </div>
</template>
<style scoped lang='less'>
.picture{
  background-image: url("https://preprod.lingyangplat.com/antelope-static-resource/website/images/second-page-banners/banner-demand-EDF2FA.jpg");
  background-size: 100% 100%;
  width:60vw;
  height: 40vh;
}
.picture h2{
  font-size: 2.5vw;
  padding-top: 10vh;
  padding-bottom: 8vh;
}
.search{
  margin-left: 5vw;
}
.el-image{
  height:20vh;
  width: 15vw;
}
.titleName{
  // padding: 10px;
  width: 23vw;
  font-size:1.5vw;
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
}
.myCard span{
  color:black;
  font-size: 1.1vw;
  margin-top:0.3vh;
}
.myCard:hover{
  color:rgb(103,194,58);
  border-color:rgb(103,194,58);
}
#tagC{
  margin-left: 2vw;
  font-size:1vw;
  color:rgb(19,194,104);
  margin-top: 0.5vh;
}
</style>