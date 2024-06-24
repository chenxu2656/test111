import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<any>('post', baseUrlApi('login'), { data })
}

/**发送验证码 */
export const getVCode = (phoneNumber: string) => {
  return http.request<any>(
    'post',
    baseUrlApi(
      `sendVerificationCode?phoneNumber=${phoneNumber}&available_time=5`
    ),
    {}
  )
}

/**验证验证码 */
export const verifyVcode = (phoneNumber: string, vcode: string) => {
  return http.request<any>(
    'post',
    baseUrlApi(
      `verifyCode?phoneNumber=${phoneNumber}&verificationCode=${vcode}`
    ),
    {}
  )
}
