<script setup>
import { ref } from 'vue'
import TableViewCommon from '@/views/portal/a-components/Table.vue'
import { RouterLink } from 'vue-router'
import LinkBox from '@/views/portal/a-components/less/HeaderLinksBox.vue'
import Tag from '@/views/portal/a-components/Tag.vue'

let list2 = ref([
  { id: 1, name: 'zxh', tags: ['tags21-1', 'tags21-2'] },
  { id: 2, name: 'wxx', tags: ['tags22'] },
  { id: 3, name: 'abb', tags: ['tags23'] },
  { id: 4, name: 'yzz', tags: ['tags24'] }
])
let list3 = ref([
  { id: 1, name: 'zxh', tags: ['tags2'] },
  { id: 2, name: 'wxx', tags: ['tags2'] },
  { id: 3, name: 'abb', tags: ['tags2'] },
  { id: 4, name: 'yzz', tags: ['tags2'] }
])

const tableViewCommon3 = ref()
function showById(id) {
  tableViewCommon3.value.showDetailById(id)
}

function deleteById(id) {
  console.log('deleteById')
  list2.value = list2.value.filter(item => item.id !== id)
}
</script>

<template>
  <div class="tvd-box">
    <TableViewCommon>表1 </TableViewCommon>

    <TableViewCommon :lines="list2"
      >表2
      <!--            <template #operations="obj">-->
      <template v-slot:operations="obj">
        <button @click="deleteById(obj.lineId)">删除</button>
      </template>
    </TableViewCommon>

    <TableViewCommon ref="tableViewCommon3" :lines="list3"
      >表3
      <template #operations="{ lineId, message }">
        <button @click="showById(lineId)">查看</button>
      </template>
    </TableViewCommon>

    <TableViewCommon :lines="list3"
      >表3
      <template #operations="{ lineId, message }">
        <button @click="">查看</button>
      </template>
    </TableViewCommon>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';

.tvd-box {
  padding-top: @headerHeight;
  display: block;
  margin: 0 50px;
  color: black;

  td {
    text-align: center;
    min-width: 50px;
  }
}
</style>
