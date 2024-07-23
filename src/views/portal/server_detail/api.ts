import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
export const getServerDetail = (id: string) => {
  return http.request<any>("get", baseUrlApi(`products/${id}`));
};
