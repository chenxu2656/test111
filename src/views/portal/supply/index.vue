<script setup lang="ts">
import Header from "../a-components/less/Header.vue";
import MySide from "@/views/portal/supply/components/MySide.vue";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import MainView from "./components/MainView.vue";
</script>
<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="false" />
  <div class="all_layout">
    <el-container>
      <el-aside width="20vw"><MySide :message="'supply'"/></el-aside>
      <el-main><MainView /></el-main>
    </el-container>
  </div>
  <CommonFooter id="declare-offset" />
</template>

<style lang="scss" scoped>
$fullHeight: 80vh;
.all_layout {
  // margin-top: 11vh;
  background-color: white;
  min-height: $fullHeight;
}
.el-container {
  margin-left: 10vw;
  padding-top: 70px;
}
.el-main {
  padding: 0;
}
</style>
