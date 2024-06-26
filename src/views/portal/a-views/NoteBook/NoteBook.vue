<script>
import Header from './HeaderView.vue'
import Main from './MainView.vue'
import Footer from './FooterView.vue'
export default {
  data() {
    return {
      list: JSON.parse(localStorage.getItem('list')) || [
        { id: 1, name: '打篮球' },
        { id: 2, name: '打篮球' },
        { id: 3, name: '打篮球' }
      ],
      data1: '数据1',
      inputValue: 'abc'
    }
  },
  watch: {
    list: {
      deep: true,
      handler(newValue) {
        console.log(newValue.join('!!'))
        localStorage.setItem('list', JSON.stringify(newValue))
      }
    }
  },
  components: {
    Header,
    Main,
    Footer
  },
  methods: {
    addTask(taskName) {
      this.list.unshift({ id: +new Date(), name: taskName })
    },
    removeTask(id) {
      this.list = this.list.filter(item => item.id !== id)
    },
    clearTask() {
      this.list = []
    }
  }
}
</script>

<template>
  <div class="nb">
    <Header @onAddTask="addTask" />
    <Main :list="list" @onRemoveTask="removeTask"></Main>
    <Footer :list="list" @onClearTask="clearTask"></Footer>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/main.less';

.nb {
  padding-top: @headerHeight;
}
</style>
