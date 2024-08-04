<script setup>
import { use_app_state_store } from "@/store/systemStatus.ts";
import HeaderLinksBox from "@/views/portal/a-components/less/HeaderLinksBox.vue";
import Logo from "@/views/portal/a-components/Logo.vue";
import { storeToRefs } from "pinia";
import { ref, watch, onUnmounted, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { useHomeStore } from "@/store/modules/home";
import { isUserLoggedIn } from "@/utils/auth";

const props = defineProps({
  onlyShowOriginalNav: {
    type: Boolean,
    default: false,
  },
});

const { searchTags, activeIndex } = storeToRefs(useHomeStore());
let appStates = use_app_state_store();
const { headerState, navs } = storeToRefs(appStates);
console.log(navs.value);
let router = useRouter();
let route = useRoute();

let headerBoxShadow = ref("");
watch(
  () => route.path,
  (newValue) => {
    if (newValue === "/menu") {
      headerBoxShadow.value = "0 0 0 #000";
    } else {
      headerBoxShadow.value = "0 0 30px rgba(0, 0, 0, .2)";
    }
  },
  {
    immediate: true,
  },
);

/* menuIcon */
const btnMenu = ref();
let menuIconName = ref("");
watch(
  () => route.path,
  (newValue) => {
    if (newValue === "/menu") {
      menuIconName.value = "cross";
    } else {
      menuIconName.value = "wap-nav";
    }
  },
  {
    immediate: true,
  },
);
watch(menuIconName, () => {
  btnMenu.value.classList.toggle("transform-rotate-180");
});

function menuClick() {
  if (menuIconName.value === "cross") {
    router.back();
  } else {
    router.push("/menu");
  }
}

/* menuIcon */

/* 透明模式 */
let headerHeight = ref("50px");
watch(
  () => headerState.value.showBehavior,
  (newValue, oldValue) => {
    if (newValue.includes("transparentMode")) {
      window.addEventListener("scroll", transparentAnimation);
      headerHeight.value = "70px";
    } else {
      window.removeEventListener("scroll", transparentAnimation);
      headerHeight.value = "70px";
    }
  },
  {
    immediate: true,
  },
);

function transparentAnimation() {
  if (window.scrollY > 0) {
    headerHeight.value = "70px";
    appStates.$patch({
      headerState: {
        bgc: "white",
        color: "#101010",
      },
    });
  } else {
    headerHeight.value = "70px";
    appStates.$patch({
      headerState: {
        bgc: "white",
        color: "#101010",
      },
    });
  }
}

function onMouseover() {
  if (
    window.scrollY === 0 &&
    headerState.value.showBehavior.includes("transparentMode")
  ) {
    headerHeight.value = "70px";
    appStates.$patch({
      headerState: {
        color: "#101010",
        bgc: "white",
      },
    });
  }
}

function onMouseleave() {
  if (
    window.scrollY === 0 &&
    headerState.value.showBehavior.includes("transparentMode")
  ) {
    headerHeight.value = "70px";
    appStates.$patch({
      headerState: {
        color: "#101010",
        bgc: "transparent",
      },
    });
  }
}

/* 透明模式 */

/* auto hide mode */
let lastScrollY = 0;
let header = ref();
watch(
  () => headerState.value.showBehavior,
  (newValue, oldValue) => {
    if (newValue.includes("autoHide")) {
      window.addEventListener("scroll", autoHide);
    } else {
      appStates.$patch({ headerState: { headerTransform: "translateY(0)" } });
      window.removeEventListener("scroll", autoHide);
    }
  },
  {
    immediate: true,
  },
);
function autoHide() {
  const currentScrollY = window.scrollY;
  const difference = currentScrollY - lastScrollY;
  if (difference > 100) {
    appStates.$patch({ headerState: { transform: "translateY(-50px)" } });
    lastScrollY = currentScrollY;
  } else if (difference < -100) {
    appStates.$patch({ headerState: { transform: "translateY(0)" } });
    // header.value.classList.add("active")
    lastScrollY = currentScrollY;
  }
  if (currentScrollY == 0) {
    // header.value.classList.remove("active")
  }
}

const goToLogin = () => {
  console.log(isUserLoggedIn());
  if (isUserLoggedIn()) {
    router.push("/welcome");
  } else {
    const currentPath = window.location.href;
    const parts = currentPath.split("/");
    const lastPart = "/" + parts.pop();
    localStorage.setItem("redirectPath", lastPart);
    router.push("/login");
  }
};

const goToWork = () => {
  console.log(isUserLoggedIn());
  if (isUserLoggedIn()) {
    router.push("/welcome");
  } else {
    router.push("/login");
  }
};

const showOriginalNav = ref(true);

const handleScroll = () => {
  // if (document.documentElement.scrollTop > 500) {
  //   showOriginalNav.value = false;
  // } else {
  //   showOriginalNav.value = true;
  // }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const placeholders = ref([
  "职场办公如何用AI新技术",
  "如何提升工作效率",
  "AI在办公中的应用",
  "未来的智能办公趋势",
]);
const currentPlaceholder = ref(placeholders.value[0]);
let placeholderIndex = 0;

const changePlaceholder = () => {
  placeholderIndex = (placeholderIndex + 1) % placeholders.value.length;
  currentPlaceholder.value = placeholders.value[placeholderIndex];
};

let intervalId;
onMounted(() => {
  intervalId = window.setInterval(changePlaceholder, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

function scrollToSection(sectionId, index) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // 调整偏移量
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    activeIndex.value = index; // 更新激活的导航项
  }
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="showOriginalNav"
      ref="header"
      class="header original-navbar"
      :style="{
        backgroundColor: white,
        height: headerHeight,
        position: headerState.position,
        boxShadow: headerBoxShadow,
        color: headerState.color,
        transform: headerState.transform,
      }"
      @mouseover="onMouseover"
      @mouseleave="onMouseleave"
    >
      <div
        v-if="!headerState.showBehavior.includes('titleMode')"
        class="content-title"
      >
        {{ headerState.title }}
      </div>

      <div v-else class="content-pc">
        <div class="often"><Logo /></div>

        <div class="nav">
          <HeaderLinksBox
            v-for="(item, index) in navs"
            :key="index"
            :bean="item"
          />
        </div>
      </div>
      <div style="flex-grow: 1"></div>
      <div class="right_options">
        <el-button link type="primary" class="work" @click="goToWork"
          >工作台</el-button
        >
        <el-button type="primary" class="login" @click="goToLogin"
          >注册/登录</el-button
        >
      </div>
    </div>
    <div v-else-if="onlyShowOriginalNav || showOriginalNav" class="new-navbar">
      <div class="often"><Logo /></div>
      <el-input class="search_input" :placeholder="currentPlaceholder">
        <template #append>
          <el-button class="button">搜索</el-button>
        </template>
      </el-input>
      <div class="s_navbar">
        <div class="con">
          <div
            class="search_tags"
            :class="{ active: activeIndex === index }"
            v-for="(item, index) in searchTags"
            :key="index"
            @click="scrollToSection(item.id, index)"
          >
            {{ item.tag }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import "@/assets/main.less";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
:deep(.el-menu) {
  background-color: transparent;
}
.navbar-wrapper {
  position: relative;
}

.original-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
}

.new-navbar {
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  opacity: 1;
  color: #333;
  transition: opacity 0.3s;
  height: 80px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 100%;
  align-items: center;
  justify-items: center;
  width: 100%;
  min-width: @bodyMinWidth;
  padding: 0 50px;
  .often {
    display: flex;
    place-content: center;
    place-items: center;
    height: 80px;
  }
  :deep(.search_input) {
    height: 40px;
    width: 50%;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    .el-input__wrapper {
      box-shadow: none !important;
      border-radius: 10px;
    }
    .el-input-group__append {
      background-color: #fff;
      box-shadow: none !important;
      border-radius: 10px;
      padding-right: 0px;
      .el-icon {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .el-button {
      background-color: #13ae68;
      margin-right: 3px;
      height: 25px;
      color: white;
      display: flex;
    }
  }
}
.s_navbar {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  opacity: 1;
  color: #333;
  transition: opacity 0.3s;
  height: 40px;

  width: 100%;
  min-width: @bodyMinWidth;
  padding: 0 calc((100vw - 300px) / 4);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .con {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .search_tags {
      margin: 0 60px;
    }
  }
}
.s_navbar .con .search_tags {
  cursor: pointer;
}
.s_navbar .con .search_tags.active {
  font-weight: bold;
  border-bottom: 3px solid #13ae68;
  /* 添加更多样式 */
}
.showNewNavbar {
  opacity: 1;
}
.header {
  transition: all 0.3s ease;
  position: inherit;
  top: 0;
  left: 0;
  z-index: 9900;

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 100%;
  //overflow: hidden;
  align-items: center;

  height: @headerHeight;
  width: 100%;
  min-width: @bodyMinWidth;
  //box-shadow: 0 0 30px rgba(0, 0, 0, .2);
  padding: 0 50px;
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

  .content-pc {
    height: 100%;
    width: 70vw;
    display: flex;

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
      height: 80px;
      width: auto;
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
  .right_options {
    .work {
      color: #333;
      font-weight: 600;
      margin-right: 40px;
    }
    .login {
      background-color: #13ae68;
      font-weight: 600;
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
