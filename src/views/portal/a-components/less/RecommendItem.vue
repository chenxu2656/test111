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
  logo: "@/assets/images/logo.png",
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
    <div class="image">
      <div class="header">{{ bean.type }}</div>
      <div class="body"><img :src="bean.logo" /></div>
    </div>
    <div class="content">
      <h1>{{ bean.name }}</h1>
      <p>{{ bean.type }}</p>
    </div>
    <div class="footer">
      <span class="item">
        <el-icon>
          <component theme="outline" :is="'icon-' + 'calendar'" />
        </el-icon>
        {{ bean.date }}
      </span>
      <span class="item">
        <el-icon>
          <component theme="outline" :is="'icon-' + 'avatar'" />
        </el-icon>
        {{ bean.author }}
      </span>
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

  .image {
    width: 100%;
    height: 200px;
    transition:
      all 0.2s linear,
      boder 0s;

    img {
      height: 100%;
      width: 100%;
      transition: all 0.2s linear;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
    padding: 1em 1em;

    h1 {
      font-size: 1.5em;
      line-height: 1.6em;
      text-transform: capitalize;
    }

    p {
      flex: 1;
      width: 100%;
      padding: 1rem 0;
      line-height: 1.1;
      color: #666;
      text-align: center;
      margin-bottom: 0;
    }

    .detail {
      display: inline-block;
      width: fit-content;

      font-size: 1em;
      padding: 0.3em 1.5em;
      border: @light-theme-color solid 1px;
      color: @light-font-color;

      &:hover {
        background: @light-theme-color;
        color: white;
      }
    }
  }

  .footer {
    padding: 0.8em 0.6em;
    font-size: 0.9em;
    height: 50px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    //background: #FFF;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;

    .item {
      text-transform: capitalize;
      color: #222;
      display: flex;
      place-items: center;
      place-content: center;

      i {
        height: 100%;
        display: flex;
        place-items: center;
        place-content: center;
        margin-right: 0.2em;
      }
    }
  }
}
</style>
