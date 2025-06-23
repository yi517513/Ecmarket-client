import React from "react";
import { ListLayout } from "@components/ListLayout";
import { OrderListRow } from "./OrderListRow";

export const OrderList = ({
  orders,
  onContant,
  onPayment,
  onDelete,
  ...uiControls
}) => {
  const isEmpty = orders?.length <= 0;
  const headers = [
    { label: "商品標題", className: "flex-[2]" },
    { label: "付款狀態", className: "flex-1" },
    { label: "購買數量", className: "flex-1" },
    { label: "總金額", className: "flex-1" },
    { label: "操作", className: "flex-1" },
  ];

  return (
    <ListLayout headers={headers} isEmpty={isEmpty} {...uiControls}>
      {orders?.map?.((order, idx) => {
        return (
          <OrderListRow
            key={order.id || idx}
            {...order}
            onContant={onContant}
            onPayment={onPayment}
            onDelete={onDelete}
          />
        );
      })}
    </ListLayout>
  );
};
