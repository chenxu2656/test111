<script setup lang="ts">
// * 工具函数end
import { ref } from 'vue'

</script>

<template>
  <el-dialog
    :v-model="true"
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
</template>

<style lang="scss" scoped></style>
