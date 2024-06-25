<script setup></script>

<template>
  <div class="main">404 not found</div>
</template>

<style scoped lang="less">
@import '../../assets/main.less';

.main {
  color: red;
  .m-full-screen();
  padding: 100px 0 0 0;
  min-height: calc(100vh - @headerHeight - @statusTitleHeight);
  display: flex;
  place-items: center;
  place-content: center;
}
</style>
