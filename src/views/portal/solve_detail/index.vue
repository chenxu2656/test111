<script setup>
import Header from "../a-components/less/Header.vue";
import { Warning } from "@element-plus/icons-vue";
import { useSolveStoreHook } from '@/store/modules/solve'
import { reactive } from "vue";
const solveDetail = useSolveStoreHook().solveObj;
const formattedPrice = (price) => {
  return useSolveStoreHook().formattedPrice(price)
}

// import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
</script>
<template>
 <el-backtop :right="10" :bottom="10" />
<Header></Header>
 <div class="all_layout">
  <div class="all_card">
    <el-card>
      <el-descriptions :title="solveDetail.achievement_name">
    <el-descriptions-item label="成果年份：">{{solveDetail.achievement_year}}</el-descriptions-item>
    <el-descriptions-item label="价格：">{{formattedPrice(solveDetail.achievement_transfer_price)}}</el-descriptions-item>
    <el-descriptions-item label="转让方式：">{{solveDetail.achievement_transfer_method}}</el-descriptions-item>
    <el-descriptions-item label="成果类别：">
      <el-tag size="small">{{ solveDetail.achievement_category }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="成果属性：">{{solveDetail.achievement_attribute}}</el-descriptions-item>
    <el-descriptions-item label="成果成熟度：">{{solveDetail.achievement_maturity}}</el-descriptions-item>
    <el-descriptions-item label="技术领域：">{{solveDetail.technology_field}}</el-descriptions-item>
    <el-descriptions-item label="应用行业：">{{solveDetail.main_application_industry}}</el-descriptions-item>
    <el-descriptions-item label="所属产业：">{{ solveDetail.industry_sector }}</el-descriptions-item>
    <el-descriptions-item label="专利号码：">{{solveDetail.patent_number}}</el-descriptions-item>
  </el-descriptions>
      <el-button type="primary" style="margin-top: 3vh"
      size="small">联系发布人</el-button>
      <el-button type="primary" style="margin-top: 3vh"
      size="small" plain>联系平台经理</el-button>
      <div style="float: right;margin-top: 3vh;">
        
        <el-text style="margin-right: 1vw;cursor: pointer"><el-icon><Warning></Warning></el-icon> 举报</el-text>  
        IP来自安徽省</div>
    </el-card>
    <el-card class="bottomC">
     <h3>技术简介</h3> 
     <el-text>{{solveDetail.achievement_brief_introduction}}</el-text>
    <p class="file">附件：无</p>
    </el-card>
  </div>
    <el-card class=rightC>
       <h3>发布人信息</h3> 
       <el-text><p>发布人：{{solveDetail.contact_person}}</p>
       <p>所属单位：{{solveDetail.company_name}}</p></el-text>
      <h3 style="margin-top:3vh">对接记录</h3>
       <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column  prop="date" label="对接ID" width="100" />
    <el-table-column prop="name" label="对接方" width="80" />
    <el-table-column prop="state" label="目前状态" width="80" />
       </el-table>
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
     margin-top: 11vh;
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
    min-height: 25vh;
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
.rightC p{
  margin:1vh 0vh;
  font-size: 1.1vw;
}
.file{
  margin-top:2vh;
}
</style>