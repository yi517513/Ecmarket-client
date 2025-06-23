import React from "react";
import { FilterBar } from "@components/ui/FilterBar";

export const SellerFilterBar = ({
  categoryConfig,
  productTypeConfig,
  sortConfig,
}) => {
  return (
    <div className="filterbar-container">
      {/* 遊戲類別篩選 */}
      <FilterBar {...categoryConfig} />

      {/* 商品類型篩選  */}
      <FilterBar {...productTypeConfig} />

      {/* 條件排序  */}
      <FilterBar {...sortConfig} />
    </div>
  );
};
