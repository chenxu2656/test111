<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink class="ainow-logo" to="/">
    <img src="../assets/svg/logo.svg" />
  </RouterLink>
</template>

<style scoped lang="less">
@import "@/assets/main.less";
.ainow-logo {
  color: inherit;
  font-size: 1.4rem;
  font-weight: bold;
  height: 50px;
  display: flex;
  place-items: center;
  &:hover {
    background: transparent;
    color: @light-font-hover-color;
  }
  img {
    height: 50%;
    margin-right: 3px;
  }
}
</style>
