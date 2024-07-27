<script setup>
import { use_app_state_store } from "@/store/systemStatus.ts";
import { useRouter } from "vue-router";

const props = defineProps({
  bean: {
    type: Object,
    default: {
      showName: "默认名称",
      type: "RouterLink",
      path: "/demo",
      name: "/demo",
      children: [
        {
          showName: "测试1",
          path: "/1",
          name: "/1",
          type: "a",
          target: "_blank",
        },
        { showName: "测试2", path: "/2", name: "/2", type: "RouterLink" },
      ],
    },
  },
});

const router = useRouter();
let appStates = use_app_state_store();

function getLinkProps(item) {
  let props = {};
  props.target = item.target || "_self";
  if (item.type === "RouterLink") {
    props.to = item.path;
  } else if (item.type === "a") {
    props.href = item.path;
  }
  if (item.target === "_blank") {
    props.rel = item.rel || "noopener";
  }
  return props;
}
</script>

<template>
  <div class="header-links-box">
    <component :is="bean.type" class="title" v-bind="getLinkProps(bean)">
      {{ bean.showName }}
    </component>

    <div v-if="bean.children" class="links">
      <component
        :is="item.type"
        v-for="(item, index) in bean.children"
        :key="index"
        v-bind="getLinkProps(item)"
      >
        {{ item.showName }}
        <el-icon v-if="item.target === '_blank'"> <TopRight /></el-icon>
      </component>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/main.less";

.header-links-box {
  white-space: nowrap;
  //word-wrap: break-word;
  //word-break:keep-all;
  font-weight: 500;

  height: @headerHeight;
  width: 100px;

  display: flex;
  justify-content: center;
  place-items: center;
  position: relative;
  z-index: 200;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #333;
    transform-origin: 0% 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &:hover::after {
    transform: translateY(-50%) rotate(270deg);
    border-color: transparent #333 transparent transparent;
    top: 70%;
    left: 100%;
  }
  &:hover {
    .title {
      color: @light-font-hover-color;
      font-size: 18px;
      font-weight: 600;

      .icon {
        .transform-rotate(180deg);
      }
    }

    .links {
      display: flex;
      opacity: 1;
    }
  }

  .title {
    width: fit-content;
    padding: 3px 0px;

    .icon {
      margin-left: 3px;
    }
  }

  .links {
    background-color: @light-bord-color;
    font-weight: normal;
    display: none;
    flex-direction: column;
    padding: 0 20px 6px;
    position: absolute;
    top: 100%;

    border-radius: 0 0 6px 6px;

    opacity: 0;
    transition: opacity 0.3s linear;
  }

  a {
    .m-a-1;
    color: inherit;
    border-radius: 6px;
    display: flex;
    place-items: center;
    font-family:
      PingFang SC,
      PingFang SC-Semibold;
    font-weight: 600;

    &.title:hover {
      color: #0ac067;
    }

    &.router-link-exact-active {
      color: #333;
    }

    &.router-link-active {
      color: #333;
    }
  }
}
</style>
