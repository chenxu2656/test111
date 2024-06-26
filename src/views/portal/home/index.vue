<script lang="ts" setup>
import Home from '@/views/portal/a-views/HomeView.vue'
</script>

<template>
  <div class="page">
    <!-- <Header /> -->
    <Home />
  </div>
</template>

<style lang="scss" scoped>
.page {
  margin: 0 auto;
  .header {
    display: flex;
    justify-content: center;

    .el-menu {
      width: 1416px;
    }
  }
}
</style>
