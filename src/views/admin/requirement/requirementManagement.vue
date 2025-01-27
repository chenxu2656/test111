<script setup lang="ts">
import { getAddressByCode } from "@/utils/address";
import { http } from "@/utils/http";
import { Delete, Plus } from "@element-plus/icons-vue";
import { PaginationProps, PureTable } from "@pureadmin/table";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const searchField = ref("");
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
    label: "需求名称",
    prop: "name",
    align: "center",
  },
  {
    label: "需求类型",
    prop: "category",
    align: "center",
  },
  {
    label: "需求区域",
    slot: "region",
    align: "center",
  },
  {
    label: "需求时间范围",
    slot: "duration",
    align: "center",
  },
  {
    label: "需求内容",
    slot: "content",
    align: "center",
  },

  {
    label: "操作",
    slot: "action",
    align: "center",
  },
];
const getRequirementList = async (pageNumber: number) => {
  const params = {
    skip: (pageNumber - 1) * limit.value,
    limit: limit.value,
    uid: JSON.parse(localStorage.getItem("userInfo")).id,
  };
  if (searchField.value && searchField.value.length >= 3) {
    params.keyword = searchField.value;
  }
  const resp = await http.request<any>("get", "/api/v1/requirements/list", {
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
  <div>
    <el-row :gutter="24" justify="space-around">
      <el-col :span="24">
        <el-card class="box-card">
          <el-form class="flex gap-5">
            <el-form-item label="需求名称" class="flex-grow">
              <el-input
                label="需求名称"
                placeholder="请输入需求名称,最少需要三个字符"
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
          <el-button type="primary" :icon="Plus" @click="createRequirement"
            >发布需求</el-button
          >
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
            <template #region="{ row }">
              {{ getAddressByCode(row.region) }}
            </template>
            <template #duration="{ row }">
              {{ row.start_date }} - {{ row.end_date }}
            </template>
            <template #content="{ row }">
              {{ row.content }}
            </template>
            <template #action="{ row }">
              <div class="actions flex gap-5 justify-center">
                <el-icon color="red"><Delete /></el-icon>
                <el-icon color="#409eff"><Edit /></el-icon>
              </div>
            </template>
          </PureTable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
