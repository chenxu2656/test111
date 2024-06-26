<script>
export default {
  props: {
    list: Array
  },
  methods: {
    removeTask(id) {
      this.$emit('onRemoveTask', id)
    }
  }
}
</script>

<template>
  <section class="main">
    <ul class="todo-list">
      <li v-for="(item, index) in list" :key="item.id" class="todo">
        <div class="view">
          <span class="index">{{ index + 1 }}</span>
          <label>{{ item.name }}</label>
          <button @click="removeTask(item.id)" class="delete">删除</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
