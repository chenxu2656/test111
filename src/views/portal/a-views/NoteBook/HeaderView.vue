<script>
// import Bus from "@/utils/EventBus";

export default {
  data() {
    return {
      //v-model数据双向绑定，可实时获取表单数据
      taskName: ''
    }
  },
  methods: {
    addTask() {
      //触发改组件可被外部监听的onAddTask事件
      this.$emit('onAddTask', this.taskName)
    },
    sendMsg() {
      // Bus.$emit('sendMsg','hello from Header')
    }
  }
}
</script>

<template>
  <div>
    <input v-model="taskName" placeholder="请输入" @keyup.enter="addTask" />
    <button @click="addTask">添加任务</button>
    <button @click="sendMsg">发送消息</button>
  </div>
</template>

<style scoped></style>
