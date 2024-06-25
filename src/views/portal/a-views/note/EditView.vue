<script>
export default {
  name: 'EditView',
  data() {
    return {
      title: '大标题',
      editValue: '',
      isShowEdit: false
    }
  },
  methods: {
    edit() {
      //v-if=false的div不会被添加到html
      this.isShowEdit = true
      //由于vue为异步dom更新，元素还未被渲染完成, this.$refs.input为undefined，需借助$nextTick等待dom更新完成回调
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
      //不推荐使用延时执行
      setTimeout(() => {}, 1000)
    }
  }
}
</script>

<template>
  <div>
    <div v-if="isShowEdit">
      <input ref="input" v-model="editValue" type="text" />
      <button>确认</button>
    </div>
    <div v-else>
      <span>{{ title }}</span>
      <button @click="edit">编辑</button>
    </div>
  </div>
</template>

<style scoped></style>
