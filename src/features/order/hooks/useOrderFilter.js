import { useState } from "react";

export const useOrderFilter = (resetPagination) => {
  const [status, setStatus] = useState("all"); // 付款狀態

  const filterParams = {
    ...(status !== "all" && { status }),
  };

  const handleUpdateStatus = (status) => {
    const validTypes = ["all", "unpaid", "paid", "cancel"];
    if (!validTypes.includes(status)) throw new Error("錯誤的參數類型");

    setStatus(status);
    resetPagination?.();
  };

  const statusConfig = {
    options: [
      { label: "全部訂單", value: "all" },
      { label: "未付款", value: "unpaid" },
      { label: "已付款", value: "paid" },
      { label: "已取消", value: "cancel" },
    ],
    isActive: (value) => status === value,
    onClick: (value) => handleUpdateStatus(value),
  };

  return { statusConfig, filterParams };
};
