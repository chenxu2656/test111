<script setup lang="ts">
import router from "@/router";
</script>
<template>
  <div class="flex flex-col items-center gap-5">
    <img
      src="@/assets/images/organization.png"
      alt=""
      srcset=""
      width="500px"
    />
    <span>您未加入任何组织，暂时无法发布数字化服务</span>
    <el-button
      size="large"
      type="primary"
      class="w-80"
      @click="router.push('/organization/create')"
      >创建组织</el-button
    >
  </div>
</template>
