<script setup lang="ts">
import Recommenditem from "@/views/portal/a-components/less/RecommendItem.vue";
import { useHomeStore } from "@/store/modules/home";
import router from "@/router";

const homeStore = useHomeStore();
interface Bean {
  title: string;
  subTitle: string;
  searchTag: string;
  data: Array<any>;
}
const props = defineProps<{
  bean?: Bean;
}>();

const bean = props.bean;

const goTo = (tag: string) => {
  homeStore.setclickedTag(tag);
  router.push({
    path: "/search",
    // query: {
    //   tag: tag,
    // },
  });
};
</script>

<template>
  <div class="recommed">
    <div class="title_box">
      <div class="left">
        <div class="title">{{ bean.title }}</div>
        <div class="subTitle">{{ bean.subTitle }}</div>
      </div>
      <div class="more">
        <div class="moreBtn" @click="goTo(bean.searchTag)">点击查看更多</div>
      </div>
    </div>
    <div class="item_box">
      <Recommenditem
        v-for="(item, index) in bean.data"
        :key="index"
        :bean="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommed {
  width: 100%;
  .title_box {
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 20px;
    .left {
      .title {
        font-weight: 800;
        font-size: 32px;
        width: 100%;
      }
      .subTitle {
        font-weight: 400;
        font-size: 20px;
        width: 100%;
      }
    }
    .more {
      .moreBtn {
        font-weight: 600;
        color: #1ab970;
      }
    }
  }
  .item_box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
