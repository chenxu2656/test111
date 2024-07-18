<script setup lang="ts">
import { http } from "@/utils/http";
import { Plus } from "@element-plus/icons-vue";
import { PaginationProps, PureTable } from "@pureadmin/table";
import { ElMessage } from "element-plus";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import empty from "../organizationManage/components/empty.vue";
const searchField = ref("");
const limit = ref(10);
const router = useRouter();
const dataList = ref([]);
const addStaff = ref(false);
const showWarn = ref(false);
const showInvite = ref(false);
const phoneNumber = ref("");
const orgId = ref(localStorage.getItem("orgId"));
const pagination = ref<PaginationProps>({
  pageSize: 10,
  currentPage: 1,
  align: "right",
  total: 0,
  layout: "total, prev, pager, next, jumper",
  background: true,
  small: false,
});
const memberInfo = ref({} as any);
defineOptions({
  name: "403",
});

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
    organization_id: orgId.value,
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
const serachPatient = async () => {
  memberInfo.value = {};
  showInvite.value = false;
  try {
    const searchResp = await http.request<any>(
      "get",
      `/api/v1/user/phoneNumber/${phoneNumber.value}`,
      {},
    );
    console.log("searchResp", searchResp);
    memberInfo.value = searchResp;
    showInvite.value = true;
  } catch (error) {
    showWarn.value = true;
    console.error(error);
  }
};
onMounted(async () => {
  await getMemberList(1);
});
const invitePerson = () => {
  ElMessage.success("邀请成功，请通知用户在通知中心同意");
};
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
  <div v-if="orgId">
    <el-row :gutter="24" justify="space-around">
      <el-col :span="24">
        <el-card class="box-card my-5">
          <el-button type="primary" :icon="Plus" @click="addStaff = true"
            >添加成员</el-button
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
            <template #role="{ row }">
              {{ row.role === "1" ? "管理员" : "普通成员" }}
            </template>
          </PureTable>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="addStaff" title="添加成员" width="500">
      <div
        class="search"
        style="width: 90%; margin: auto; display: flex; justify-content: center"
      >
        <el-input
          v-model="phoneNumber"
          class="mr-5"
          placeholder="请输入手机号搜索"
        ></el-input>
        <el-button type="primary" @click="serachPatient">搜索</el-button>
      </div>
      <div class="tips w-full text-center mt-5" v-if="showWarn">
        用户未注册，请提醒用户注册
      </div>
      <div v-if="showInvite">
        <el-form label-width="auto" class="w-4/6 m-auto mt-10">
          <el-form-item label="姓名">
            <el-input v-model="memberInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="memberInfo.phoneNumber" disabled></el-input>
          </el-form-item>
        </el-form>
        <div class="w-4/6 m-auto flex">
          <el-button class="m-auto w-32" type="primary" @click="invitePerson"
            >邀请</el-button
          >
        </div>
      </div>
      <template #footer> </template>
    </el-dialog>
  </div>
  <empty v-else />
</template>
