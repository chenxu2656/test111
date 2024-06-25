<script>
export default {
  setup() {
    const count = ref(0)
    function increment() {
      count.value++
    }
    //setup中数据，方法需return暴露，才能在template中使用，
    // 语法糖<script setup>可简化
    return {
      count,
      increment
    }
  }
}
</script>

<template></template>

<style scoped lang="less"></style>
