<script setup lang="ts">
import Recommenditem from "@/views/portal/a-components/less/RecommendItem.vue";
interface Bean {
  title: string;
  subTitle: string;
  searchTag: string;
  data: Object;
}
const props = defineProps<{
  bean?: Bean;
}>();

const defaultBean: Bean = {
  title: "MAAS新应用，玩转AI新技术",
  subTitle: "能交给AI工具的，就别自己埋头苦干！",
  searchTag: "AI大模型",
  data: [
    {
      logo: "./src/assets/img/1.png",
      name: "海报设计师",
      type: "AI 大模型",
      description: "无情的AI作图机器，画质超乎你的想象",
      tags: ["运营设计", "自动作图", "批量作图"],
      exampleAvatar: "./src/assets/img/people.jpg",
      exampleName: "食品加工企业市场不经理",
      exampleComment:
        "不要学设计软件，不要学设计软件不要学设计软件不要学设计软件",
      discountPrice: "1.99",
      price: "29.9",
    },
    {
      logo: "./src/assets/img/1.png",
      name: "海报设计师",
      type: "AI 大模型",
      description: "无情的AI作图机器，画质超乎你的想象",
      tags: ["运营设计", "自动作图", "批量作图"],
      exampleAvatar: "./src/assets/img/people.jpg",
      exampleName: "食品加工企业市场不经理",
      exampleComment:
        "不要学设计软件，不要学设计软件不要学设计软件不要学设计软件",
      discountPrice: "1.99",
      price: "29.9",
    },
  ],
};

const bean = props.bean ?? defaultBean;
const goTo = (tag: string) => {
  console.log(tag);
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
        :data="item"
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
