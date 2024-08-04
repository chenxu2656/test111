import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

/** 获取需求列表 */
// export const getSolveList = () => {
//   return http.request<any>('get', baseUrlApi('technologyAchievements/list'))
// }
export const getSolveList = (page: number, keyword: string, achievement_category: string, industry_sector: string, region: string) => {
  const skip = (page - 1) * 10;
  //用于去除不必要的字符，防止查询出错
  const queryParams = [
    keyword && `&keyword=${encodeURIComponent(keyword)}`,
    achievement_category && `&achievement_category=${encodeURIComponent(achievement_category)}`,
    industry_sector && `&industry_sector=${encodeURIComponent(industry_sector)}`,
    region && `&region=${encodeURIComponent(region)}`
  ].filter(Boolean).join('');
  const url = baseUrlApi(`technologyAchievements/list?skip=${skip}&limit=10${queryParams}`);
  return http.request<any>("get", url);
};
// /** 根据id查询需求 */
// export const getSolveDetail = (id: string) => {
//   return http.request<any>('get', baseUrlApi(`technologyAchievements/requirementId/${id}`))
// }