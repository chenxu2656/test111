<script setup>
import { Mic } from '@element-plus/icons-vue'
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
      <div class="banner">
        <div class="banner-content">
          <h2>2024年安徽省</h2>
          <h1>重点工业互联网平台申报</h1>
          <p>PROVINCIAL KEY INDUSTRIAL INTERNET PLATFORM APPLICATION</p>
          <el-button type="primary">了解详情</el-button>
        </div>
        <img
          src="@/assets/img/banner.jpg"
          alt="Banner Image"
          class="banner-image"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '1'
    }
  }
}
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

  .banner {
    background-color: #e6f7ff;
    border-radius: 8px;
    margin: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .banner-content {
      h1 {
        font-size: 32px;
        margin: 0 0 10px;
        font-weight: bold;
      }
      h2 {
        font-size: 24px;
        margin: 0 0 10px;
      }
      p {
        font-size: 14px;
        color: #999;
        margin: 0 0 20px;
      }
      .el-button {
        background-color: #00aaff;
        border-color: #00aaff;
      }
    }

    .banner-image {
      width: 200px;
      height: auto;
    }
  }
}
</style>
