import React from "react";

export const PaginationConfig = ({ mode, limit, updateConfig }) => {
  const handleModeChange = (newMode) => {
    updateConfig({ mode: newMode });
  };

  const handleLimitChange = (e) => {
    updateConfig({ limit: Number(e.target.value) });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 my-2">
      <button
        onClick={() => handleModeChange("offset")}
        className={`pagination-config-btn-base ${
          mode === "offset"
            ? "pagination-config-btn-active"
            : "pagination-config-btn-inactive"
        }`}
      >
        分頁模式
      </button>

      <button
        onClick={() => handleModeChange("cursor")}
        className={`pagination-config-btn-base ${
          mode === "cursor"
            ? "pagination-config-btn-active"
            : "pagination-config-btn-inactive"
        }`}
      >
        連續載入
      </button>

      <select
        value={limit}
        onChange={handleLimitChange}
        className="pagination-config-btn-select"
      >
        <option value="" disabled>
          選擇每頁數量
        </option>
        <option value="10">10 筆/頁</option>
        <option value="20">20 筆/頁</option>
        <option value="30">30 筆/頁</option>
        <option value="40">40 筆/頁</option>
      </select>
    </div>
  );
};
