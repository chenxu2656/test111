<script setup>
import { Search, CaretRight,Location } from "@element-plus/icons-vue";
import { getSupplyList } from '@/api/supply';
import { useSupplyStoreHook } from '@/store/modules/supply'
import { ref,reactive,onMounted } from "vue";
import router from '@/router'
const keyWord = ref("");

var supplyInfos =reactive([]);

onMounted(() => {
  getSupplyList().then(res => {
     supplyInfos.splice(0, supplyInfos.length, ...res);
    console.log(supplyInfos)
  })
})

const goToDetail = (id) => {
  useSupplyStoreHook().supplyId=id
  // console.log(useSupplyStoreHook().supplyId)
  router.push('/supply_detail')
}
</script>
<template>
  <div>
    <div class="picture">
      <div class="search">
      <h2>需求大厅</h2>
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
    style="margin-left:3vw;height: 6vh">需求发布 <el-icon :size="20"><CaretRight/></el-icon></el-button>
      </div>
      
    </div>
    <div class="allCard">
        <el-card class="myCard" v-for="supplyInfo in supplyInfos" 
         shadow="hover" 
        @click="goToDetail(supplyInfo.id)">
          <h2>{{supplyInfo.name}}</h2>
            <el-text line-clamp="2">
    {{ supplyInfo.content }}
  </el-text>
  <p>
     <span ><el-tag type="info">{{supplyInfo.type}}</el-tag></span>
         <span style="margin-left: 5vw;font-size: 12px;"><el-icon >
      <Location />
    </el-icon>{{supplyInfo.region}}</span>
      <span style="margin-left: 2vw;font-size: 12px;">{{ supplyInfo.start_date }}</span>
  </p>      
        </el-card>
    </div>
      <el-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="pageSize3"
      :size="size"
      :disabled="disabled"
      layout="prev, pager, next, jumper"
      :total="1000"
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
.allCard{
  width:60vw;

  display: grid;
  grid-template-columns: 1fr 1fr;
}
.myCard{
  width:25vw;
  margin-left: 5vw;
  margin-top:4vh;
  height: 26vh;
  cursor: pointer;
}
.myCard h2{
  padding-top: 0vh;
}
.myCard span{
  color:black;
}
.myCard:hover{
  color:rgb(103,194,58)
}
</style>