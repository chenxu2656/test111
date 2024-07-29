<script setup lang="ts">
import { getAddressByCode } from "@/utils/address";
import { http } from "@/utils/http";
import { Delete, Plus } from "@element-plus/icons-vue";
import { PaginationProps, PureTable } from "@pureadmin/table";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const searchField = ref("");
const orgId = ref(localStorage.getItem("orgId"));
const limit = ref(10);
const router = useRouter();
const dataList = ref([]);
const pagination = ref<PaginationProps>({
  pageSize: 10,
  currentPage: 1,
  align: "right",
  total: 0,
  layout: "total, prev, pager, next, jumper",
  background: true,
  small: false,
});
defineOptions({
  name: "403",
});
const createRequirement = () => {
  router.push("/requirement/createrequirement");
};
const columns = [
  {
    label: "订单号",
    prop: "id",
    align: "center",
  },
  {
    label: "订单时间",
    slot: "orderTime",
    align: "center",
  },
  {
    label: "商品名",
    prop: "productName",
    align: "center",
  },
  {
    label: "订单状态",
    slot: "status",
    align: "center",
  },
  {
    label: "客户信息",
    slot: "content",
    align: "center",
  },

  // {
  //   label: "操作",
  //   slot: "action",
  //   align: "center",
  // },
];
const getOrderStatus = (status) => {
  const statusMap = {
    0: "未支付", // Initial state
    1: "已支付", // Payment made
    2: "已取消", // Order canceled
    3: "已退款", // Refund issued
    4: "已收货", // Order received by customer
    6: "已完成", // Order completed
    7: "订单失败", // Order failed
  };
  // Return the corresponding status description or 'Unknown' if not found
  return statusMap[status] || "Unknown";
};
const getRequirementList = async (pageNumber: number) => {
  const params = {
    skip: (pageNumber - 1) * limit.value,
    limit: limit.value,
    customer_id: JSON.parse(localStorage.getItem("userInfo")).id,
  };
  if (searchField.value && searchField.value.length >= 3) {
    params.keyword = searchField.value;
  }
  const resp = await http.request<any>("get", "/api/v1/orders", {
    params: {
      ...params,
    },
  });
  console.log("resp", resp);
  pagination.value.total = resp.length;
  dataList.value = resp.data;
};
const onCurrentChange = async () => {
  await getRequirementList(pagination.value.currentPage);
};
onMounted(async () => {
  await getRequirementList(1);
});
watch(
  () => searchField.value,
  async () => {
    if (searchField.value.length === 0) {
      await getRequirementList(1);
    }
  },
);
</script>

<template>
  <div v-if="orgId">
    <el-row :gutter="24" justify="space-around">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form class="flex gap-5">
            <el-form-item label="查询订单" class="flex-grow">
              <el-input
                label="查询订单"
                placeholder="订单名称,最少需要三个字符"
                clearable
                v-model="searchField"
              ></el-input>
            </el-form-item>
            <el-button
              type="primary"
              :disabled="searchField.length < 3"
              @click="getRequirementList(1)"
              >查询</el-button
            >
          </el-form>
        </el-card>
        <el-card class="box-card my-5">
          <PureTable
            adaptive
            stripe
            row-key="id"
            alignWhole="center"
            showOverflowTooltip
            :data="dataList"
            @page-current-change="onCurrentChange"
            :columns="columns"
            :pagination="pagination"
            style="height: 500px"
          >
            <template #orderTime="{ row }">
              {{ new Date(row.ctime) }}
            </template>

            <template #status="{ row }">
              {{ getOrderStatus(row.status) }}
            </template>
            <template #content="{ row }">
              <span class="text-sky-600 underline">View</span>
            </template>
            <!-- <template #action="{ row }">
              <div class="actions flex gap-5 justify-center">
                <el-icon color="red"><Delete /></el-icon>
                <el-icon color="#409eff"><Edit /></el-icon>
              </div>
            </template> -->
          </PureTable>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <noOrganization v-else />
</template>
