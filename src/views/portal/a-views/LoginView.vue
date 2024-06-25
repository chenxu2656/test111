<script setup>
import EmailLogin from '@/views/portal/a-views/EmailLogin.vue'
</script>

<template>
  <div class="full-box">
    <div class="reactive-box">
      <h1>欢迎使用Q享---每时每刻，充满趣味</h1>
      <EmailLogin />
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';
.full-box {
  padding-top: @headerHeight;
  min-height: 100vh;
  height: 200vh;
  .m-bg;

  .reactive-box {
    .m-reactive-box;
    border: 3px solid #512a10;
  }
}
</style>
