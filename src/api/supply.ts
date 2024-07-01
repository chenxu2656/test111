import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

/** 获取需求列表 */
export const getSupplyList = () => {
  return http.request<any>('get', baseUrlApi('requirements/list'))
}