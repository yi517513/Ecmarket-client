import React, { useState } from "react";
import { FilterBar } from "@components/ui/FilterBar";

export const PublicFilterBar = ({
  productTypeConfig,
  priceRangeConfig,
  extraConfig,
}) => {
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const handleSubmit = () => {
    extraConfig?.updatePriceRange(minInput, maxInput);

    setMinInput("");
    setMaxInput("");
  };

  return (
    <div className="filterbar-container">
      {/* 商品類型篩選  */}
      <FilterBar
        {...productTypeConfig}
        extra={
          <li className="filterbar-li" onClick={extraConfig?.resetFilters}>
            重置條件
          </li>
        }
      />

      {/* 價格區間篩選  */}
      <FilterBar
        {...priceRangeConfig}
        extra={
          <>
            <input
              placeholder="最低"
              type="text"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="filterbar-input"
            />
            <span>至</span>
            <input
              placeholder="最高"
              type="text"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="filterbar-input"
            />
            <button onClick={handleSubmit} className="filterbar-button">
              確定
            </button>
          </>
        }
      />
    </div>
  );
};
