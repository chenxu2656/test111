<script setup>
import Header from "../a-components/less/Header.vue";
import { Warning,Refresh } from "@element-plus/icons-vue";
import { useSupplyStoreHook } from '@/store/modules/supply';
import { getAddressByCode } from "@/utils/address";
import { getSupplyDetail } from "@/api/supply";
import { onMounted,reactive,ref } from "vue";
import router from "@/router";
var supplyDetail = reactive({data:{}});
const textarea=ref("")
var category="";
var supplyInfos = computed(() => {
  return useSupplyStoreHook().randomList;
});
onMounted(() => {
  let id=useSupplyStoreHook().supplyId
  getSupplyDetail(id).then(res => {
  supplyDetail.data = res
  console.log(res)
  category=res.category
  useSupplyStoreHook().getRandomRequirments(category)
  })
})
const changeRecommends=()=>{
  useSupplyStoreHook().getRandomRequirments(category)
}
const checkAddress=(address)=>{
  let content=getAddressByCode(address);
  if (content === undefined) {  
    // 可以在这里返回一个默认值、抛出错误或进行其他处理  
    return null; // 或者 ''，取决于你的需求  
  }  
  return content.split('-')[0];  
}
const goToDetail = (id) => {
  useSupplyStoreHook().supplyId = id;
  router.push("/supply_detail");
};

</script>
<template>
 <el-backtop :right="10" :bottom="10" />
<Header></Header>
 <div class="all_layout">

  <div class="all_card">
    <el-card  shadow="never">
      <h2 class="titleName">
        {{supplyDetail.data.name}}
      </h2>
      <el-card shadow="never" style="background-color: #fcfdfd">
        <el-row>
          <el-col :span="12"> <el-text>
        需求类型：{{ supplyDetail.data.type }}
      </el-text>
    </el-col>
    <el-col :span="12">
      <el-text>
        需求区域：{{ getAddressByCode(supplyDetail.data.region) }}
      </el-text>
    </el-col>
      </el-row>
      <p class="requieContent">
        需求内容：
{{supplyDetail.data.content}}
      </p>
      </el-card>
      <el-button type="primary" style="margin-top: 2vh"
      size="small">获得联系方式</el-button>
      <div class="region">
        <el-text style="margin-right: 1vw;cursor: pointer"><el-icon><Warning></Warning></el-icon> 举报</el-text>  
        IP来自{{checkAddress(supplyDetail.data.company_location)}}</div>
    </el-card>
    <el-card class="bottomC" shadow="never">
     <h3>对接记录</h3> 
     <div>
<el-steps class="recordLine" :active="2" align-center>
    <el-step title="企业发布" description="2024-03-31 17:02:55" />
    <el-step title="平台上线" description="2024-03-31 20:02:55" />
    <el-step title="成功对接" description="" />
    <el-step title="需求关闭" description="" />
  </el-steps>
     </div>
    
    </el-card>
  </div>
    <el-card class=rightC  shadow="never">
      <div style="display:flex;margin-bottom: 3vh"> <h3>为您推荐</h3> 
        <el-text  class="refresh" @click="changeRecommends()"><el-icon><Refresh/></el-icon>换一批</el-text>
        </div>
       <el-card shadow="never" @click="goToDetail(i.id)" v-for="i,index in supplyInfos" class="recommend" :key="index">
        <div style="float:left">
          <img src="../../../assets/img/computer.png" class="imgLogo"/>
        </div>
        <div class="recommendC">
        <el-text truncated><b>{{i.name}}</b></el-text><br>
        <el-text size="small" line-clamp="2" class="recommendContent">{{i.content}}</el-text>
        </div>
       <el-divider v-show="index<2"></el-divider>
       </el-card>
    </el-card>
  </div>
  <div class="chatBoard">
    <el-card class="chatCard" shadow="never">
      <h3>留言</h3> 
      <el-input v-model="textarea" maxlength="200" resize="none"
    class="message" placeholder="请留下精彩留言" :rows="4"
    show-word-limit type="textarea"/>
    <el-button type="success" size="small" style="float:right;margin-top: 2vh">发送</el-button>
    </el-card>
</div>
 <!-- <CommonFooter id="declare-offset" /> -->
</template>
<style lang="less" scoped>
@fullHeight:72vh;
@chatHeight:33vh;
@big:calc((1rem + 1vw)*0.7);
@middle:calc((1rem + 1vw)*0.5);
@small:calc((1rem + 1vw)*0.4);
.all_layout{
  margin-left: 10vw;
  min-height: @fullHeight;
  display: flex;
  margin-top: 11vh;
}
.el-text{
  font-size:@middle;
  color:#000;
}
.chatBoard{
  margin-left: 10vw;
  width:80vw;
  min-height: @chatHeight+5vh;
  // margin-bottom: 10vh;
}
.chatCard{
  min-height: @chatHeight;
}
.message {
  width: 77vw;
  margin-top: 2vh;
  resize:none;
  // line-height:4vh;
}
  .all_card{
    width: 55vw;
    height:30vh
  }
  .el-card{
    border:none;
    font-size: @middle;
  }
  .bottomC{
    width: 55vw;
    margin-top: 2vh;
    height: 32vh;
  }
  .rightC{
    width: 24vw;
    margin-left: 1vw;
    height: 60vh;
    overflow:auto;
  }
.rightC::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.rightC::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  height: 20px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(245,247,250);
}
.el-button{
  font-size: @middle;
}
  .recommendC{
    margin-left: 4vw;
  }
  .recommendContent{
    font-size:@middle;
    line-height:3vh;
    height:6vh;
  }
  .recommend {

    // margin-top: 2vh;
    --el-card-padding:5px;
    // background-color:blue;
    cursor: pointer;
  }
  .el-divider{
    margin: 10px 0
  }
  .titleName{
    font-size:@big;
    // margin-left:1.2vw;
  }
  .region{
    float: right;
    margin-top: 3vh;
  }
  h3{
    font-size:@big;
  }
  .recordLine{
    max-width: 55vw;
    margin-top: 5vh;
    font-size:@middle;
  }
  .requieContent{
    line-height:3vh;
    // min-height: 6vh;
  }
  .imgLogo{
  margin-top:1vh;
  width:3vw;
  height:3vw;
}
.refresh{
  margin-left:10vw;
  cursor: pointer;
  // float:right;
}
</style>
