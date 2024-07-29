<script setup>
import Header from "../a-components/less/Header.vue";
import { Warning } from "@element-plus/icons-vue";
import { useSolveStoreHook } from "@/store/modules/solve";
import { getAddressByCode } from "@/utils/address";
const solveDetail = useSolveStoreHook().solveObj;
const formattedPrice = (price) => {
  return useSolveStoreHook().formattedPrice(price);
};
const checkAddress = (address) => {
  let content = getAddressByCode(address);
  if (content === undefined) {
    // 可以在这里返回一个默认值、抛出错误或进行其他处理
    return null; // 或者 ''，取决于你的需求
  }
  return content.split("-")[0];
};
// import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
</script>
<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="false" />
  <div class="all_layout">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="all_card">
          <el-card>
            <h3>{{ solveDetail.achievement_name }}</h3>
            <p>成果年份：{{ solveDetail.achievement_year }}</p>
            <p>
              价格：{{ formattedPrice(solveDetail.achievement_transfer_price) }}
            </p>
            <el-row>
              <el-col :span="12">
                <p>转让方式：{{ solveDetail.achievement_transfer_method }}</p>
                <p>成果属性：{{ solveDetail.achievement_attribute }}</p>
                <p>技术领域：{{ solveDetail.technology_field }}</p>
                <p>所属产业：{{ solveDetail.industry_sector }}</p>
              </el-col>
              <el-col :span="12">
                <p>成果类别：{{ solveDetail.achievement_category }}</p>
                <p>成果成熟度：{{ solveDetail.achievement_maturity }}</p>
                <p>应用行业：{{ solveDetail.main_application_industry }}</p>
                <p>专利号码：{{ solveDetail.patent_number }}</p>
              </el-col>
            </el-row>
            <div style="margin-top: 2vh; float: left; padding-bottom: 2vh">
              <el-button type="primary" size="small">联系发布人</el-button>
              <el-button type="primary" size="small" plain
                >联系平台经理</el-button
              >
            </div>

            <div style="float: right; margin-top: 3vh">
              <el-text style="margin-right: 1vw; cursor: pointer"
                ><el-icon><Warning></Warning></el-icon> 举报</el-text
              >
              IP来自{{ checkAddress(solveDetail.region) }}
            </div>
          </el-card>
          <div></div>

          <el-card class="bottomC">
            <h3>技术简介</h3>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <div v-html="solveDetail.achievement_brief_introduction"></div>
            <p class="file">附件：无</p>
          </el-card>
        </div></el-col
      >
      <el-col :span="6">
        <el-card class="rightC">
          <h3>发布人信息</h3>
          <el-text
            ><p>发布人：{{ solveDetail.contact_person }}</p>
            <p>所属单位：{{ solveDetail.company_name }}</p></el-text
          >
          <h3 style="margin-top: 3vh">对接记录</h3>
          <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column prop="date" label="对接ID" width="100" />
            <el-table-column prop="name" label="对接方" width="80" />
            <el-table-column prop="state" label="目前状态" width="80" />
          </el-table> </el-card
      ></el-col>
    </el-row>
  </div>
  <!-- <CommonFooter id="declare-offset" /> -->
</template>
<style lang="less" scoped>
@fullHeight: 80vh;
@big:calc ((1rem + 1vw)*0.7);
@middle:calc ((1rem + 1vw)*0.5);
@small:calc ((1rem + 1vw)*0.4);

.all_layout {
  // margin-left: 10vw;
  // height: @fullHeight;
  display: flex;
  margin-top: 11vh;
  background: rgb(247, 248, 250);
}
h3 {
  font-size: @big;
  padding-bottom: 1vh;
}
.el-descriptions-item {
  font-size: @middle;
}
.all_card {
  margin-left: 10vw;
  width: 55vw;
  // height: 30vh;
}
.el-card {
  border: none;
  font-size: @middle;
  box-shadow: none;
}

.bottomC {
  width: 55vw;
  margin-top: 2vh;
  min-height: 25vh;
  margin-bottom: 3vh;
}
.rightC {
  width: 24vw;

  max-height: 70vh;
  overflow: auto;
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
  background: rgb(245, 247, 250);
}
.rightC p {
  margin: 1vh 0vh;
  font-size: 1.1vw;
}
.file {
  margin-top: 2vh;
}
</style>
