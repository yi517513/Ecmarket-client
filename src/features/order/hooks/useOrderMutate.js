import {
  createOrderApi,
  createPaymentHtmlApi,
  deleteOrderApi,
} from "../api/orderApi";
import { useQueryClient } from "@tanstack/react-query";
import { useProtectedMutate } from "@hooks/useProtectedMutate";
import { notifyUtils as notify } from "@utils/notify";

export const useCreateOrder = () => {
  return useProtectedMutate({
    mutationFn: createOrderApi,
    onMutate: () => {
      notify.loading("建立訂單中。。。");
    },
    onSuccess: (html) => {
      // 建立 DOM 並 auto-submit 表單
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);
      const form = div.querySelector("form");

      if (form) {
        form.submit();
        setTimeout(() => document.body.removeChild(div), 3000); // 提交後移除表單 DOM
      }
    },
  });
};

export const useCreatePaymentHtml = () => {
  return useProtectedMutate({
    mutationFn: createPaymentHtmlApi,
    onSuccess: (html) => {
      // 建立 DOM 並 auto-submit 表單
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);
      const form = div.querySelector("form");

      if (form) {
        form.submit();
        setTimeout(() => document.body.removeChild(div), 3000); // 提交後移除表單 DOM
      }
    },
  });
};

export const useDeleteOrder = (queryParams) => {
  const queryClient = useQueryClient();
  const queryKey = ["private", "Orders", queryParams];

  return useProtectedMutate({
    mutationFn: deleteOrderApi,
    onMutate: async (orderId) => {
      notify.loading("正在刪除中。。");

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prev) => ({
        ...prev,
        orders: prev.orders?.filter((order) => order?._id !== orderId),
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
