<script setup lang="ts">
import router from "@/router";

const org_id = localStorage.getItem("orgId");
if (!org_id) {
  router.push("/organization/manage");
}
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around"> 成员管理 </el-row>
  </div>
</template>
