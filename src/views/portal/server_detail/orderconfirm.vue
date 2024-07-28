<script setup lang="ts">
import Header from "@/views/portal/a-components/less/Header.vue";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="false" />

  <CommonFooter id="declare-offset" />
</template>

<style lang="less" scoped></style>
