<script setup>
import axios from 'axios'
import FormInput from '@/views/portal/a-components/FormInput.vue'
import CommonHeader from '@/views/portal/a-components/less/Header.vue'
import { nextTick, ref } from 'vue'

const fileName = 'Tag.vue'
const emit = defineEmits(['update:tagName', 'e2'])
const props = defineProps({
  tagName: {
    type: String,
    default: 'tag'
  },
  bean: {}
})
let isEditing = ref(false)
const input = ref()

function tagDoubleClick() {
  console.log(input)
  input.value = props.tagName
  //v-if=false的div不会被添加到html
  isEditing.value = true
  //v-if刚改为true时，由于vue为异步dom更新，元素还未被渲染完成, this.$refs.input为undefined
  // 1 借助$nextTick等待dom更新完成回调
  // this.$nextTick(() => {this.$refs.input.focus()})//vue2
  /*
        nextTick(() => {
            input.value.focus()
        })
    */
  // 2 v-focus全局指令
  // 3 不推荐使用延时执行
  setTimeout(() => {
    console.log('执行延时任务')
  }, 1000)
}

function changeTagName(e) {
  //触发事件
  log(e.target.value, 'e1', fileName)

  if (e.target.value.trim() === '') {
    return alert('修改内容不能为空')
  }

  emit('update:tagName', e.target.value)
  isEditing.value = false
}
</script>

<template>
  <div class="tag">
    <input
      class="layui-input"
      v-focus
      v-if="isEditing"
      ref="input"
      type="text"
      autocomplete="off"
      id="remark"
      name="name"
      placeholder="bean.placeHolder"
      :value="tagName"
      @blur="isEditing = false"
      @keyup.enter="changeTagName"
    />

    <div class="tagName" v-else @dblclick="tagDoubleClick">
      {{ tagName }}
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/assets/main.less';

.tag {
  display: inline-block;
  width: fit-content;
  vertical-align: middle;
  font-size: 0.9rem;
  line-height: 1rem;

  color: black;

  .tagName {
    border: 0.1rem solid #512a10;
  }
}
</style>
