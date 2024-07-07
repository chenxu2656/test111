<script setup>
import { Search, CaretRight,Location } from "@element-plus/icons-vue";
import { getSolveList } from '@/api/solve';
// import { useSupplyStoreHook } from '@/store/modules/supply'
import { ref,reactive,onMounted } from "vue";
import router from '@/router'
const keyWord = ref("");
const currentPage = ref(1);
const pageSize = 10;
var size = ref(11);
var solveInfos =reactive([]);
onMounted(() => {
  getSolveList().then(res => {
     solveInfos.splice(0, solveInfos.length, ...res);
      size = res.length;
    console.log(solveInfos)
  })
})

const goToDetail = (id) => {
  // useSupplyStoreHook().supplyId=id
  // console.log(useSupplyStoreHook().supplyId)
  router.push('/solve_detail')
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
         shadow="hover" 
        @click="goToDetail(solveInfo.id)">
        <el-image src="https://oss-hefei-a2a.openstorage.cn/iiep-prod/7a91f4730e79429c9be4bc77c1e90874.jpg"></el-image>
        <div style="float:right;height: 26vh;width: 30vw;">
       <div style="display: flex">
<div class="titleName">{{solveInfo.achievement_name}}</div> <el-tag type="success" style="float:right">{{ solveInfo.achievement_maturity }}</el-tag>
       </div> 
        <el-text>转让方式：{{solveInfo.achievement_transfer_method}} 技术领域：{{solveInfo.achievement_category}}</el-text>           
        <el-text line-clamp="2">
            技术简介：{{ solveInfo.achievement_brief_introduction }}
          </el-text>
          <p>
            <span ><el-tag type="error">成果价格：{{solveInfo.achievement_transfer_price}}</el-tag></span>
                <el-text style="margin-left: 6vw;font-size: 1vw;"><el-icon >
              <Location />
            </el-icon>{{solveInfo.region}}</el-text>
              <span style="margin-left: 2vw;font-size: 1vw;">完成年份：{{ solveInfo.achievement_year }}</span>
          </p>
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
    background-image: url("https://www.huayun.com/upload/image/20210727/08ecbfb624707943dcfc79b4208f2a55.jpg");
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
  width: 25vw;
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
}
.myCard .el-text{
  padding-top: 0vh;
}
.myCard span{
  color:black;
  font-size: 1vw;
}
.myCard:hover{
  color:rgb(103,194,58)
}
</style>