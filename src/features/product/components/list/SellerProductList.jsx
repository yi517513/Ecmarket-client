import React from "react";
import { ListLayout } from "@components/ListLayout";
import { SellerProductListRow } from "./SellerProductListRow";

export const SellerProductList = ({
  products,
  isFetching,
  onDelete,
  ...uiControls
}) => {
  const isEmpty = products?.length <= 0;
  const headers = [
    { label: "商品標題", className: "flex-[3]" },
    { label: "遊戲類別", className: "flex-1" },
    { label: "商品類型", className: "flex-1" },
    { label: "價格", className: "flex-1" },
    { label: "數量", className: "flex-1" },
    { label: "追蹤數", className: "flex-1" },
    { label: "操作", className: "flex-1" },
  ];

  return (
    <ListLayout
      headers={headers}
      isEmpty={isEmpty}
      isFetching={isFetching}
      {...uiControls}
    >
      {products?.map?.((product, idx) => {
        return (
          <SellerProductListRow
            key={product.id || idx}
            {...product}
            onDelete={onDelete}
          />
        );
      })}
    </ListLayout>
  );
};
