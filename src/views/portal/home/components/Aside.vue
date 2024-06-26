<script setup>
import { Mic } from "@element-plus/icons-vue";
</script>
<template>
  <el-container class="home-page">
    <el-aside width="300px" class="menu-container">
      <div class="left">
        <div class="left_top">
          <span class="name">分类</span>
          <span class="link">所有商品</span>
        </div>
        <div class="left_con">
          <div class="list">
            <el-icon><Mic /></el-icon>
            <div class="list_item">
              <span>质量管理</span>
              <span>质量管理</span>
              <span>质量管理</span>
            </div>
          </div>
        </div>
      </div>
    </el-aside>

    <el-main>
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: "1",
    };
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #f9f9f9;
  color: #333;

  .menu-container {
    background-color: #f9f9f9;
    border-right: 1px solid #ebebeb;
    padding: 20px 0;

    .left {
      width: 94%;
      margin: 0 auto;
      .left_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .left_con {
        .list {
          display: flex;
          width: 96%;

          .list_item {
            width: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: space-around;
            flex-direction: row;
            .span {
              margin: 20px auto;
            }
          }
        }
      }
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
