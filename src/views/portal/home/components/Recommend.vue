<script setup lang="ts">
import Recommenditem from "@/views/portal/a-components/less/RecommendItem.vue";
</script>

<template>
  <div class="recommed">
    <div class="title_box">
      <div class="left">
        <div class="title">MAAS新应用，玩转AI新技术</div>
        <div class="subTitle">能交给AI工具的，就别自己埋头苦干！</div>
      </div>
      <div class="more">
        <div class="moreBtn">点击查看更多</div>
      </div>
    </div>
    <div class="item_box">
      <Recommenditem />
      <Recommenditem />
      <Recommenditem />
      <Recommenditem />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommed {
  width: 1425px;
  .title_box {
    width: 100%;
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
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
