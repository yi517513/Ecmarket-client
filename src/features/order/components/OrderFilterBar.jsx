import React from "react";
import { FilterBar } from "@components/ui/FilterBar";

export const OrderFilterBar = ({ statusConfig }) => {
  return (
    <div className="filterbar-container">
      {/* 付款狀態篩選 */}
      <FilterBar {...statusConfig} />
    </div>
  );
};
