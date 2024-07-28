<script setup lang="ts">
import Recommenditem from "@/views/portal/a-components/less/RecommendItem.vue";
import { useHomeStore } from "@/store/modules/home";
import { useRouter } from "vue-router";
const router = useRouter();
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
  });
};
</script>

<template>
  <div class="recommed">
    <div class="title_box">
      <div class="left">
        <div class="title">{{ bean?.title }}</div>
        <div class="subTitle">{{ bean?.subTitle }}</div>
      </div>
      <div class="more">
        <div class="moreBtn" @click="goTo(bean?.searchTag as string)">
          点击查看更多
        </div>
        <span class="green-animate-arrow"></span>
      </div>
    </div>
    <div class="item_box">
      <Recommenditem
        v-for="(item, index) in bean?.data"
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
    height: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    .left {
      .title {
        color: #1b1e22;
        font-size: 32px;
        line-height: 52px;
        font-weight: 600;
        font-family:
          PingFang SC,
          PingFang SC-Semibold;
      }
      .subTitle {
        color: #565d66;
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
      }
    }
    .more {
      width: 150px;
      cursor: pointer;
      align-items: center;
      display: flex;
      .moreBtn {
        font-weight: 600;
        color: #1ab970;
      }
      .green-animate-arrow {
        display: inline-block;
        margin-left: 10px;
        right: 0;
        width: 16px;
        height: 16px;
        transition: all ease-in-out 0.3s;
        border-radius: 8px;
        background-color: #13ae68;
        background-image: url(@/assets/svg/arrow-left-white.svg);
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
      }
    }
  }
  .more:hover {
    .moreBtn {
      font-weight: 800;
    }
    .green-animate-arrow {
      width: 32px;
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
