<script setup lang="ts">
import { getVCode, verifyVcode } from '@/api/user'
import darkIcon from '@/assets/svg/dark.svg?component'
import dayIcon from '@/assets/svg/day.svg?component'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import { useDataThemeChange } from '@/layout/hooks/useDataThemeChange'
import { useLayout } from '@/layout/hooks/useLayout'
import { useNav } from '@/layout/hooks/useNav'
import { getTopMenu, initRouter } from '@/router/utils'
import { message } from '@/utils/message'
import User from '@iconify-icons/ri/user-3-fill'
import { ElMessage, type FormInstance } from 'element-plus'
import { onBeforeUnmount, onMounted, reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import Motion from './utils/motion'
import { loginRules } from './utils/rule'
import { bg, illustration } from './utils/static'
const buttonCon = ref('获取验证码')
const registerInfo = ref({})
const isDisabled = ref(false)
defineOptions({
  name: 'Login'
})
const router = useRouter()
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()

const { initStorage } = useLayout()
initStorage()

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange()
dataThemeChange(overallStyle.value)
const { title } = useNav()

const ruleForm = reactive({
  phoneNumber: '',
  verificationCode: ''
})

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === 'Enter') {
    onLogin(ruleFormRef.value)
  }
}
onMounted(() => {
  window.document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
  window.document.removeEventListener('keypress', onkeypress)
})
const sendCode = () => {
  ruleFormRef.value.validateField('phoneNumber', async (valid, fields) => {
    if (valid) {
      isDisabled.value = true
      let time = 60
      getVCode(ruleForm.phoneNumber).then(resp => {
        ElMessage.success('验证码发送成功')
        registerInfo.value = resp
        console.log('registerInfo', registerInfo.value)
      })
      const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          isDisabled.value = false
          buttonCon.value = '获取验证码'
        } else {
          buttonCon.value = `${time}s`
          time--
        }
      }, 1000)
    } else {
      ElMessage.error('请输入手机号')
    }
  })
}
const verifyCode = (phone: string, code: string) => {
  ruleFormRef.value.validate(async valid => {
    if (valid) {
      verifyVcode(phone, code)
        .then(resp => {
          if (resp.access_token) {
            return initRouter().then(() => {
              console.log('getTopMenu(true)', getTopMenu(true))
              router.push('/welcome').then(() => {
                message('登录成功', { type: 'success' })
                localStorage.setItem('jwt', resp.access_token)
              })
            })
          } else {
            message('验证码错误，登录失败', { type: 'error' })
          }
        })
        .catch(() => {
          message('验证码错误，登录失败', { type: 'error' })
        })
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <img
            src="@/assets/images/logo.png"
            alt=""
            srcset=""
            style="width: 200px"
          />
          <Motion>
            <h2 class="outline-none">医疗器械创业供给平台</h2>
          </Motion>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                  }
                ]"
                prop="phoneNumber"
              >
                <el-input
                  v-model="ruleForm.phoneNumber"
                  clearable
                  placeholder="请输入手机号"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="100">
              <el-form-item
                prop="verificationCode"
                :rules="[
                  {
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                  }
                ]"
              >
                <div class="w-full flex justify-between">
                  <el-input
                    v-model="ruleForm.verificationCode"
                    clearable
                    placeholder="请输入验证码"
                    :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
                  />
                  <el-button
                    :disabled="isDisabled"
                    class="ml-2"
                    @click="sendCode"
                  >
                    {{ buttonCon }}
                  </el-button>
                </div>
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="
                  verifyCode(ruleForm.phoneNumber, ruleForm.verificationCode)
                "
              >
                登录
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/style/login.css');
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
