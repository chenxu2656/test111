<script setup>
import { ref } from 'vue'
import Tag from '@/views/portal/a-components/Tag.vue'

let list = ref()
defineExpose({
  showDetailById
})
const props = defineProps({
  lines: {
    type: Array,
    default: [
      { id: 1, name: 'zxh', tags: ['tags21-1', 'tags21-2'] },
      { id: 2, name: 'wxx', tags: ['tags22'] },
      { id: 3, name: 'abb', tags: ['tags23'] },
      { id: 4, name: 'yzz', tags: ['tags24'] }
    ]
  }
})

function updateTagName(index, index2, newTagName) {
  //props为obj,修改了props的内容？？？
  props.lines[index].tags[index2] = newTagName
}
function showDetailById(id) {
  let line = props.lines.filter(line => line.id === id)
  alert(JSON.stringify(line))
}

function deleteById(id) {
  props.lines = props.lines.filter(line => line.id !== id)
}
</script>

<template>
  <div class="box">
    <table>
      <thead>
        <tr>
          <th colspan="4">
            <!-- 插槽默认值 -->
            <slot> 表格名称</slot>
          </th>
        </tr>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>tag(双击修改)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(line, lineIndex) in lines" :key="lineIndex">
          <td>{{ lineIndex + 1 }}</td>
          <td>{{ line.name }}</td>
          <td>
            <Tag
              v-for="(tagName, tagIndex) in line.tags"
              :key="tagIndex"
              :tagName="tagName"
              @update:tagName="updateTagName(lineIndex, tagIndex, $event)"
            ></Tag>
          </td>
          <td>
            <!-- 具名插槽 > 多个插槽 -->
            <!-- 作用域插槽 > slot（子）向template（父）传值，数据绑定 -->
            <slot name="operations" :lineId="line.id" msg="test message">
              <button @click="deleteById(line.id)">删除</button>
              <button @click="showDetailById(line.id)">查看</button>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';

.box {
  display: block;

  margin: 10px 10px;
  color: black;
  border: 0.1rem solid #512a10;

  td {
    text-align: center;
    min-width: 50px;
  }
}
</style>
