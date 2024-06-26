<script setup>
import { defineModel } from 'vue'

const props = defineProps({
  sequence: {
    type: String
  }
})
//vue3.3新特性，defineModel简化了v-model的组件内部操作过程
//还需要配置vite.config.js才能生效
//且配置后需要重启proj
//[@vue/compiler-sfc] This project is using defineModel(), which is an experimental feature. It may receive breaking changes or be removed in the future, so use at your own risk.
//To stay updated, follow the RFC at https://github.com/vuejs/rfcs/discussions/503.

let selectValue = defineModel()
function handleChange(e) {
  console.log('handleChange')
  selectValue.value = e.target.value
}
</script>

<template>
  <div>
    <label>{{ sequence }}</label>
    <select :value="selectValue" @change="handleChange">
      <option value="101">上海</option>
      <option value="102">广东</option>
      <option value="103">深圳</option>
      <option value="104">四川</option>
      <option value="105">北京</option>
      <option value="106">湖南</option>
    </select>
  </div>
</template>

<style scoped></style>
