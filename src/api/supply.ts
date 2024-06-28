import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

/** 登录 */
export const getSupplyList = (data?: object) => {
  return http.request<any>('get', baseUrlApi('requirement/list'), { data })
}