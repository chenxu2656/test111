<template>
  <el-card class="w-full h-full">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="系统通知" name="first">
        <systemNotification />
      </el-tab-pane>
      <el-tab-pane label="用户留言" name="second">
        <userMessage />
      </el-tab-pane>
      <el-tab-pane label="组织邀请" name="third">
        <invite />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import systemNotification from "./components/systemNotification.vue";
import invite from "./components/invite.vue";
import userMessage from "./components/userMessage.vue";
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
