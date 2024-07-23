import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
export const getHomeDisplayList = (category: string) => {
  return http.request<any>(
    "get",
    baseUrlApi(`products/search?skip=0&limit=8&category=${category}`),
  );
};
