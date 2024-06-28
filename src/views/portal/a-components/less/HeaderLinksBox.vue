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
  <ainow-header-links-box>
    <component :is="bean.type" class="title" v-bind="getLinkProps(bean)">
      {{ bean.showName }}
      <van-icon v-if="bean.children" class="icon" name="arrow-down" />
    </component>

    <div v-if="bean.children" class="links">
      <!-- <a href="http://localhost/donate/" target="_blank" rel="noopener">i am a</a>-->
      <!-- <RouterLink to="/demo?key=hello">查询参数传参</RouterLink>-->
      <!-- :href="item.type === 'a' ? item.path : undefined" -->
      <!-- :to="item.type === 'RouterLink' ? item.path : undefined" -->
      <component
        :is="item.type"
        v-for="(item, index) in bean.children"
        :key="index"
        v-bind="getLinkProps(item)"
      >
        {{ item.showName }}
        <el-icon v-if="item.target === '_blank'">
          <TopRight />
        </el-icon>
      </component>
    </div>
  </ainow-header-links-box>
</template>

<style scoped lang="less">
@import "../../assets/main.less";

ainow-header-links-box {
  white-space: nowrap;
  //word-wrap: break-word;
  //word-break:keep-all;
  font-weight: 500;

  height: @headerHeight;
  width: fit-content;

  display: flex;
  justify-content: center;
  place-items: center;
  position: relative;
  z-index: 200;

  &:hover {
    .title {
      color: @light-font-hover-color;

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

    &.title:hover {
      background-color: transparent;
    }

    &.router-link-exact-active {
      color: @light-font-select-color;
    }

    &.router-link-active {
      color: @light-font-select-color;
    }
  }
}
</style>
