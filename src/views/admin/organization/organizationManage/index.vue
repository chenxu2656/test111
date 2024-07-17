<script setup lang="ts">
import emptyView from "./components/empty.vue";
const org_id = localStorage.getItem("orgId");
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <div v-if="org_id">组织管理</div>
      <emptyView v-else />
    </el-row>
  </div>
</template>
