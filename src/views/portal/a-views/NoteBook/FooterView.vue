<script>
// import Bus from "@/utils/EventBus";

export default {
  props: {
    list: Array
  },
  created() {
    /* Bus.$on('sendMsg',(msg) => {
        console.log('在FooterView中收到msg:'+msg)
    })*/
  },
  methods: {
    clear() {
      this.$emit('onClearTask')
    }
  }
}
</script>

<template>
  <div class="footer">
    <span>合计：{{ list.length }}</span>
    <button @click="clear">清空</button>
  </div>
</template>

<style scoped></style>
