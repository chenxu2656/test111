<script setup lang="ts">
interface Bean {
  imgPath: string;
  title: string;
  summary: string;
  detailPath: string;
  date: string;
  author: string;
}

interface NewBean {
  logo: string;
  name: string;
  type: string;
  description: string;
  tags: string[];
  exampleAvatar: string;
  exampleName: string;
  exampleComment: string;
  discountPrice: string;
  price: string;
}

const props = defineProps<{
  bean?: Bean;
  newBean?: NewBean;
}>();

const defaultBean: NewBean = {
  logo: "./src/assets/img/1.png",
  name: "海报设计师",
  type: "AI 大模型",
  description: "无情的AI作图机器，画质超乎你的想象",
  tags: ["运营设计", "自动作图", "批量作图"],
  exampleAvatar: "avatar",
  exampleName: "食品加工企业市场不经理",
  exampleComment: "不要学设计软件，不要学设计软件不要学设计软件不要学设计软件",
  discountPrice: "1.99",
  price: "29.9",
};

const bean = props.newBean ?? defaultBean;
</script>

<template>
  <div class="item">
    <div class="header">
      <div class="type">
        <span class="type_name">{{ bean.type }}</span>
      </div>
      <div class="logo">
        <img class="img" :src="bean.logo" alt="" />
        <div class="name">{{ bean.name }}</div>
      </div>
      <div class="info">
        <div class="desc">{{ bean.description }}</div>
        <div class="tags" v-for="tag in bean.tags">
          <span class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/main.less";

.item {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
  font-size: 16px;
  transition:
    all 0.2s linear,
    border 0s;
  border: rgba(0, 0, 0, 0.1) solid 1px;
  width: 25%;

  &:hover {
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.5rem 1rem rgba(160, 152, 152, 0.2);
    background: #fff;
    border: none;

    .image {
      padding: 0.4em 0.4em 0;
      img {
        border-radius: 15px;
      }
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    .type {
      width: 100%;
      text-align: right;
      padding-top: 5px;
      padding-right: 5px;
      .type_name {
        width: fit-content;
        padding: 0.2em 0.4em;
        background-color: #e7f7f0;
        border-radius: 5px;
        color: #15975d;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .logo {
      display: flex;
      flex-direction: row;
      .img {
        width: 60px;
        height: 60px;
        margin-left: 20px;
        border-radius: 15px;
      }

      .name {
        max-width: 100%;
        overflow: hidden;
        transition: all ease-in-out 0.3s;
        color: #15975d;
        font-size: 20px;
        line-height: 32px;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 20px;
        font-weight: 800;
      }
    }
    .info {
      padding: 0 20px;
      margin-top: 10px;
      .desc {
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-size: 14px;
        color: #333;
      }
      .tags {
        display: inline-flex;
        .tag {
          margin-right: 10px;
          background-color: #ecf9f3;
          color: #15975d;
          font-size: 14px;
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
