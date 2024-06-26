<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

import { mapActions, mapGetters, mapMutations, mapState, useStore } from 'vuex'
import { useMapGetters, useMapState } from '@/store/index.js'
import { useMapActions } from '@/store/index.js'

const fileName = 'NoteVuex.vue'
const props = defineProps({
  name: {
    type: String,
    required: false
  }
})

const store = useStore()

const moduleName = 'cart'
let { list } = useMapState({
  moduleName: moduleName,
  mapper: ['list']
})
let { getList, patchItemById } = useMapActions({
  moduleName: moduleName,
  mapper: ['getList', 'patchItemById']
})
let { totalCount, totalPrice } = useMapGetters({
  moduleName: moduleName,
  mapper: ['totalCount', 'totalPrice']
})

getList()

function updateItemById() {
  let item = list.value.find(item => item.id == 100001)
  patchItemById({
    id: item.id,
    count: item.count + 1
  })
}
</script>

<template>
  <div class="one">
    <h3>cart</h3>
    <div>list = {{ list }}</div>
    <div>totalCount = {{ totalCount }}</div>
    <div>totalPrice = {{ totalPrice }}</div>
    <div>
      <button @click="updateItemById()">第一行 count+1</button>
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

  button {
    margin: 0 5px;
  }
}
</style>
