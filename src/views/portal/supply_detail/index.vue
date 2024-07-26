<script setup>
import Header from "../a-components/less/Header.vue";
import { Warning } from "@element-plus/icons-vue";
import { useSupplyStoreHook } from '@/store/modules/supply';
import { getAddressByCode } from "@/utils/address";
import { getSupplyDetail } from "@/api/supply";
import { onMounted,reactive,ref } from "vue";
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
// import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
</script>
<template>
 <el-backtop :right="10" :bottom="10" />
<Header></Header>
 <div class="all_layout">
  <div class="all_card">
    <el-card  shadow="never">
      <h2>
        {{supplyDetail.data.name}}
      </h2>
      <el-card shadow="never" style="background-color: aliceblue;">
        <el-text>
        需求类型：{{ supplyDetail.data.type }}
      </el-text>
      <el-text style="margin-left: 10vw">
        需求区域：{{ getAddressByCode(supplyDetail.data.region) }}
      </el-text>
      <p>
        需求内容：
{{supplyDetail.data.content}}
      </p>
      </el-card>
      <el-button type="primary" style="margin-top: 3vh"
      size="small">获得联系方式</el-button>
      <div style="float: right;margin-top: 3vh;">
        
        <el-text style="margin-right: 1vw;cursor: pointer"><el-icon><Warning></Warning></el-icon> 举报</el-text>  
        IP来自{{checkAddress(supplyDetail.data.company_location)}}</div>
    </el-card>
    <el-card class="bottomC" shadow="never">
     <h3>对接记录</h3> 
     <div>
<el-steps style="max-width: 55vw;margin-top: 5vh" :active="2" align-center>
    <el-step title="企业发布" description="2024-03-31 17:02:55" />
    <el-step title="平台上线" description="2024-03-31 20:02:55" />
    <el-step title="成功对接" description="" />
    <el-step title="需求关闭" description="" />
  </el-steps>
     </div>
    
    </el-card>
  </div>
    <el-card class=rightC  shadow="never">
      <div style="display:flex"> <h3>为您推荐</h3> 
        <el-button type="primary" size="small" style="margin-left:2vw" @click="changeRecommends()">
          换一批</el-button></div>
       <el-card shadow="never" v-for="i in supplyInfos" class="recommend" :key="i">
        <div style="float:left">
          <img src="../../../assets/img/supply.jpg" width="60px" style="margin-top:2vh"/>
        </div>
        <div class="recommendC">
        <el-text truncated><b>{{i.name}}</b></el-text>
        <el-text size="small" line-clamp="2">{{i.content}}</el-text>
        </div>
       <el-divider style="margin: 10px 0"></el-divider>
       </el-card>
    </el-card>
  </div>
  <div  class="chatBoard" >
    <el-card class="chatCard" shadow="never">
      <h3>留言</h3> 
      <el-input v-model="textarea" maxlength="200"
    class="message" placeholder="请留下精彩留言" :rows="4"
    show-word-limit type="textarea"/>
    <el-button type="success" size="small" style="float:right;margin-top: 2vh">发送</el-button>
    </el-card>
  </div>
  
 <!-- <CommonFooter id="declare-offset" /> -->
</template>
<style lang="scss" scoped>
$fullHeight:72vh;
$chatHeight:33vh;
.all_layout{
  margin-left: 10vw;
   min-height: $fullHeight;
   display: flex;
  margin-top: 11vh;
}
.chatBoard{
  margin-left: 10vw;
  width:80vw;
  min-height: $chatHeight+5vh;
  // margin-bottom: 10vh;
}
.chatCard{
  min-height: $chatHeight;
}
.message{
  width: 77vw;
  margin-top: 2vh;
  // line-height:4vh;
}
  .all_card{
    width: 55vw;
    height:30vh
  }
  .el-card{
    border:none;
    
  }
  .bottomC{
    width: 55vw;
    margin-top: 2vh;
    height: 32vh;
  }
  .rightC{
    width: 24vw;
    margin-left: 1vw;
    max-height: 70vh;
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
  // background: #E5E5E5;
  background: rgb(245,247,250);
}

  .recommendC{
    margin-left: 6vw;
  }
  .recommend {
    --el-card-padding:5px
  }
</style>