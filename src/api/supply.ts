import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 获取需求列表 */
export const getSupplyList = () => {
  return http.request<any>("get", baseUrlApi("requirements/list"));
};
/** 根据id查询需求 */
export const getSupplyDetail = (id: string) => {
  return http.request<any>(
    "get",
    baseUrlApi(`requirements/requirementId/${id}`),
  );
};

/**创建需求 */
