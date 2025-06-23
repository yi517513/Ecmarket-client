import { useState } from "react";

export const useSellerFilter = (resetPagination) => {
  const [category, setCategory] = useState("all"); // 遊戲類別
  const [type, setType] = useState("all"); // 商品類型

  const filterParams = {
    ...(category !== "all" && { category }),
    ...(type !== "all" && { type }),
  };

  const handleUpdateCategory = (category) => {
    const validTypes = ["all", "mapleStory", "LoL", "Pokemon"];
    if (!validTypes.includes(category)) throw new Error("錯誤的參數類型");

    setCategory(category);
    resetPagination?.();
  };

  const handleUpdateProductType = (type) => {
    const validTypes = ["all", "money", "item", "account"];
    if (!validTypes.includes(type)) throw new Error("錯誤的參數類型");

    setType(type);
    resetPagination?.();
  };

  const categoryConfig = {
    options: [
      { label: "全部遊戲", value: "all" },
      { label: "楓之谷", value: "mapleStory" },
      { label: "英雄聯盟", value: "LoL" },
      { label: "寶可夢", value: "Pokemon" },
    ],
    isActive: (value) => category === value,
    onClick: (value) => handleUpdateCategory(value),
  };

  const productTypeConfig = {
    options: [
      { label: "全部物品", value: "all" },
      { label: "遊戲幣", value: "money" },
      { label: "道具", value: "item" },
      { label: "帳號", value: "account" },
    ],
    isActive: (value) => type === value,
    onClick: (value) => handleUpdateProductType(value),
  };

  return {
    categoryConfig,
    productTypeConfig,
    filterParams,
  };
};
