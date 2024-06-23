<script lang="ts" setup>
import Header from '@/views/portal/components/Header.vue'
</script>

<template>
  <div class="page">
    <Header />
  </div>
</template>

<style lang="scss" scoped>
.page {
  .header {
    display: flex;
    justify-content: center;

    .el-menu {
      width: 1400px;
    }
  }
}
</style>
