import React from "react";
import { ListLayout } from "@components/ListLayout";
import { PublicProductListRow } from "./PublicProductListRow";

export const PublicProductList = ({ products, ...uiControls }) => {
  const isEmpty = products?.length <= 0;
  const headers = [
    { label: "商品標題", className: "flex-[3]" },
    { label: "單件價格", className: "flex-1" },
    { label: "件數", className: "flex-1" },
    { label: "追蹤人數", className: "flex-1" },
    { label: "銷量", className: "flex-1" },
  ];

  return (
    <ListLayout headers={headers} isEmpty={isEmpty} {...uiControls}>
      {products?.map?.((product, idx) => {
        return <PublicProductListRow key={product?.id || idx} {...product} />;
      })}
    </ListLayout>
  );
};
