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
      notification_type: 0,
    },
  });
  console.log("resp", resp);
  dataList.value = resp.data;
  loading.value = false;
});
const read = async (id: string) => {
  await http.request("put", `/api/v1/notifications/${id}?status=1`);
  dataList.value = dataList.value.map((item) => {
    if (item.id === id) {
      item.status = true;
    }
    return item;
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
          <div class="text-base mt-5">{{ item.notification_content }}</div>
        </div>

        <el-button
          plain
          type="danger"
          v-if="!item.status"
          @click="read(item.id)"
          >标为已读</el-button
        >
      </div>
    </el-card>
  </div>
</template>
