import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
export const getSearchList = (category: string, skip: number) => {
  return http.request<any>(
    "get",
    baseUrlApi(`products/search?skip=${skip}&limit=12&category=${category}`),
  );
};
