import {
  getPublicProductsApi,
  getProductDetailApi,
  getPrivateProductsApi,
  getPrivateProductApi,
} from "../api/productApi";
import { useQuery } from "@tanstack/react-query";
import { useProtectedQuery } from "@hooks/useProtectedQuery";

export const useFetchPublicProducts = ({ category, ...queryParams } = {}) => {
  return useQuery({
    queryKey: ["publicProducts", { category, ...queryParams }],
    queryFn: () => getPublicProductsApi({ category, queryParams }),
    placeholderData: (previousData) => previousData ?? [],
    retry: false,
    enabled: !!category,
  });
};

export const useFetchProductDetail = ({ productId, category, enabled }) => {
  return useQuery({
    queryKey: ["productDetail"],
    queryFn: () => getProductDetailApi(productId),
    retry: false,
    enabled,
  });
};

export const useFetchPrivateProducts = (queryParams) => {
  const queryKey = ["private", "Products", queryParams];

  return useProtectedQuery({
    queryKey,
    queryFn: () => getPrivateProductsApi(queryParams),
    placeholderData: (previousData) => previousData ?? [],
    retry: false,
  });
};

// 將 isValidMongoObjectId + 轉跳封裝到 hook 已實現重用
export const useFetchPrivateProduct = ({ productId, enabled }) => {
  return useProtectedQuery({
    queryKey: ["private", "privateProduct", productId],
    queryFn: () => getPrivateProductApi(productId),
    retry: false,
    enabled,
  });
};
