<script setup lang="ts">
import { http } from "@/utils/http";
import { onMounted, ref } from "vue";
const loading = ref(true);
const dataList = ref([]);
onMounted(async () => {
  const resp = await http.request<any>("get", "/api/v1/notifications", {
    params: {
      skip: 0,
      limit: 10,
      uid: JSON.parse(localStorage.getItem("userInfo")).id,
      notification_type: 2,
    },
  });
  console.log("resp", resp);
  dataList.value = resp.data;
  loading.value = false;
});
const read = async (item: object) => {
  const notificationId = item.id;
  const orgId = JSON.parse(item.notification_content.replace(/'/g, '"')).orgid;
  await http.request("put", `/api/v1/notifications/${item.id}?status=1`);
  // inviter member
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  await http.request<any>("post", "/api/v1/organizationMembers", {
    data: {
      name: userInfo.username,
      contact_phone: userInfo.phoneNumber,
      role: "0", // 1 管理员， 0 普通成员
      organization_id: orgId,
      user_id: userInfo.id,
    },
  });
  dataList.value = dataList.value.map((items) => {
    if (items.id === notificationId) {
      items.status = true;
    }
    return items;
  });
};
</script>

<template>
  <div v-if="loading"></div>
  <div v-else>
    <el-card
      v-for="item in dataList"
      :key="item.id"
      :style="{
        width: '100%',
        borderColor: item.status ? '#cccccc' : '#e9b5b5',
      }"
      class="mt-5"
    >
      <div
        class="content mt-5 flex justify-between w-full"
        style="align-items: end"
      >
        <div class="body">
          <div class="text-xl">{{ item.notification_title }}</div>
          <div class="text-base mt-5">
            <span style="color: #669dfc; margin-right: 10px">{{
              JSON.parse(item.notification_content.replace(/'/g, '"')).inviter
            }}</span
            >邀请您加入<span style="color: #669dfc; margin-left: 10px">{{
              JSON.parse(item.notification_content.replace(/'/g, '"')).name
            }}</span>
          </div>
        </div>

        <el-button plain type="danger" v-if="!item.status" @click="read(item)"
          >接受邀请</el-button
        >
        <el-button plain v-else disabled>已接受邀请</el-button>
      </div>
    </el-card>
  </div>
</template>
