<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'

import { showLoadingToast, showToast } from 'vant'

const props = defineProps({
  modelValue: {
    type: String,
    // default: '151',
    required: false
  },
  showType: {
    type: String,
    default: 'text',
    required: false
  },
  isNecessary: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:modelValue'])

//
const showLeft = ['telephone']
const showRight = ['smsCaptcha', 'imgCaptcha']
//input properties
let placeholder = ref('')
let maxLength = 20
let type = ref('')
// 校验,限制输入
let formatRegex = /^$/ //不匹配任何字符
let formatErrorStr = '格式错误'
let formatSuccessStr = '格式正确'
let filterRegex = null
// dom
let hintDom = ref()
let hintValue = ref('')
// initial data
type.value = 'text'
switch (props.showType) {
  case 'imgCaptcha':
    placeholder.value = '请输入图形验证码'
    maxLength = 4
    filterRegex = /[^a-zA-Z0-9]/g
    formatRegex = /^\w{4}$/
    formatErrorStr = '验证码格式错误'
    formatSuccessStr = '验证码格式正确'
    break
  case 'emailCaptcha':
  case 'smsCaptcha':
    filterRegex = /\D/g
    formatRegex = /^\w{6}$/
    placeholder.value = '请输入验证码'
    maxLength = 6
    break
  case 'telephone':
    placeholder.value = '请输入手机号'
    maxLength = 13
    filterRegex = /[^\d]/g
    formatRegex = /^1[3-9]\d{9}$/
    formatErrorStr = '手机号格式错误'
    formatSuccessStr = '手机号格式正确'
    break
  case 'email':
    placeholder.value = '请输入邮箱'
    formatRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    maxLength = 20
    break
}
function isVerifyPassed() {
  return formatRegex.test(props.modelValue)
}
async function onInput() {
  //去除无效字符
  event.target.value = event.target.value.replace(filterRegex, '')
  //使用await才能保证 emit更新prop后立即使用该prop获取到的是newValue
  await emit('update:modelValue', event.target.value)
  //校验
  if (!isVerifyPassed()) {
    hintValue.value = formatErrorStr
    hintDom.value.style.color = 'red'
  } else {
    hintDom.value.style.color = 'green'
    hintValue.value = formatSuccessStr
  }
}

function onInputFocus() {}
function onInputBlur() {
  if (props.isNecessary) {
    if (props.modelValue === '') {
      hintValue.value = '必填项'
      hintDom.value.style.color = 'red'
    }
  }
}

defineExpose({
  isVerifyPassed
})
</script>

<template>
  <div class="i1">
    <div class="input">
      <div v-if="showLeft.includes(showType)" class="left">
        <slot name="left" />
      </div>
      <input
        ref="input"
        class="input-1"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :type="type"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @input="onInput"
      />

      <div class="right">
        <slot name="right" />
      </div>
    </div>
    <div ref="hintDom" class="hint">{{ hintValue }}</div>
  </div>
</template>

<style scoped lang="less">
.hint-error {
  color: red;
}
.hint-success {
  color: lawngreen;
}

.i1 {
  font-size: 14px;

  .input {
    display: flex;
    white-space: nowrap;
    position: relative;

    height: 36px;
    width: 100%;
    min-width: 200px;

    .input-1 {
      width: 100%;
      height: 100%;

      &:placeholder-shown {
        font-size: 0.8em;
      }
    }

    .left + input {
      padding-left: 5em;
    }

    .right,
    .left {
      display: flex;
      place-items: center;
    }

    .left {
      position: absolute;
      width: fit-content;
      height: 100%;
      border: 0.1rem solid #512a10;
    }

    .right {
      width: fit-content;
      height: 100%;
      padding: 0 3px 0;

      position: absolute;
      right: 0;
    }
  }

  .hint {
    font-size: 0.9em;
  }
}
</style>
<style lang="less">
.i1 {
  .right {
    img {
      height: 90%;
    }

    label {
      color: #02a9f1;
    }
  }
}
</style>
