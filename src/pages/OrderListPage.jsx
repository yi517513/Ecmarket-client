import React, { useEffect } from "react";
import { useFetchOrders } from "@features/order/hooks/useOrderQuery";
import { usePagination } from "@hooks/pagination/serverSide/usePagination";
import { OrderFilterBar } from "@features/order/components/OrderFilterBar";
import { useOrderFilter } from "@features/order/hooks/useOrderFilter";
import { OrderList } from "@features/order/components/OrderList";
import { useCreatePaymentHtml } from "@features/order/hooks/useOrderMutate";
import { useConfirmDialogStore } from "@stores/useConfirmDialogStore";
import { useDeleteOrder } from "@features/order/hooks/useOrderMutate";
import { useFetchUserInfoById } from "@features/user/hooks/useUserQuery";
import { useChatStore } from "@app/stores/useChatStore";

export const OrderListPage = () => {
  const openConfirm = useConfirmDialogStore((s) => s.openConfirm);
  const openChatRoom = useChatStore((s) => s.openChatRoom);
  const setRecipient = useChatStore((s) => s.setRecipient);
  const { uiControls, paginationLogic } = usePagination();
  const { resetPagination, paginationParams, syncFetchMeta } =
    paginationLogic || {};

  // 更改付款狀態
  const { statusConfig, filterParams } = useOrderFilter(resetPagination);

  const queryParams = { ...paginationParams, ...filterParams };
  // 根據 query fetch 訂單
  const { data: response } = useFetchOrders(queryParams);
  const { orders, totalItems } = response || {};

  // 建立金流 html並轉跳
  const { mutate: createPaymentHtml } = useCreatePaymentHtml();
  // 刪除訂單
  const { mutate: deleteOrder } = useDeleteOrder(queryParams);
  // 搜尋用戶
  const { mutateAsync: fetchUserInfoById } = useFetchUserInfoById();

  const handlePayment = async (orderId) => {
    const confirmed = await openConfirm("即將轉跳至付款頁面");
    if (!confirmed) return;

    createPaymentHtml(orderId);
  };

  const handleDelete = async (orderId) => {
    const confirmed = await openConfirm("是否刪除訂單? 此操作無法還原");
    if (!confirmed) return;

    deleteOrder(orderId);
  };

  const handleContant = async (userId) => {
    const user = await fetchUserInfoById(userId);
    openChatRoom();
    setRecipient(user);
  };

  useEffect(() => {
    syncFetchMeta({ totalItems });
  }, [orders, totalItems]);

  return (
    <div className="flex justify-center w-full h-full p-4">
      <div className="w-full max-w-[1200px] relative space-y-2">
        <OrderFilterBar statusConfig={statusConfig} />
        <OrderList
          orders={orders}
          {...uiControls}
          onContant={handleContant}
          onPayment={handlePayment}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
