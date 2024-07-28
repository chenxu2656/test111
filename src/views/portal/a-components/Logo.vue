<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink class="ainow-logo" to="/">
    <img src="@/assets/images/logo_with_name.png" />
  </RouterLink>
</template>

<style scoped lang="less">
@import "@/assets/main.less";
.ainow-logo {
  color: inherit;
  font-size: 1.4rem;
  font-weight: bold;
  height: 70px;
  width: auto;
  display: flex;
  place-items: center;
  &:hover {
    background: transparent;
    color: @light-font-hover-color;
  }
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
