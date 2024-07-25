import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

// 创建通知/留言 
// 0 表示 系统通知、1表示用户留言、2.组织邀请
export const createNotification = (data) => {
  return http.request<any>('post', baseUrlApi('api/v1/notifications'),{data})
}