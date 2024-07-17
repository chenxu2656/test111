<template>
  <el-card class="">
    <div class="search flex justify-center w-full gap-8">
      <el-input
        placeholder="请输入完整的公司名或者社会信用代码"
        style="width: 60%"
        v-model="keyWord"
      ></el-input>
      <el-button type="primary" style="width: 100px" @click="searchCompany"
        >搜索</el-button
      >
    </div>
    <div v-if="showWarn" class="m-auto w-full text-center mt-5">
      未查询到企业信息， 请输入企业全称或者完整的社会信用代码
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { data } from "./test";
const showWarn = ref(false);
const keyWord = ref("");
const emit = defineEmits(["switchStep"]);
const searchCompany = async () => {
  showWarn.value = false;
  // const resp = await http.request<any>("get", "/api/v1/third/company/verify", {
  //   params: {
  //     keyWord: keyWord,
  //   },
  // });
  const resp = data;
  if (resp.code === 200) {
    localStorage.setItem("companyInfo", JSON.stringify(resp));
    emit("switchStep", 2);
  } else if (resp.code === 701) {
    showWarn.value = true;
  }
};
</script>

<style lang="scss"></style>
