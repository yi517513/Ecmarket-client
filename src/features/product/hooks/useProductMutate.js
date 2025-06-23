import {
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../api/productApi";
import { useProtectedMutate } from "@hooks/useProtectedMutate";
import { useQueryClient } from "@tanstack/react-query";
import { notifyUtils as notify } from "@utils/notify";
import { useNavigate } from "react-router-dom";

export const useCreateProduct = () => {
  const navigate = useNavigate();

  return useProtectedMutate({
    mutationFn: createProductApi,
    onMutate: () => {
      notify.loading("新增商品中。。。");
    },
    onSuccess: (productId) => {
      navigate(`/item/${productId}`);
    },
  });
};

export const useUpdateProduct = () => {
  const navigate = useNavigate();

  return useProtectedMutate({
    mutationFn: updateProductApi,
    onMutate: () => {
      notify.loading("正在更新中。。。");
    },
    onSuccess: ({ productId, category }) => {
      navigate(`/products/${category}/${productId}`);
    },
  });
};

export const useDeleteProduct = (queryParams) => {
  const queryClient = useQueryClient();
  const queryKey = ["private", "Products", queryParams];

  return useProtectedMutate({
    mutationFn: deleteProductApi,
    onMutate: async (productId) => {
      notify.loading("正在刪除中。。");

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prev) => ({
        ...prev,
        products: prev.products?.filter(
          (product) => product?._id !== productId
        ),
        totalItems: (prev.totalItems ?? 1) - 1,
      }));

      // 回傳快照資料供 onError 使用
      return { previousData };
    },
    onError: (context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
  });
};
