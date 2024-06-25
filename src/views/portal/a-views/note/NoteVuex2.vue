<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import demoUser from '@/store/modules/demoSon.js'
import store from '@/store/index.js'

export default {
  name: 'NoteVuex2',
  props: {},
  setup() {
    return {}
  },
  created() {
    console.log('store', store) //少用
    console.log('this.$store', this.$store)
  },
  computed: {
    //root state
    f2() {
      return this.$store.state.f2
    },
    //辅助函数原理：映射为上述代码
    ...mapState(['f3', 'f4']),
    //son state
    s2() {
      return this.$store.state.demoSon.s2
    },
    ...mapState('demoSon', ['s3']),
    //因为子模块的state还是会挂到root的state中，所以可以通过以下直接获取模块的整个state
    ...mapState(['demoSon']),

    //root getters
    rg2() {
      return this.$store.getters.rg2
    },
    ...mapGetters(['rg3', 'rg4']),
    //son getters
    sg2() {
      return this.$store.getters['demoSon/sg2']
    },
    ...mapGetters('demoSon', ['sg3', 'sg4'])
  },
  methods: {
    //root mutations
    f1add1(payload) {
      this.$store.commit('f1add1', payload)
    },
    ...mapMutations(['f2add1', 'f3add1']),
    //son mutations
    s1add1(payload) {
      this.$store.commit('demoSon/s1add1', payload)
    },
    ...mapMutations('demoSon', ['s2add1', 's3add1']),
    //root actions
    f1add1Async(payload) {
      this.$store.dispatch('f1add1Async', payload)
    },
    ...mapActions(['f2add1Async', 'f3add1Async']),
    //son actions
    s1add1Async(payload) {
      this.$store.dispatch('demoSon/s1add1Async', payload)
    },
    ...mapActions('demoSon', ['s2add1Async', 's3add1Async'])
  }
}
</script>

<!-- 模板中省略this -->
<template>
  <div class="one">
    <div>
      <h3>1访问state</h3>
      <!-- 模板中省略this -->
      <div>$store.state.f1 = {{ $store.state.f1 }}</div>
      <div>f2 = {{ f2 }}</div>
      <div>f3 = {{ f3 }}</div>
      <h5>访问子模块state</h5>
      <div>s1 = {{ $store.state.demoSon.s1 }}</div>
      <div>s2 = {{ s2 }}</div>
      <div>s3 = {{ s3 }}</div>
      <div>demoSon = {{ demoSon }}</div>
    </div>

    <div>
      <h3>2访问mutaions-直接修改源是不规范的</h3>
      <button @click="$store.state.f1 += 1">f1add1(不规范)</button>
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
      <h3>4访问getters(派生状态 has only a getter,不能修改)</h3>
      <div>rg1 = {{ $store.getters.rg1 }}</div>
      <div>rg2 = {{ rg2 }}</div>
      <div>rg3 = {{ rg3 }}</div>
      <h5>访问子模块getters</h5>
      <div>sg1 = {{ $store.getters['demoSon/sg1'] }}</div>
      <div>sg2 = {{ sg2 }}</div>
      <div>sg3 = {{ sg3 }}</div>
    </div>

    <div>
      <h3>5注意</h3>
      <div>通过 "模块名" 访问,需对应模块开启命名空间，否则获取不到</div>
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
