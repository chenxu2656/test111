<script setup lang="ts">
import Header from "@/views/portal/a-components/less/Header.vue";
import CommonFooter from "@/views/portal/a-views/CommonFooter.vue";
import { ref } from "vue";
import { getAddressByCode } from "@/utils/address.ts";
import { http } from "@/utils/http";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import router from "@/router";
const route = useRoute();
const productId = ref("");
const prodInfo = ref();
const viewOrder = () => {
  router.push("/digtalServiceservice/buyorder");
};
const orderInfo = ref({
  customer_id:
    localStorage.getItem("userInfo")?.id ||
    "ddc42355-d9ca-4a75-ae2b-5ea4ba344b73",
  total_amount: 1,
  single_price: 0,
  num: 1,
  addressId: "",
  status: 0,
  product: "",
  productName: "",
  org_id: "",
});
const currentRow = ref();
const loading = ref(true);
const success = ref(false);
const fail = ref(false);

const checkorderStatus = async (trade_no: string) => {
  const resp = await http.request<any>(
    "get",
    `/api/v1/orders/paystatus/${trade_no}`,
  );
  prodInfo.value = resp;
  console.log("商品详情", resp);
  if (resp.msg === "Success") {
    success.value = true;
    loading.value = false;
    fail.value = false;
  }
};
onMounted(() => {
  const trade_no = route.query.trade_no;
  checkorderStatus(trade_no);
});
</script>

<template>
  <el-backtop :right="10" :bottom="10" />
  <Header :onlyShowOriginalNav="false" />
  <div class="container" style="height: 60vh">
    <!-- <el-card style="margin-top: 20px">
      <div class="header flex" style="align-items: center">
        <div style="width: 4px; height: 20px; background-color: #13ae68"></div>
        <div class="tit ml-2" style="font-size: 15px; font-weight: 500">
          订单详情
        </div>
      </div>
      <el-descriptions
        direction="vertical"
        :column="6"
        :size="size"
        border
        class="my-5"
      >
        <el-descriptions-item label="应用名称">{{
          orderInfo.productName
        }}</el-descriptions-item>
        <el-descriptions-item label="数量">{{
          orderInfo.num
        }}</el-descriptions-item>
        <el-descriptions-item label="单价">{{
          orderInfo.single_price
        }}</el-descriptions-item>
        <el-descriptions-item label="总价">{{
          orderInfo.total_amount
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card> -->
    <div
      v-if="loading"
      style="
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <img
        src="@/assets/images/loading.gif"
        alt=""
        class="src"
        style="width: 100px"
      />
      <div class="text" style="font-size: 20px; margin-top: 40px">
        正在查询支付状态...
      </div>
    </div>
    <div
      v-if="fail"
      style="
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <img
        src="@/assets/images/fail.png"
        alt=""
        class="src"
        style="width: 100px"
      />
      <div class="text" style="font-size: 20px; margin-top: 40px">支付失败</div>
    </div>
    <div
      v-if="success"
      style="
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
      <img
        src="@/assets/images/successful.png"
        alt=""
        class="src"
        style="width: 100px"
      />
      <div class="text" style="font-size: 20px; margin-top: 40px">支付成功</div>
      <el-button type="primary" style="margin-top: 20px" @click="viewOrder"
        >查看订单
      </el-button>
    </div>
  </div>
  <CommonFooter id="declare-offset" />
</template>

<style lang="less" scoped>
@import "@/assets/main.less";
.container {
  margin-top: @headerHeight+80px !important;
  width: 80%;
  max-width: 1380px;
  margin: auto;
}
</style>
