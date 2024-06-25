<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { mapActions, mapGetters, mapMutations, mapState, useStore } from 'vuex'
import store, {
  useMapActions,
  useMapGetters,
  useMapMutations,
  useMapState
} from '@/store/index.js'

const props = defineProps({
  name: {
    type: String,
    required: false
  }
})

//未配置正确,store1会为undefined
const store1 = useStore()
console.log('store', store) //一般不会导入使用
console.log('store1', store1)

// 1 无computed
const f1 = store1.state.f1
// 2 单独computed
const f2 = computed(() => store1.state.f2)
// 3 mapState统一生成获取函数，再依次computed变成ComputedRefImpl
const storeStateFns = mapState(['f3', 'f4'])
// const count5 = storeStateFns.count()//此处不能调用，内部$store没有定义
let storeState = {}
let f3NotComputed = 0
Object.keys(storeStateFns).forEach(fnkey => {
  const fn = storeStateFns[fnkey].bind({ $store: store1 })
  if (fnkey === 'f3') {
    f3NotComputed = fn() //还未computed
  }
  storeState[fnkey] = computed(fn)
})
let { f3, f4 } = { ...storeState }

let { s1, s2 } = useMapState({
  moduleName: 'demoSon',
  mapper: ['s1', 's2']
})
console.log('s1.value', s1.value)

let { f1add1, f2add1, f3add1 } = useMapMutations({
  mapper: ['f1add1', 'f2add1', 'f3add1']
})
let { s1add1, s2add1, s3add1 } = useMapMutations({
  moduleName: 'demoSon',
  mapper: ['s1add1', 's2add1', 's3add1']
})

let { f1add1Async, f2add1Async, f3add1Async } = useMapActions({
  mapper: ['f1add1Async', 'f2add1Async', 'f3add1Async']
})
let { s1add1Async, s2add1Async, s3add1Async } = useMapActions({
  moduleName: 'demoSon',
  mapper: ['s1add1Async', 's2add1Async', 's3add1Async']
})

let { rg1, rg2, rg3 } = useMapGetters({
  mapper: ['rg1', 'rg2', 'rg3']
})
let { sg1, sg2, sg3 } = useMapGetters({
  moduleName: 'demoSon',
  mapper: ['sg1', 'sg2', 'sg3']
})
</script>

<template>
  <div class="one">
    <div>
      <h3>1访问state</h3>
      <div>直接使用store，store1，都是响应的</div>
      <div>store.state.f1 = {{ store.state.f1 }}</div>
      <div>f2 = {{ store1.state.f2 }}</div>
      <div>通过变量接收,只有经过computed,才是响应的</div>
      <div>f1 = {{ f1 }}</div>
      <div>f2 = {{ f2 }}</div>
      <div>f3 = {{ f3 }}</div>
      <div>f3NotComputed = {{ f3NotComputed }}</div>
      <h5>访问子模块state</h5>
      <div>$store.state.demoSon = {{ $store.state.demoSon }}</div>
      <div>$store.state.demoSon.s1= {{ $store.state.demoSon.s1 }}</div>
      <div>s2 = {{ s2 }}</div>
    </div>

    <div>
      <h3>2访问mutaions</h3>
      <button @click="store1.state.f1 += 1">f1add1(不规范)</button>
      <button @click="f1add1(1)">f1add1</button>
      <button @click="f2add1(1)">f2add1</button>
      <button @click="f3add1">f3add1</button>
      <h5>访问子模块mutaitons</h5>
      <button @click="s1add1(1)">s1add1</button>
      <button @click="s2add1(1)">s2add1</button>
      <button @click="s3add1">s3add1</button>
    </div>

    <div>
      <h3>3访问actions</h3>
      <button @click="f1add1Async(1)">f1add1Async</button>
      <button @click="f2add1Async(1)">f2add1Async</button>
      <button @click="f3add1Async">f3add1Async</button>
      <h5>访问子模块actions</h5>
      <button @click="s1add1Async(1)">s1add1Async</button>
      <button @click="s2add1Async(1)">s2add1Async</button>
      <button @click="s3add1Async">s3add1Async</button>
    </div>

    <div>
      <h3>4访问getters</h3>
      <div>getters = {{ store1.getters }}</div>
      <div>rg1 = {{ store1.getters.rg1 }}</div>
      <div>rg2 = {{ rg2 }}</div>
      <div>rg3 = {{ rg3 }}</div>
      <h5>访问子模块getters</h5>
      <div>sg1 = {{ store1.getters['demoSon/sg1'] }}</div>
      <div>sg2 = {{ sg2 }}</div>
      <div>sg3 = {{ sg3 }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/main.less';

.one {
  width: 100%;
  min-height: 200px;
  padding-top: @headerHeight;
  border: 0.1rem solid #512a10;
  color: black;

  button {
    margin: 0 5px;
  }
}
</style>
