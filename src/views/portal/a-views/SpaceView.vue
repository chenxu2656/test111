<script setup></script>

<template>
  <div class="full-box">
    <div class="reactive-box">个人空间</div>
  </div>
</template>

<style scoped lang="less">
@import '../assets/main.less';

.full-box {
  width: 100%;
  min-height: 200px;
  padding-top: @headerHeight;
  .reactive-box {
    .m-reactive-box;
    font-size: 3em;
  }
}
</style>
