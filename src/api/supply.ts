import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 获取需求列表 */
export const getSupplyList = (page: number, keyword: string, category: string, type: string, region: string) => {
  const skip = (page - 1) * 10;
  //用于去除不必要的字符，防止查询出错
  const queryParams = [
    keyword && `&keyword=${encodeURIComponent(keyword)}`,
    category && `&category=${encodeURIComponent(category)}`,
    type && `&type=${encodeURIComponent(type)}`,
    region && `&region=${encodeURIComponent(region)}`
  ].filter(Boolean).join('');
  const url = baseUrlApi(`requirements/list?skip=${skip}&limit=10${queryParams}`);
  return http.request<any>("get", url);
};
/** 根据id查询需求 */
export const getSupplyDetail = (id: string) => {
  return http.request<any>(
    "get",
    baseUrlApi(`requirements/requirementId/${id}`),
  );
};

//获取随机3个需求
export const getRandomRequirments=(category:string)=>{
  return http.request<any>( "get",
    baseUrlApi(`requirements/random?category=${category}&num=3`),
  );
}
/**创建需求 */
