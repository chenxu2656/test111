import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

/** 获取需求列表 */
export const getSolveList = () => {
  return http.request<any>('get', baseUrlApi('technologyAchievements/list'))
}
// /** 根据id查询需求 */
// export const getSolveDetail = (id: string) => {
//   return http.request<any>('get', baseUrlApi(`technologyAchievements/requirementId/${id}`))
// }