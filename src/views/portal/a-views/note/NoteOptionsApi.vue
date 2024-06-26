<script>
import CommonHeader from '@/views/portal/a-components/less/Header.vue'
import loginConfirm from '@/mixins/loginConfirm.js'
export default {
  name: 'NoteOptionsApi',
  /*改写法没有类型校验*/
  // props:['id','name'],
  props: {
    msg: String,
    p1: {
      type: Number,
      require: true, //是否必填
      default: 3
    }
  },
  data() {
    return {
      str: '',
      obj: {
        id: 3,
        name: ''
      }
    }
  },
  provide() {
    return {
      //提供的简单数据类型非响应式
      fd1: this.str,
      //而复杂类型是响应式的，所以一般会先包装成{}进行提供
      fd2: this.obj
    }
  },
  inject: ['d1'],
  //混入:可用于封装一些需要用到组件内的对象的方法等，如this

  //混入中提供的data,method与组件中的重名时，组件的具有更高优先级
  //若有多个混入，后覆盖前
  mixins: [loginConfirm],
  created() {
    console.log('d1', this.d1)
    this.sayHi()
    console.log('loginConfirm', loginConfirm)
  },
  /* 实例被挂载后调用。此时 $el 被添加到 DOM 中*/
  mounted() {
    //document.querySelector查找范围为整个html,
    document.querySelector('.mychart-box')
    //refs查找范围为当前组件，更精确稳定
    //获取dom，或组件实例
    this.$refs.ref1
  },
  methods: {
    clearTask() {
      this.list = []
    },
    modifyMyInput() {
      this.$refs.myInput1.setValue('newValue')
    }
  },
  components: {
    CommonHeader
  }
}
</script>

<!-- 相比在</script>中可省略this -->
<template>
  <div class="main">
    <div ref="ref1"></div>
    <div>noteOptionsApi</div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';
.main {
  padding-top: @headerHeight;
}
</style>
