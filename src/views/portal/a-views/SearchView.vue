<script setup></script>

<template>
  <div class="full-screen">
    <div class="reactive-box">
      {{ $route.query }}
    </div>
  </div>
  <div class="sec"></div>
</template>

<style scoped lang="less">
@import '../assets/main.less';

.full-screen {
  color: red;
  width: 100%;
  padding: @headerHeight 0 0 0;
  display: flex;
  place-items: center;
  place-content: center;

  .content {
    .m-reactive-box;
    padding: 0.5rem 0.5rem 0;
  }
}
</style>
