<script setup>
import More from "@/assets/svg/more.svg?component";
import { Mic, CaretRight } from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
import Divider from "@/views/portal/a-components/less/Divider.vue";
import { useHomeStore } from "@/store/modules/home";

import { useRouter } from "vue-router";
const router = useRouter();
const homeStore = useHomeStore();
</script>
<template>
  <el-container class="home-page">
    <el-aside width="300px" class="menu-container">
      <div class="left">
        <div class="left_top">
          <span class="name">分类</span>
          <span
            class="link"
            @click="
              () => {
                homeStore.setclickedTag('');
                router.push('/search');
              }
            "
          >
            <el-icon><More /></el-icon
            ><span style="padding: 0 3px">所有商品</span
            ><el-icon><CaretRight /></el-icon
          ></span>
        </div>
        <div class="left_con">
          <div class="list">
            <el-icon :size="18"><Mic /></el-icon>
            <div class="list_item">
              <RouterLink
                class="link"
                to="/search"
                @click="homeStore.setclickedTag('质量管理')"
                >质量管理</RouterLink
              >
              <Divider />
              <RouterLink class="link" to="/">质量管理</RouterLink>
              <Divider />
              <RouterLink class="link" to="/">质量管理</RouterLink>
            </div>
          </div>

          <div class="list">
            <el-icon :size="18"><Mic /></el-icon>
            <div style="margin-left: 10px; font-size: 14px">
              <RouterLink
                class="link"
                to="/search"
                @click="homeStore.setclickedTag('')"
                >质量管理</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </el-aside>

    <el-main>
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <img
            src="https://picsum.photos/seed/picsum/1000/300?random=2"
            alt=""
            srcset=""
          />
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
  padding: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #fff;
  color: #333;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

  .menu-container {
    background-color: #fff;
    border-right: 1px solid #ebebeb;

    .left {
      width: 94%;
      height: 100%;
      margin: 0 auto;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 20px;

      .left_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-weight: 600;
        }
        .link {
          color: #01b862;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
      .left_con {
        .list {
          display: flex;
          width: 96%;
          flex-direction: row;
          align-items: center;
          margin: 5px auto;

          .list_item {
            width: 100%;
            font-size: 14px;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: space-around;
            flex-direction: row;

            .link:hover {
              background-color: #fff;
              color: #01b862;
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
