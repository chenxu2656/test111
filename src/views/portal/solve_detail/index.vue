<script setup>
import Header from "@/views/portal/home/components/Header.vue";
import { Warning } from "@element-plus/icons-vue";
import { useSupplyStoreHook } from '@/store/modules/supply'
import { getSupplyDetail } from "@/api/supply";
import { onMounted,reactive } from "vue";
var supplyDetail = reactive({data:{}});
onMounted(() => {
  let id=useSupplyStoreHook().supplyId
  getSupplyDetail(id).then(res => {
    supplyDetail.data = res
    console.log(res)
  })
})
// import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
</script>
<template>
 <el-backtop :right="10" :bottom="10" />
<Header></Header>
 <div class="all_layout">
  <div class="all_card">
    <el-card>
      <el-descriptions title="User Info">
    <el-descriptions-item label="成果年份：">2021</el-descriptions-item>
    <el-descriptions-item label="价格：">18100000000元</el-descriptions-item>
    <el-descriptions-item label="转让方式：">Suzhou</el-descriptions-item>
    <el-descriptions-item label="成果类别：">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="成果属性：">No.1188</el-descriptions-item>
    <el-descriptions-item label="成果成熟度：">No.1188</el-descriptions-item>
    <el-descriptions-item label="成果属性：">No.1188</el-descriptions-item>
    <el-descriptions-item label="成果成熟度：">No.1188</el-descriptions-item>
    <el-descriptions-item label="成果属性：">No.1188</el-descriptions-item>
    <el-descriptions-item label="成果成熟度：">No.1188</el-descriptions-item>
  </el-descriptions>
      <el-button type="primary" style="margin-top: 3vh"
      size="small">获得联系方式</el-button>
      <div style="float: right;margin-top: 3vh;">
        
        <el-text style="margin-right: 1vw;cursor: pointer"><el-icon><Warning></Warning></el-icon> 举报</el-text>  
        IP来自安徽省</div>
    </el-card>
    <el-card class="bottomC">
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
    <el-card class=rightC>
       <h3>为您推荐</h3> 
       <el-card shadow="never" v-for="i in [1,2,3,4,5]" class="recommend">
        <div style="float:left">
          <img src="../../../assets/img/supply.jpg" width="60px" style="margin-top:2vh"/>
        </div>
        <div class="recommendC">
        <el-text truncated><b>私有化电子签章合同管理中台（签+管一体化）</b></el-text>
        <el-text size="small" line-clamp="2">e签宝“签”+“管”一体化天印电子签章合同管理中台系统，提供印章管理、签署服务和合同管理的一体化混合云解决方案。天印电子签章系统旨在为企业的降本增效、风险管控、高效协作赋能。并通过大客户效应带动其业务上下游流量。将电子签约室与企业内部信息化系统的对接，使用独立服务器进行文件签署和存储，使用本地证书的需求广泛，适用于本地化信息系统建设较完善，对安全又较高要求的中大型企业用户。私有云的本地搭建很大程度上需要迎合企业内部的管理规范、业务场景等等，不仅仅是一套简单的本地化部署系统，而是一套整体解决方案。</el-text>
        </div>
       <el-divider style="margin: 10px 0"></el-divider>
       </el-card>
    </el-card>
  </div>
 <!-- <CommonFooter id="declare-offset" /> -->
</template>
<style lang="scss" scoped>
$fullHeight:80vh;
.all_layout{
  margin-left: 10vw;
   min-height: $fullHeight;
   display: flex;
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