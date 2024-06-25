<script setup>
import Input1 from '@/views/portal/a-components/Input1.vue'
import { onUnmounted, ref } from 'vue'
import { showToast } from 'vant'
import {
  getEmailCaptcha,
  getImgCaptcha,
  loginByEmail,
  loginByPhone
} from '@/utils/api/login.js'
import { useMapMutations, useMapState } from '@/store/index.js'
import { getUserInfo } from '@/store/modules/userStorage.js'
let { setUserInfo } = useMapMutations({
  moduleName: 'user',
  mapper: ['setUserInfo']
})
let { userInfo } = useMapState({
  moduleName: 'user',
  mapper: ['userInfo']
})
console.log('userInfo', userInfo)
function step1_confirmClick() {}

async function login() {
  // const data = await loginByEmail(userEmail.value,userEmailCaptcha.value)
  console.log('login')
  const data = await loginByPhone()
  setUserInfo(data)
}
async function onBeforeClose(action1, done) {
  // 点击了确定按钮
  if (action1 === 'confirm') {
    if (!imgCaptchaDom.value.isVerifyPassed()) {
      showToast('验证码格式错误')
      return
    }
    if (userImgCaptchaVal.value !== imgCaptchaValue.value) {
      showToast('验证码错误')
      return
    }
    await getEmailCaptcha(
      userImgCaptchaVal.value,
      userEmail.value,
      imgCaptchaMd5.value
    )
    timer = setInterval(() => {
      currentSec.value--
      if (currentSec.value <= 0) {
        currentSec.value = totalSec
        clearInterval(timer)
        timer = null
      }
    }, 1000)
  } else {
    // 点击了取消按钮
  }
  //关闭弹窗
  showNonRobotVerify.value = false
}
function handleOpen() {
  userImgCaptchaVal.value = ''
  updateImgCaptcha()
}

function gainEmailCaptcha() {
  /* if (!emailDom.value.isVerifyPassed()) {
          showToast('邮箱格式错误')
          return
      }*/
  if (!timer && currentSec.value === totalSec) {
    showNonRobotVerify.value = true
  } else {
    showToast('稍后再试')
  }
}

async function updateImgCaptcha() {
  // const {data: {base64, key, md5},message,status} = await axiosShop.get('/captcha/image')
  const { base64, key, md5, value } = await getImgCaptcha()
  imgCaptchaBase64.value = base64
  imgCaptchaKey.value = key
  imgCaptchaMd5.value = md5
  imgCaptchaValue.value = value
}

// 用户输入
let userPhoneNum = ref('')
let userEmail = ref('')
let userEmailCaptcha = ref('')
// 非机器验证
let imgCaptchaBase64 = ref('失败链接')
let imgCaptchaKey = ref('')
let imgCaptchaMd5 = ref('')
let imgCaptchaValue = ref('')
let showNonRobotVerify = ref(false)
let userImgCaptchaVal = ref('')
// 倒计时
let timer = null
const totalSec = 60
let currentSec = ref(60)
//other
let currentStep = 1
// dom
let telephone = ref()
let emailDom = ref()
let imgCaptchaDom = ref()
let emailCaptchaDom = ref()

onUnmounted(() => {
  //关闭定时器，避免离开该组件仍在运行，带来性能消耗
  clearInterval(timer)
  timer = null
})
</script>

<template>
  <div class="l">
    <h1>邮箱登录</h1>
    <div v-show="currentStep === 1"></div>
    <div v-show="currentStep === 2"></div>
    <div v-show="currentStep === 3"></div>
    <Input1 ref="telephone" showType="telephone" v-model="userPhoneNum">
      <template #left>
        <label>中国+86</label>
      </template>
    </Input1>

    <Input1 ref="emailDom" showType="email" v-model="userEmail"> </Input1>

    <Input1
      ref="emailCaptchaDom"
      showType="emailCaptcha"
      v-model="userEmailCaptcha"
    >
      <template #right>
        <label @click="gainEmailCaptcha">
          {{
            currentSec !== totalSec ? `重新获取(${currentSec})` : '获取验证码'
          }}
        </label>
      </template>
    </Input1>

    <van-dialog
      v-model:show="showNonRobotVerify"
      title="非机器人验证"
      show-cancel-button
      @open="handleOpen"
      :before-close="onBeforeClose"
    >
      <Input1
        class="captcha"
        ref="imgCaptchaDom"
        showType="imgCaptcha"
        v-model="userImgCaptchaVal"
      >
        <template #right>
          <img :src="imgCaptchaBase64" @click="updateImgCaptcha()" />
        </template>
      </Input1>
    </van-dialog>

    <div>密码登录(忘记密码)，扫码登录(安全快捷)</div>
    <div>qq,微信，注册</div>

    <div>
      <input type="radio" />
      <button @click="login">同意并登录</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.captcha {
  margin: 30px;
}

.l {
  //height: 300px;
  height: fit-content;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px 20px;
  margin: 5px;
  background: white;

  border: 0.1rem solid #512a10;
  border-radius: 12px;

  h1 {
    padding: 0;
    font-size: 16px;
    text-align: center;
  }
}
</style>

<style lang="less">
//van-dialog背景值覆盖了toast的
.van-popup.van-toast {
  background: gray;
}
</style>
