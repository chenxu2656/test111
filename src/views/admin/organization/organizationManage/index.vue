<script setup lang="ts">
import emptyView from "./components/empty.vue";
import organizationInfo from "./components/organizationInfo.vue";
const org_id = localStorage.getItem("orgId");
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <organizationInfo v-if="org_id" />
      <emptyView v-else />
    </el-row>
  </div>
</template>
