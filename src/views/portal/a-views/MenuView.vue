<script setup>
import MenuLinksBox from '@/views/portal/a-components/less/MenuLinksBox.vue'
import { use_app_state_store } from '@/stores/systemStatus.ts'
import { storeToRefs } from 'pinia'
import CommonFooter from '@/views/portal/a-views/CommonFooter.vue'
import Divider from '@/views/portal/a-components/less/Divider.vue'

let appStates = use_app_state_store()
let { navs, headerState } = storeToRefs(appStates)

let newNavs = []
let aNavItem = {
  // showName:'其他',
  showName: '',
  type: 'a',
  path: '#',
  children: []
}
navs.value.forEach(item => {
  if (item.children) {
    newNavs.push(item)
  } else {
    aNavItem.children.push(item)
  }
})
newNavs.unshift(aNavItem)
</script>

<template>
  <div class="full-screen">
    <div class="menu">
      <MenuLinksBox v-for="(item, index) in newNavs" :key="index" :bean="item">
      </MenuLinksBox>
    </div>
    <CommonFooter />
  </div>
</template>

<style scoped lang="less">
@import '../assets/main.less';
.full-screen {
  width: 100%;
  padding: @headerHeight 0 0;

  .menu {
    .m-reactive-box;
    word-wrap: break-word;
    color: #000;
    padding: 10px 5px;

    //display: flex;
    //place-items: flex-start;

    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;

    row-gap: 10px;

    @media (max-width: 800px) {
      //display: none !important;
    }
  }
}
</style>
