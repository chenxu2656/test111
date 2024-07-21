<script setup lang="ts">
import Header from "@/views/portal/a-components/less/Header.vue";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
interface NewBean {
  logo: string;
  name: string;
  type: string;
  scope: string;
  description: string;
  tags: string[];
  exampleAvatar: string;
  exampleName: string;
  exampleComment: string;
  discountPrice: string;
  price: string;
  functionality_version: string[];
  quantity_specifications: string[];
  validity_period: string[];
  deployment_methods: string;
  saleable_range: string;
  telephone: string;
  merchant_message: string;
}
const props = defineProps<{
  newBean?: NewBean;
}>();

const defaultBean: NewBean = {
  logo: "./src/assets/img/1.png",
  name: "海报设计师",
  type: "AI 大模型",
  description: "无情的AI作图机器，画质超乎你的想象",
  tags: ["运营设计", "自动作图", "批量作图"],
  exampleAvatar: "./src/assets/img/people.jpg",
  exampleName: "食品加工企业市场不经理",
  exampleComment: "不要学设计软件，不要学设计软件不要学设计软件不要学设计软件",
  discountPrice: "1.99",
  price: "29.9",
  scope: "适用个人",
  functionality_version: ["运营设计", "自动作图", "批量作图"],
  quantity_specifications: ["运营设计", "自动作图", "批量作图"],
  validity_period: ["运营设计", "自动作图", "批量作图"],
  deployment_methods: "",
  saleable_range: "",
  telephone: "",
  merchant_message: "支持定制，更多需求，欢迎咨询！",
};

const bean = props.newBean ?? defaultBean;
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header />
  <div class="index">
    <div class="content">
      <div class="pic_box">
        <img :src="bean.logo" class="img" />
      </div>
      <div class="introduce">
        <div class="title_box">
          <div class="name">{{ bean.name }}</div>
          <div class="scope">{{ bean.scope }}</div>
        </div>
        <div class="price_box">
          <span class="discount_price">￥{{ bean.discountPrice }}</span>
          <span class="old_price">原价￥{{ bean.price }}</span>
        </div>
        <div class="server_desc">
          {{ bean.description }}
        </div>
        <div class="functionality_version">
          <div class="label">功能版本：</div>
          <div class="options">
            <div
              class="option"
              v-for="(item, index) in bean.functionality_version"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="quantity_specifications">
          <div class="label">功能版本：</div>
          <div class="options">
            <div
              class="option"
              v-for="(item, index) in bean.quantity_specifications"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="validity_period">
          <div class="label">功能版本：</div>
          <div class="options">
            <div
              class="option"
              v-for="(item, index) in bean.validity_period"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="deployment_methods">
          <div class="label">部署方式：</div>
          <div class="options">SaaS服务</div>
        </div>
        <div class="saleable_range">
          <div class="label">可售范围：</div>
          <div class="options">全国</div>
        </div>
        <div class="telephone">
          <div class="label">服务咨询电话：</div>
          <div class="options">15256986032</div>
        </div>
        <div class="description">
          <div class="label">说明：</div>
          <div class="options">支持定制，更多需求，欢迎咨询！</div>
        </div>
        <div class="button_box">
          <el-button class="buy">立即购买</el-button>
          <el-button class="test">免费体验</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="details">
    <div class="content">
      <div class="title">商品介绍</div>
      <div>{{}}</div>
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
          background-color: #ecf9f3;
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
}
</style>
