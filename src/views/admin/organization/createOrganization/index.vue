<script lang="ts" setup>
import { ref } from "vue";
import create from "./components/create.vue";
import search from "./components/search.vue";
const activeStep = ref(1);
const switchStep = (value) => {
  activeStep.value = value;
};
</script>
<template>
  <div class="w-full">
    <el-steps
      style="max-width: 600px"
      :active="activeStep"
      align-center
      class="m-auto"
    >
      <el-step title="搜索组织" description="Some description"> </el-step>
      <el-step title="创建组织" description="Some description" />
    </el-steps>
    <div class="content m-auto my-10" style="width: 80%">
      <search v-if="activeStep === 1" @switchStep="switchStep" />
      <create v-if="activeStep === 2" />
    </div>
  </div>
</template>
