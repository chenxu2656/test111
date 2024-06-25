<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import FormInput from '@/views/portal/a-components/FormInput.vue'

const props = defineProps({
  behavior: {
    type: String,
    required: false,
    default: 'lb-show-in-header'
  },
  bean: {
    type: Object,
    default: {
      label: '默认名称:',
      name: '',
      placeHolder: '请输入',
      value: '',
      links: [
        { name: '测试1', url: '/demo1', type: 'a', target: '_blank' },
        { name: '测试2', url: '/demo2', type: 'RouterLink' }
      ]
    }
  }
})

let linksBox = ref()
onMounted(() => {})
</script>

<template>
  <ainow-form-input class="box">
    <label for="remark">{{ bean.label }}</label>
    <input
      class="layui-input"
      type="text"
      autocomplete="off"
      id="remark"
      :name="bean.name"
      :placeholder="bean.placeHolder"
      :value="bean.value"
    />
  </ainow-form-input>
</template>

<style scoped lang="less">
@import '../assets/main.less';

.box {
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 0.1rem solid #512a10;
  color: black;
  font-size: 1.1em;

  label {
    line-height: 1em;
  }

  input[type*='text'][type*='i'] {
  }
  input[type='text' i] {
    writing-mode: horizontal-tb !important;
    padding-block: 1px;
    padding-inline: 2px;
  }

  input {
    background-color: rgba(255, 255, 255, 0.6);
    color: #777;
    width: 100%;
    padding-left: 10px;

    height: 38px;
    line-height: 1.3;
    line-height: 38px\9;
    border-width: 1px;
    border-style: solid;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.85);
    border-radius: 2px;

    border-color: #eee;

    outline: 0;
    -webkit-appearance: none;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    box-sizing: border-box;

    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    outline: 0;

    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:hover {
      border-color: #d2d2d2 !important;
    }
  }
}
</style>
