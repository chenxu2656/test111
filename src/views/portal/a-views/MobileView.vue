<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { showToast } from 'vant'

const active = ref('home')
const onChange = index => {
  console.log('index', index)
}
</script>

<template>
  <RouterView />
  <div class="bottom-nav-bar">
    <div class="content">
      <van-tabbar
        class=""
        style="position: inherit"
        v-model="active"
        @change="onChange"
      >
        <van-tabbar-item name="menu" icon="home-o" to="/menu"
          >菜单</van-tabbar-item
        >
        <van-tabbar-item name="search" icon="search" to="/search"
          >搜索</van-tabbar-item
        >
        <van-tabbar-item name="setting" icon="setting-o" to="/setting"
          >设置</van-tabbar-item
        >
        <van-tabbar-item name="mine" icon="contact-o" to="/mine"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../assets/main.less';
.bottom-nav-bar {
  margin: 0 auto;
  position: fixed;
  height: 50px;
  width: 100%;
  bottom: 0;
  .content {
    .m-reactive-box;
    height: 100%;
    background: red;
  }
}
</style>
