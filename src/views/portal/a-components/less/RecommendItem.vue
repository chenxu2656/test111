<script setup lang="ts">
import router from "@/router";

import { useHomeStore } from "@/store/modules/home";
const homeStore = useHomeStore();
interface NewBean {
  id: string;
  product_category: string;
  product_type: string;
  product_image: string;
  product_images: string[];
  product_name: string;
  price: string;
  discount_price: string;
  product_description: string;
  product_spec: string;
  sku: string;
  validity_period: string;
  product_status: number;
  delivery_method: string;
  payment_method: string;
  sale_region: string;
  service_phone: string;
  ctime: string;
  mtime: string;
  creator_id: string;
  org_id: string;
  product_value: string;
  product_scene: string;
  tags: string[];
  exampleAvatar: string;
  exampleComment: string;
  exampleName: string;
}

const props = defineProps<{
  bean?: NewBean;
}>();

const bean = props.bean;

const goTo = (id: string) => {
  console.log(id);
  homeStore.setClickedService(id);
  router.push("/detail");
};
</script>

<template>
  <div class="item">
    <div class="header">
      <div class="type">
        <span class="type_name">{{ bean.product_type }}</span>
      </div>
      <div class="logo">
        <img class="img" :src="bean.product_image" alt="" />
        <div class="name">{{ bean.product_name }}</div>
      </div>
      <div class="info">
        <div class="desc">{{ bean.product_description }}</div>
        <div class="tags" v-for="tag in bean.tags">
          <span class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <div class="comment_box">
        <div class="avatar">
          <img class="img" :src="bean.exampleAvatar" alt="" />
          <div class="name">{{ bean.exampleName }}</div>
        </div>

        <div class="comment_con">{{ bean.exampleComment }}</div>
      </div>
    </div>
    <div class="price">
      <div class="price_box">
        <span class="discount_price">￥{{ bean.discount_price }}</span>
        <span class="old_price">￥{{ bean.price }}</span>
      </div>
      <div class="button">
        <el-button @click="goTo(bean.id)" type="primary">立即体验</el-button>
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
  width: 24%;
  margin: 15px 5px;

  &:hover {
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.5rem 1rem rgba(160, 152, 152, 0.2);
    background: #fff;
    border: none;
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
  .comment {
    width: 100%;
    height: 120px;
    margin-top: 10px;
    .comment_box {
      width: 95%;
      margin: 0 auto;
      background-color: #f7f8fa;
      border-radius: 10px;
      padding: 10px;
      .avatar {
        height: 30px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        .img {
          border-radius: 100px;
          width: 30px;
        }
        .name {
          width: 250px;
          padding-left: 10px;
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
      }

      .comment_con {
        padding-top: 10px;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 限制为两行 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal; /* 允许换行 */
        width: 100%; /* 根据需要调整宽度 */
        font-size: 14px;
        color: #333;
      }
    }
  }
  .price {
    border-top: 1px solid #d3d3d3;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .price_box {
      margin-left: 20px;
      width: 40%;
      display: flex;
      flex-direction: column;

      .discount_price {
        width: 100%;
        font-size: 24px;
        color: #15975d;
        font-weight: 800;
      }
      .old_price {
        width: 100%;
        font-size: 14px;
        color: #666;
        text-decoration: line-through;
        padding-left: 10px;
      }
    }
    .button {
      width: 45%;

      text-align: right;
      display: none;
      .el-button {
        background-color: #15975d;
        color: #fff;
      }
    }
  }
}
.item:hover {
  .button {
    display: block;
  }
}
</style>
