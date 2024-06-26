<script setup>
import { RouterView } from 'vue-router'
import Header from '@/views/portal/a-components/less/Header.vue'
</script>
<template>
  <Header />

  <RouterView />

  <!--    <router-view v-slot="{ Component }">
        &lt;!&ndash; vue2:优先匹配组件name，若未配置name,则匹配文件名&ndash;&gt;
        &lt;!&ndash; vue3:匹配组件name&ndash;&gt;
        &lt;!&ndash;        {{log(Component.type.__name,'Component',fileName)}}&ndash;&gt;
        <keep-alive :include="['NewsView','NewsView2']">
            <component :is="Component" />
        </keep-alive>
    </router-view>-->

  <!--    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" />
        </transition>
    </router-view>-->
</template>

<style scoped lang="less">
@import '@/assets/main.less';
</style>
