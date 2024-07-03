<script setup>
import { Search, CaretRight,Location } from "@element-plus/icons-vue";
import { getSupplyList } from '@/api/supply';
import { useSupplyStoreHook } from '@/store/modules/supply'
import { ref,reactive,onMounted } from "vue";
import router from '@/router'
const keyWord = ref("");
const currentPage = ref(1);
const pageSize = 10;
var size = ref(11);
var supplyInfos =reactive([]);
onMounted(() => {
  getSupplyList().then(res => {
     supplyInfos.splice(0, supplyInfos.length, ...res);
      size = res.length;
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
      <h2>解决方案</h2>
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
        <el-card class="myCard" v-for="supplyInfo in supplyInfos" 
         shadow="hover" 
        @click="goToDetail(supplyInfo.id)">
        <el-image src="https://oss-hefei-a2a.openstorage.cn/iiep-prod/7a91f4730e79429c9be4bc77c1e90874.jpg"></el-image>
        <div style="float:right;height: 26vh;width: 30vw;">
        <div class="titleName">{{supplyInfo.name}}</div>
                    <el-text line-clamp="3">
            {{ supplyInfo.content }}
          </el-text>
          <p>
            <span ><el-tag type="info">{{supplyInfo.type}}</el-tag></span>
                <el-text style="margin-left: 15vw;font-size: 1vw;"><el-icon >
              <Location />
            </el-icon>{{supplyInfo.region}}</el-text>
              <span style="margin-left: 2vw;font-size: 1vw;">{{ supplyInfo.start_date }}</span>
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