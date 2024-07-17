<script setup lang="ts">
import { http } from "@/utils/http";
import { Plus } from "@element-plus/icons-vue";
import { PaginationProps, PureTable } from "@pureadmin/table";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const searchField = ref("");
const limit = ref(10);
const router = useRouter();
const dataList = ref([]);
const addStaff = ref(false)
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
const createMember = () => {
  router.push("/Member/createMember");
};
const columns = [
  {
    label: "姓名",
    prop: "name",
    align: "center",
  },
  {
    label: "手机号",
    prop: "contact_phone",
    align: "center",
  },

  {
    label: "角色",
    slot: "role",
    align: "center",
  },

  {
    label: "操作",
    slot: "action",
    align: "center",
  },
];
const getMemberList = async (pageNumber: number) => {
  const params = {
    skip: (pageNumber - 1) * limit.value,
    limit: limit.value,
    organization_id: localStorage.getItem("orgId"),
  };
  const resp = await http.request<any>("get", "/api/v1/organizationMembers", {
    params: {
      ...params,
    },
  });
  console.log("resp", resp);
  pagination.value.total = resp.length;
  dataList.value = resp.data;
};
const onCurrentChange = async () => {
  await getMemberList(pagination.value.currentPage);
};
onMounted(async () => {
  await getMemberList(1);
});
watch(
  () => searchField.value,
  async () => {
    if (searchField.value.length === 0) {
      await getMemberList(1);
    }
  },
);
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <el-col :span="24">
        <el-card class="box-card my-5">
          <el-button type="primary" :icon="Plus" @click="addStaff = true">添加成员</el-button>
          <PureTable adaptive stripe row-key="id" alignWhole="center" showOverflowTooltip :data="dataList"
            @page-current-change="onCurrentChange" :columns="columns" :pagination="pagination" style="height: 500px">
            <template #role="{ row }">
              {{ row.role === '1' ? '管理员' : '普通成员' }}
            </template>

          </PureTable>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
    :v-model="addStaff"
    title="Create Category"
    width="500"

  >
    <el-input
      v-model="categoryName"
      autocomplete="off"
      placeholder="Please enter the name of category"
    />
    <template #footer>

    </template>
  </el-dialog>
  </div>
</template>
