import { useState } from "react";

export const usePublicFilter = (resetPagination) => {
  const [type, setType] = useState("all"); // 商品類型
  const [min, setMin] = useState("all"); // 金額下限
  const [max, setMax] = useState("all"); // 金額上限

  const filterParams = {
    ...(type !== "all" && { type }),
    ...(min !== "all" && { min }),
    ...(max !== "all" && { max }),
  };

  const parseValue = (value) => {
    if (value === "") return "all";
    const num = Number(value);
    return isNaN(num) ? "all" : num;
  };

  const updatePriceRange = (min, max) => {
    setMin(parseValue(min));
    setMax(parseValue(max));

    resetPagination?.();
  };

  const updateProductType = (type) => {
    const validTypes = ["all", "money", "item", "account"];
    if (!validTypes.includes(type)) throw new Error("錯誤的參數類型");

    setType(type);
    resetPagination?.();
  };

  const resetFilters = () => {
    setType("all");
    setMin("all");
    setMax("all");
    resetPagination?.();
  };

  const productTypeConfig = {
    options: [
      { label: "全部物品", value: "all" },
      { label: "遊戲幣", value: "money" },
      { label: "道具", value: "item" },
      { label: "帳號", value: "account" },
    ],
    isActive: (value) => type === value,
    onClick: (value) => updateProductType(value),
  };

  const priceRangeConfig = {
    options: [
      { label: "全部", value: { min: "all", max: "all" } },
      { label: "1000元以下", value: { min: 1, max: 1000 } },
      { label: "1001~10000元", value: { min: 1001, max: 10000 } },
      { label: "10001~50000元", value: { min: 10001, max: 50000 } },
      { label: "50000元以上", value: { min: 50001, max: "all" } },
    ],
    isActive: (value) => min === value.min,
    onClick: (value) => updatePriceRange(value.min, value.max),
  };

  const extraConfig = { resetFilters, updatePriceRange };

  return {
    productTypeConfig,
    priceRangeConfig,
    extraConfig,
    filterParams,
    filterUrlDeps: { type, min, max },
  };
};
