import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
export const getSearchList = (category: string, pageNumber: number) => {
  return http.request<any>("get", baseUrlApi("products/search"), {
    params: {
      limit: 12,
      skip: (pageNumber - 1) * 12,
      category: category,
    },
  });
};

export const getSearchListByKeyword = (keyword: string, pageNumber: number) => {
  return http.request<any>("get", baseUrlApi("products/search"), {
    params: {
      limit: 12,
      skip: (pageNumber - 1) * 12,
      keyword: keyword,
    },
  });
};
