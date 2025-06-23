import { useState } from "react";

export const useSortBar = (resetPagination) => {
  const [sort, setSort] = useState("default"); // 預設為 updatedAt 排序

  const handleChangeSort = (value) => {
    const validTypes = ["default", "latest", "high-to-low", "low-to-high"];
    if (!validTypes.includes(value)) throw new Error("錯誤的參數類型");

    setSort(value);
    resetPagination?.();
  };

  const sortConfig = {
    options: [
      { label: "預設排序", value: "default" },
      { label: "最新上架", value: "latest" },
      { label: "價格高至低", value: "high-to-low" },
      { label: "價格低至高", value: "low-to-high" },
    ],
    isActive: (value) => sort === value,
    onClick: (value) => handleChangeSort(value),
  };

  const sortParams = {
    ...((sort === "default") !== "all" && { sort }),
  };

  return { sortParams, sortConfig };
};
