<script setup lang="ts">
import Header from "@/views/portal/a-components/less/Header.vue";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import { onMounted, ref } from "vue";
import { getServerDetail } from "./api";
import { useHomeStore } from "@/store/modules/home";
import router from "@/router";
const homeStore = useHomeStore();

const server_info = ref(null);

onMounted(async () => {
  const resp = await getServerDetail(homeStore.clickedService);

  server_info.value = resp;
  console.log(server_info.value);
});
const buynow = () => {
  router.push(`/orderconfirm?productid=${server_info.value.id}`);
};
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="false" />
  <div class="index" v-if="server_info">
    <div class="content">
      <div class="pic_box">
        <img :src="server_info.product_image" class="img" />
      </div>
      <div class="introduce">
        <div class="title_box">
          <div class="name">{{ server_info.product_name }}</div>
          <div class="scope">{{ server_info.product_type }}</div>
        </div>
        <div class="price_box">
          <span class="discount_price">￥{{ server_info.discount_price }}</span>
          <span class="old_price">原价￥{{ server_info.price }}</span>
        </div>
        <div class="server_desc">
          {{ server_info.product_description }}
        </div>
        <div class="functionality_version">
          <div class="label">功能版本：</div>
          <div class="options">
            <!-- <div
              class="option"
              v-for="(item, index) in server_info.product_images"
              :key="index"
            >
              {{ item }}
            </div> -->
            <div class="option">
              {{ server_info.product_category }}
            </div>
          </div>
        </div>
        <div class="quantity_specifications">
          <div class="label">数量规格：</div>
          <div class="options">
            <!-- <div
              class="option"
              v-for="(item, index) in server_info.product_images"
              :key="index"
            >
              {{ item }}
            </div> -->
            <div class="option">
              {{ server_info.product_status }}
            </div>
          </div>
        </div>
        <div class="validity_period">
          <div class="label">有效期限：</div>
          <div class="options">
            <!-- <div
              class="option"
              v-for="(item, index) in server_info.product_images"
              :key="index"
            >
              {{ item }}
            </div> -->
            <div class="option">
              {{ server_info.validity_period }}
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="deployment_methods">
          <div class="label">部署方式：</div>
          <div class="options">{{ server_info.delivery_method }}</div>
        </div>
        <div class="saleable_range">
          <div class="label">可售范围：</div>
          <div class="options">{{ server_info.sale_region }}</div>
        </div>
        <div class="telephone">
          <div class="label">服务咨询电话：</div>
          <div class="options">{{ server_info.service_phone }}</div>
        </div>
        <div class="description">
          <div class="label">说明：</div>
          <div class="options">支持定制，更多需求，欢迎咨询！</div>
        </div>
        <div class="button_box">
          <el-button class="buy" @click="buynow">立即购买</el-button>
          <el-button class="test">免费体验</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="details" v-if="server_info">
    <div class="content">
      <div class="title">商品介绍</div>
      <div v-html="server_info.product_scene"></div>
    </div>
  </div>
  <CommonFooter id="declare-offset" />
</template>

<style lang="less" scoped>
@import "@/assets/main.less";
.index {
  margin: (@headerHeight+80px) 0 0 0 !important;
  width: 100%;
  min-height: 396px;
  display: flex;
  flex-direction: column;
  .content {
    .m-reactive-box;
    color: @dark-font-color;
    display: flex;
    height: 100%;
    .pic_box {
      height: 336px;
      object-fit: cover;
      width: auto;

      .img {
        width: 336px; /* 设定宽度 */
        height: auto; /* 自动调整高度 */
      }
    }
    .introduce {
      width: calc(100% - 20px);
      height: 100%;
      color: #333;
      padding-left: 20px;
      .title_box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        flex-direction: row;
        .name {
          font-size: 28px;
          font-weight: 800;
        }
        .scope {
          width: fit-content;
          padding: 5px 8px;
          margin-left: 20px;
          color: #13ae68;
          background-color: #ffffff;
          border-radius: 10px;
        }
      }

      .price_box {
        width: 40%;
        display: flex;
        flex-direction: column;

        .discount_price {
          width: 100%;
          font-size: 24px;
          color: #ff8d19;
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

      .server_desc {
        color: rgb(86 93 102);
        padding: 5px 0;
      }
      .functionality_version,
      .quantity_specifications,
      .validity_period {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        margin-bottom: 10px;

        .label {
          color: rgb(86 93 102);
          font-size: 14px;
          line-height: 30px;
          height: 30px;
        }
        .options {
          display: flex;
          flex-direction: row;
          .option {
            color: #13ae68;
            border: 1px solid #13ae68;
            border-radius: 5px;
            margin-right: 10px;
            font-weight: 600;
            padding: 5px 10px;
            background-color: #ecf9f3;
          }
        }
      }
      .divider {
        margin: 20px 0;
        width: 100%;
        border-bottom: rgb(230 232 235) 1px solid;
      }
      .deployment_methods,
      .saleable_range,
      .telephone,
      .description {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        .label {
          color: rgb(86 93 102);
          font-size: 14px;
          line-height: 30px;
          height: 30px;
          width: fit-content;
        }
        .options {
          font-size: 16px;
          color: #333;
          width: fit-content;
        }
      }
      .button_box {
        display: flex;
        justify-content: flex-start;
        margin: 20px 0;
        .buy {
          background-color: #13ae68;
          color: #fff;
        }
        .test {
          border: #13ae68 1px solid;
          color: #13ae68;
        }
        .el-button {
          height: 40px;
        }
      }
    }
  }
}
.details {
  .m-reactive-box;
  .content {
    .title {
      border-left: #13ae68 4px solid;
      padding-left: 20px;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
