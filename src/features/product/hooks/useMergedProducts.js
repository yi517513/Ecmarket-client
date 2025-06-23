import { useState, useEffect } from "react";
import { useFetchPublicProducts } from "./useProductQuery";

export const useMergedProducts = ({ ...queryParams }) => {
  // === 1、queryParams 變更時進行 fetch ===
  const { data, isLoading } = useFetchPublicProducts(queryParams);
  const [merged, setMerged] = useState([]);
  const { min, max, productType, limit, mode } = queryParams || {};

  // === 2、儲存狀態前進行重置 ===
  useEffect(() => {
    setMerged([]);
  }, [min, max, productType, limit, mode]);

  // === 3、根據 mode 進行設定 ===
  useEffect(() => {
    const newItems = data?.products ?? [];

    if (mode === "cursor") {
      setMerged((prev) => {
        // 以 Set 結構儲存已 fetch 過的 _id
        const prevIds = new Set(prev?.map?.((p) => p?._id));
        // 保留不在 Set 中相同 _id 的資料
        const filterItems = newItems.filter((item) => !prevIds.has(item._id));
        return [...prev, ...filterItems];
      });
    }
    if (mode === "offset") {
      setMerged(newItems);
    }
  }, [data?.products]);

  return {
    products: merged,
    isLoading,
    nextCursor: data?.nextCursor,
    totalItems: data?.totalItems,
  };
};
