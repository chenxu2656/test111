<script setup></script>

<template>
  <div class="main">
    <div class="title">该网站似乎出现了问题</div>
    <RouterView />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/main.less';

.main {
  color: red;
  .m-full-screen();
  padding: calc(@headerHeight + 50px) 0 0 0;
  display: flex;
  place-items: center;
}
</style>
