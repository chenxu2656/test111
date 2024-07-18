<script setup lang="ts">
import emptyView from "./components/empty.vue";
import { onMounted, ref } from "vue";
import organizationInfo from "./components/organizationInfo.vue";
import { http } from "@/utils/http";
const userId = JSON.parse(localStorage.getItem("userInfo")).id;
const org_id = ref(null);
const loading = ref(true);
const orgInfo = ref({});
onMounted(async () => {
  try {
    const org_resp = await http.request<any>(
      "get",
      `/api/v1/organizationMembers/user/${userId}`,
    );

    loading.value = false;
    org_id.value = org_resp.id;
    localStorage.setItem("orgId", org_id.value);
    orgInfo.value = org_resp;
    console.log("org_resp", org_resp);
  } catch (error) {
    loading.value = false;
    org_id.value = null;
    console.log(error);
  }
});
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around" v-if="loading"></el-row>
    <el-row :gutter="24" justify="space-around" v-else>
      <organizationInfo v-if="org_id" :orgInfo="orgInfo" />
      <emptyView v-else />
    </el-row>
  </div>
</template>
