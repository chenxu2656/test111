<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import {
  provide,
  inject,
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch
} from 'vue'

// setup中拿不到this,且CompositionApi少用this
console.log('this=', this)

const props = defineProps({
  name: {
    type: Number,
    default: 3,
    required: true,
    validator(value) {
      if (value >= 0 && value <= 10) {
        return true
      }
      console.error('校验失败')
      return false
    }
  },
  item: {
    type: Object,
    //Object类型的prop写成函数???
    default: () => {
      return {}
    }
  }
})
// 在模板中才可省略props.获取prop
console.log('props=', props)

//定义自定义事件,及其触发函数
const emit = defineEmits(['e1', 'e2'])
const triggerE1 = () => {
  emit('e1', 'arg')
}

//外部可通过本实例引用访问到的内部属性，方法
defineExpose({
  // menuClick,
  // btnMenu,//报错
})

// defineSlots()
// defineAsyncComponent()
// defineComponent()
// defineModel()//看MySelect4

//使用了<script setup>,可免除再定义一个<script>去定义其他没有对应宏函数同setup层级的options
defineOptions({
  name: '',
  inheritAttrs: true
})

//路由传递参数
// this.$route.query//option api
const router = useRouter()
const route = useRoute()
//路由查询参数
console.log('route.query', route.query)
//路由动态参数
console.log('route.params', route.params)
//带有路由或请求参数
console.log('route.fullPath', route.fullPath)

function reactiveAndRef() {}

//common data, 非响应式,数据变化，视图不变化
let obj1 = {
  id: 1,
  name: 'obj1'
}
// 生成响应式对象，数据变化，视图变化
let objReactive = reactive({
  id: 1,
  name: 'objReactive'
})
console.log('objReactive=', objReactive)
// 可生成响应式的简单类型，复杂类型(对象)的数据
// 原理：将值包裹在对象的value中，再借助reactive实现响应式
// 在脚本中需用.value获取值，但在模板中可省略.value
let objRef = ref({
  id: 1,
  name: 'objRef'
})
console.log('objRef=', objRef)
const computedDemo = () => {}
const refList = ref([1, 2, 3, 4, 5])
const computedList = refList.value.filter(item => item > 2)
//返回的是个ComputedRefImpl,仍然是ref,而且还Computed，即list 动态变化时，computed会重新计算
const computedRefList = computed(() => {
  //computed 只用于跟随计算，不应该有副作用，如异步请求,操作dom
  return refList.value.filter(item => item > 2)
})

// 计算属性一般是只读的，但也可以创建一个可写的计算属性 ref：
function writableComputed() {
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: val => {
      // plusOne始终是get计算后的值，需更改原数据的值才能更改plusOne
      count.value = val - 1
    }
  })
  console.log(plusOne.value) // 0
  //不提供get,set默认是不能改的
  plusOne.value = 3
  console.log(plusOne.value) // 0
}

function watchDemo() {}

/*
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
})
watch([fooRef, barRef], (newArray, oldArray) => {
})
*/
// 当监视的是对象时，需使用deep选项，否则对象属性改变但地址不变也不会监视到，不过会监视所有属性
const objRef1 = ref({ id: 1, name: 'objRef1' })
watch(objRef1, () => console.log('objRef1变化了'))
// 也可以针对对象某个属性进行监视，但此时source需写成getter函数
watch(
  () => objRef1.value.id,
  () => console.log('id变化了')
)

function lifecycleDemo() {}

//与选项式api相比，可以分离，并组合同一逻辑的代码，对个onMounted按顺序执行不会冲突
onMounted(() => {
  //逻辑1
})
onMounted(() => {
  //逻辑2
})
onUnmounted(() => {
  //定时器销毁，vue中为destroyed
})

function Deconstruction() {
  let user = {
    id: 1,
    name: 'rrr'
  }
  //解构重命名，默认值
  const { id: userId, name: userName, sex = '未设置' } = user
  console.log('id', id)
  console.log('userId', userId)
}

function provideAndInject() {}
//需有嵌套关系
//顶层provide提供数据，且顶层数据修改，底层数据也会变化
let value1 = ref(0)
provide('key', 'value')
provide('key1', value1)
//底层inject获取，
const value = inject('key')
//但应遵循单向数据流，底层不能直接修改顶层数据，但可以通过顶层provide的方法进行修改
//也可通过传方法的方式实现底层向顶层传数据
provide('changeValue1', newValue => {
  value1.value = newValue
})
</script>

<template>
  <div class="one">
    <div>
      <div>list:{{ refList.join(',') }}</div>
      <div>computedList:{{ computedList }}</div>
      <div>reactiveComputedList:{{ computedRefList }}</div>
      <div>地址栏参数：{{ $route.query }}</div>
      <div>动态路由参数：{{ $route.params }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';

.one {
  width: 100%;
  min-height: 200px;
  padding-top: @headerHeight;
  border: 0.1rem solid #512a10;
  color: black;
}
</style>
