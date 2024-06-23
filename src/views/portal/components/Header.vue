<script lang="ts" setup>
import KeyboardEsc from '@/assets/svg/keyboard_esc.svg?component'
import router from '@/router'
import { ref } from 'vue'

const activeIndex = ref('')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="page">
    <div class="header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <KeyboardEsc />
        </el-menu-item>
        <el-menu-item index="1"> 供需服务 </el-menu-item>
        <el-menu-item index="2"> 生态合作 </el-menu-item>
        <el-sub-menu index="3">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
        <div class="flex-grow" />
        <el-menu-item index="4">工作台</el-menu-item>
        <el-menu-item index="5"
          ><el-button type="primary" @click="goToLogin">注册/登录</el-button>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  .header {
    display: flex;
    justify-content: center;

    .el-menu {
      width: 1400px;
    }
  }
}
</style>
