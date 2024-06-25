<script lang="ts" setup>
import AISearch from './components/AISearch.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div class="page">
    <Header />
    <AISearch />
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
