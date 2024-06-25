<script setup>
import { ref } from 'vue'
import EditView from '@/views/portal/a-views/note/EditView.vue'
import MyChart from '@/views/portal/a-components/MyChart.vue'
import MySelect1 from '@/views/portal/a-components/less/MySelect1.vue'
import MySelect3 from '@/views/portal/a-components/less/MySelect3.vue'
// import bgWR from "@/assets/img/bg/window-rain.jpg";

import { addCart, getData } from '@/utils/api/shop.js'
import MySelect4 from '@/views/portal/a-components/less/MySelect4.vue'
import { useDemoSetupStore } from '@/stores/demoSetupStore.js'
import { storeToRefs } from 'pinia'
import DemoSon from '@/views/portal/a-views/demo/DemoSon.vue'
import MusicPlayer2 from '@/views/portal/a-components/less/MusicPlayer2.vue'
import MusicPlayer3 from '@/views/portal/a-components/less/MusicPlayer3.vue'
// console.log('bgWR',bgWR)

let inputValue = ref('fdfss')
let selectedValue = ref('102')

let ints = [1, 2, 3, 4, 5]

async function btnClick() {
  // let data = await getData()
  let data = await addCart()
  console.log(' ints.splice()', ints.splice(2, 2, 9, 8))
}

//???注册不了事件
let html = ref('<a style="color: red" @click="aClick">hhhh</a>')

let demoCount1 = ref(0)

function onInput(p1, p2, p3) {
  console.log('p1', p1)
  console.log('p2', p2)
  console.log('p3', p3)
}

let demoSetupStore = useDemoSetupStore()
console.log('demoSetupStore.count', demoSetupStore.count)
//直接解构会导致响应式的丢失
// let {count} = demoSetupStore
//可用storeToRefs解决
const { count } = storeToRefs(demoSetupStore)
console.log('count', count)
count.value++ //会直接修改store,不建议
//actions可以直接解构
const { increment } = demoSetupStore
function getProp() {
  return {
    is: 'div'
  }
}
</script>

<template>
  <div class="main">
    <h3>其他</h3>
    <div>
      <!-- 拖动组件 -->
      <component :is="'RouterLink'" v-bind="{ to: '#' }">ddddd</component>
      <component v-bind="{ to: '#', is: 'RouterLink' }">ddddd</component>
      <div class="box"></div>
      <div class="demo2" draggable="true">hhhh</div>
      <MusicPlayer3></MusicPlayer3>
      <MusicPlayer2></MusicPlayer2>
      <div class="father">
        father
        <DemoSon></DemoSon>
      </div>

      <EditView />
      <MyChart />
      <div v-html="html"></div>
      <!-- 条件满足则添加该类，否则移除 -->
      <div :class="{ colorRed: demoCount1 === 0 }">xxx</div>
      <RouterLink to="/cart" target="_blank">查询参数传参</RouterLink>

      <a href="http://localhost/donate/" target="_blank" rel="noopener"
        >i am a</a
      >

      <input type="text" />
      <button @click="btnClick" target="_blank">获取数据</button>
    </div>

    <h3>双向绑定</h3>
    <div>
      <!-- 1 common，不能简写 -->
      <MySelect1
        sequence="1-1"
        :selectedValue="selectedValue"
        @selectedValueChange="selectedValue = $event"
      ></MySelect1>

      <!-- 2 语法糖 -->
      <!-- vue2 .sync -->
      <!--        <MySelect3 sequence="3-1-1" :selectedValue.sync="selectedValue"></MySelect3>-->
      <!-- vue3 用v-model扩展语法取替.sync -->
      <MySelect3 sequence="2-1" v-model="selectedValue"></MySelect3>
      <!-- vue2 对于组件 v-model等价于 (value接收,触发input) -->
      <!--        <MySelect2 sequence="2-2" :value="selectedValue" @input="selectedValue=$event.target.value"></MySelect2>-->
      <!-- vue3 对于组件 v-model等价于 -->
      <MySelect3 sequence="2-2" v-model:modelValue="selectedValue"></MySelect3>
      <MySelect3
        sequence="2-3"
        :modelValue="selectedValue"
        @update:modelValue="selectedValue = $event"
      ></MySelect3>
      <!-- 2 简化内部操作 -->
      <MySelect4 v-model="selectedValue"></MySelect4>
      <!-- vue2/3 对于input v-model等价于 -->
      <input v-model="inputValue" />
      <input :value="inputValue" @input="inputValue = $event.target.value" />
      <div>{{ inputValue }}</div>
    </div>

    <h3>事件传参</h3>
    <div>
      <input @input="onInput" />
      <input @input="onInput()" />
      <input @input="e => onInput('param3', e)" />
      <input @input="onInput($event, 'param')" />
    </div>

    <h3>pinia</h3>
    <div>
      <div>
        {{ count }}
        <button @click="count++">+1</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';
.box {
  position: relative;
  width: 200px;
  height: 200px;
  background-image: linear-gradient(90deg, #333333, #666666, #999999);
  overflow: hidden;

  &::before {
    position: absolute;
    content: '';
    width: 100px;
    height: 100px;
    right: -50px;
    top: -50px;
    z-index: 100;
    background-color: #ffffff;
    transform: rotateZ(45deg);
  }
}

.triangle {
  width: 0;
  height: 0;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
  background-image: url('@/assets/svg/logo.svg');
  //transform: rotate(45deg);
}
.demo2 {
  width: 200px;
  height: 200px;
  border: 0.1rem solid #512a10;
}

.demo-class {
  border: #42b983 solid 2px;
}

.father {
}

.colorRed {
  color: red;
}

.number {
  font-size: 36px;
  width: 200px;
  height: 200px;
  background: white;
  display: flex;
  place-content: center;
  place-items: center;
  margin: 10px;
}

.main {
  padding-top: @headerHeight;

  h3 {
    padding-top: 10px;
  }
}
</style>
