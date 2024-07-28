<script setup lang="ts">
import { useHomeStore } from "@/store/modules/home";
const homeStore = useHomeStore();
import { useRouter } from "vue-router";
const router = useRouter();
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
  data?: NewBean;
}>();

const bean = props.data;

const goTo = (id: string) => {
  console.log(id);
  homeStore.setClickedService(id);
  router.push("/detail");
};
</script>

<template>
  <div class="item">
    <div class="header">
      <div class="logo">
        <img class="img" :src="bean.product_image" alt="" />
        <div class="name">{{ bean.product_name }}</div>
      </div>
      <div class="info">
        <div class="tags" v-for="tag in bean.tags">
          <span class="tag">{{ tag }}</span>
        </div>
        <div class="desc">{{ bean.product_description }}</div>
      </div>
    </div>

    <div class="price">
      <div class="price_box">
        <span class="discount_price">￥{{ bean.discount_price }}</span>
        <span class="old_price">￥{{ bean.price }}</span>
      </div>
      <div class="button">
        <el-button type="primary" @click="goTo(bean?.id as string)"
          >立即体验</el-button
        >
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
  margin: 20px 5px 0px 5px;
  background-color: #fff;

  &:hover {
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.5rem 1rem rgba(160, 152, 152, 0.2);
    background: #fff;
    border: none;
  }

  .header {
    display: flex;
    flex-direction: column;

    .logo {
      display: flex;
      flex-direction: column;
      padding-top: 15px;
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
        margin-top: 15px;
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
        margin-bottom: 15px;
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
