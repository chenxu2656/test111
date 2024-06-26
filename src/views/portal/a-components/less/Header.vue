<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onUnmounted, ref, watch, computed, onMounted } from 'vue'
import { use_app_state_store } from '@/stores/systemStatus.ts'
import { storeToRefs } from 'pinia'
import HeaderLinksBox from '@/views/portal/a-components/less/HeaderLinksBox.vue'
import { Place } from '@element-plus/icons-vue'
import Logo from '@/views/portal/a-components/Logo.vue'

let appStates = use_app_state_store()
const { headerState, navs } = storeToRefs(appStates)

console.log(headerState, navs)

let router = useRouter()
let route = useRoute()

let headerBoxShadow = ref('')
watch(
  () => route.path,
  newValue => {
    if (newValue === '/menu') {
      headerBoxShadow.value = '0 0 0 #000'
    } else {
      headerBoxShadow.value = '0 0 30px rgba(0, 0, 0, .2)'
    }
  },
  {
    immediate: true
  }
)

/* menuIcon */
const btnMenu = ref()
let menuIconName = ref('')
watch(
  () => route.path,
  newValue => {
    if (newValue === '/menu') {
      menuIconName.value = 'cross'
    } else {
      menuIconName.value = 'wap-nav'
    }
  },
  {
    immediate: true
  }
)
watch(menuIconName, () => {
  btnMenu.value.classList.toggle('transform-rotate-180')
})

function menuClick() {
  if (menuIconName.value === 'cross') {
    router.back()
  } else {
    router.push('/menu')
  }
}

/* menuIcon */

/* 透明模式 */
let headerHeight = ref('50px')
watch(
  () => headerState.value.showBehavior,
  (newValue, oldValue) => {
    if (newValue.includes('transparentMode')) {
      window.addEventListener('scroll', transparentAnimation)
      headerHeight.value = '70px'
    } else {
      window.removeEventListener('scroll', transparentAnimation)
      headerHeight.value = '50px'
    }
  },
  {
    immediate: true
  }
)

function transparentAnimation() {
  if (window.scrollY > 0) {
    headerHeight.value = '50px'
    appStates.$patch({
      headerState: {
        bgc: 'white',
        color: '#101010'
      }
    })
  } else {
    headerHeight.value = '70px'
    appStates.$patch({
      headerState: {
        bgc: 'transparent',

        color: '#dfdfdf'
      }
    })
  }
}

function onMouseover() {
  if (
    window.scrollY === 0 &&
    headerState.value.showBehavior.includes('transparentMode')
  ) {
    headerHeight.value = '50px'
    appStates.$patch({
      headerState: {
        color: '#101010',
        bgc: 'white'
      }
    })
  }
}

function onMouseleave() {
  if (
    window.scrollY === 0 &&
    headerState.value.showBehavior.includes('transparentMode')
  ) {
    headerHeight.value = '70px'
    appStates.$patch({
      headerState: {
        color: '#dfdfdf',
        bgc: 'transparent'
      }
    })
  }
}

/* 透明模式 */

/* auto hide mode */
let lastScrollY = 0
let header = ref()
watch(
  () => headerState.value.showBehavior,
  (newValue, oldValue) => {
    if (newValue.includes('autoHide')) {
      window.addEventListener('scroll', autoHide)
    } else {
      appStates.$patch({ headerState: { headerTransform: 'translateY(0)' } })
      window.removeEventListener('scroll', autoHide)
    }
  },
  {
    immediate: true
  }
)
function autoHide() {
  const currentScrollY = window.scrollY
  const difference = currentScrollY - lastScrollY
  if (difference > 100) {
    appStates.$patch({ headerState: { transform: 'translateY(-50px)' } })
    lastScrollY = currentScrollY
  } else if (difference < -100) {
    appStates.$patch({ headerState: { transform: 'translateY(0)' } })
    // header.value.classList.add("active")
    lastScrollY = currentScrollY
  }
  if (currentScrollY == 0) {
    // header.value.classList.remove("active")
  }
}

/* auto hide mode */

/*
window.addEventListener('resize', ()=>{
    if (window.innerWidth <= 800) {

    } else {

    }
})
*/
</script>

<template>
  <ainow-common-header
    ref="header"
    class="header"
    :style="{
      backgroundColor: headerState.bgc,
      height: headerHeight,
      position: headerState.position,
      boxShadow: headerBoxShadow,
      color: headerState.color,
      transform: headerState.transform
    }"
    @mouseover="onMouseover"
    @mouseleave="onMouseleave"
  >
    <div ref="btnMenu" class="btn-menu" @click="menuClick">
      <van-icon :name="menuIconName" size="1.5em" />
    </div>

    <div
      v-if="headerState.showBehavior.includes('titleMode')"
      class="content-title"
    >
      {{ headerState.title }}
    </div>

    <div v-else class="content-pc">
      <div class="often">
        <van-icon name="ellipsis" size="1.5em" />
      </div>

      <RouterLink class="search" to="/search">
        <van-icon class="icon" name="search" size="1.5em" />
        <div class="hint">Ctrl+K</div>
      </RouterLink>

      <div class="mine" @click="$router.push('/space')">
        <img src="@/assets/img/imgHead.jpg" />
      </div>

      <div class="nav">
        <HeaderLinksBox
          v-for="(item, index) in navs"
          :key="index"
          :bean="item"
        />
      </div>
    </div>

    <Logo />
  </ainow-common-header>
</template>

<style scoped lang="less">
@import '../../assets/main.less';

.header {
  position: inherit;
  top: 0;
  left: 0;
  z-index: 100;

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 100%;
  //overflow: hidden;
  align-items: center;

  height: @headerHeight;
  width: 100%;
  min-width: @bodyMinWidth;
  //box-shadow: 0 0 30px rgba(0, 0, 0, .2);
  padding: 0 calc((100vw - 300px) / 10);
  //background-color: @light-bord-color;

  font-size: 16px;
  //color: @light-font-color;
  word-break: keep-all;
  transition: all 0.4s;

  &:hover {
    color: red;
    height: @headerHeight;
    background: @light-bord-color;
  }

  &.hidden {
    //top: calc(var(--header-height) * (-1));
    transform: translateY(-50px);
  }

  @media (max-width: 800px) {
    padding: 0 calc((100vw - 100px) / 20);
  }
  @media (max-width: 450px) {
    padding: 0 calc((100vw - 200px) / 12);
  }
  @media (max-width: 400px) {
    padding: 0 5px 0 3px;
  }
  @media (max-width: 300px) {
    padding: 0;
  }

  .btn-menu {
    display: flex;
    place-content: center;
    place-items: center;
    width: 30px;
    height: 40px;
    transition: transform 0.3s;
  }

  .content-pc {
    height: 100%;
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    grid-template-rows: 100%;
    justify-items: start;
    align-items: center;

    .mine {
      height: 100%;
      display: flex;
      place-items: center;
      padding: 0 8px 0 6px;

      img {
        border-radius: 50%;
        height: 50%;
        border: 1px solid @light-border-color;
      }
    }

    .search {
      display: flex;
      place-content: center;
      place-items: center;

      padding: 0 6px 0 3px;
      color: inherit;
      height: 40px;

      &:hover {
        color: @light-font-hover-color;
        background: transparent;
      }

      .hint {
        @media (max-width: 800px) {
          display: none;
        }
      }
    }

    .often {
      display: flex;
      place-content: center;
      place-items: center;
      height: 40px;
      @media (max-width: 450px) {
        //display: none;
      }

      i {
        .transform-rotate(90deg);
      }
    }

    .nav {
      height: 100%;
      width: 100%;

      //width: fit-content;
      padding-left: 5px;
      display: grid;
      //grid-template-columns: repeat(auto-fit, auto);
      //grid-template-columns: repeat(auto-fit, minmax(auto, 1fr));
      grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
      //grid-template-columns: min-content min-content min-content min-content min-content;
      grid-template-columns: max-content min-content max-content max-content max-content max-content;
      //grid-template-columns: auto auto auto auto auto;
      gap: 1rem 1rem;
      //grid-auto-columns: 5rem;
      //grid-template-rows: 100%;

      //overflow: hidden;
      justify-items: start;
      align-items: center;

      @media (max-width: 800px) {
        display: none;
      }
    }
  }

  .content-title {
    width: 100%;
    display: flex;
    place-content: center;
    place-items: center;
  }
}
</style>
