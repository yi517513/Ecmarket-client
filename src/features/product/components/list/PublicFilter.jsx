import React, { useState } from "react";
import { FilterBar } from "@components/ui/FilterBar";

export const PublicFilter = ({
  updatePriceRange,
  updateProductType,
  resetFilters,
  type,
  min,
}) => {
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const handleSubmit = () => {
    updatePriceRange({ min: minInput, max: maxInput });

    setMinInput("");
    setMaxInput("");
  };

  const productTypeOptions = [
    { label: "全部物品", value: "all" },
    { label: "遊戲幣", value: "money" },
    { label: "道具", value: "item" },
    { label: "帳號", value: "account" },
  ];

  const priceRangeOptions = [
    { label: "全部", value: { min: "all", max: "all" } },
    { label: "1000元以下", value: { min: 1, max: 1000 } },
    { label: "1001~10000元", value: { min: 1001, max: 10000 } },
    { label: "10001~50000元", value: { min: 10001, max: 50000 } },
    { label: "50000元以上", value: { min: 50001, max: "all" } },
  ];

  return (
    <div className="filterbar-container">
      {/* 類別篩選  */}
      <FilterBar
        options={productTypeOptions}
        isActive={(value) => type === value}
        onClick={(value) => updateProductType({ type: value })}
        extra={
          <li className="filterbar-li" onClick={resetFilters}>
            重置條件
          </li>
        }
      />

      {/* 價格篩選 */}
      <FilterBar
        options={priceRangeOptions}
        isActive={(value) => min === value.min}
        onClick={(value) =>
          updatePriceRange({ min: value.min, max: value.max })
        }
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
