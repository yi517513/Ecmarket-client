import React, { useEffect } from "react";
import { SellerProductList } from "@features/product/components/list/SellerProductList";
import { useFetchPrivateProducts } from "@features/product/hooks/useProductQuery";
import { useDeleteProduct } from "@features/product/hooks/useProductMutate";

import { SellerFilterBar } from "@features/product/components/list/SellerFilterBar";
import { useSellerFilter } from "@features/product/hooks/useSellerFilter";
import { usePagination } from "@hooks/pagination/serverSide/usePagination";
import { useSortBar } from "@features/product/hooks/useSortBar";
import { useConfirmDialogStore } from "@stores/useConfirmDialogStore";

export const SellerProductListPage = () => {
  const openConfirm = useConfirmDialogStore((s) => s.openConfirm);
  const { uiControls, paginationLogic } = usePagination();
  const { resetPagination, paginationParams, syncFetchMeta } =
    paginationLogic || {};

  const { categoryConfig, productTypeConfig, filterParams } =
    useSellerFilter(resetPagination);

  const { sortParams, sortConfig } = useSortBar(resetPagination);

  const queryParams = { ...paginationParams, ...filterParams, ...sortParams };
  const { data: response } = useFetchPrivateProducts(queryParams);
  const { products, totalItems } = response || {};

  const { mutate: deleteProduct } = useDeleteProduct(queryParams);

  const handleDelete = async (productId) => {
    const confirmed = await openConfirm("是否刪除商品? 此操作無法還原");
    if (!confirmed) return;

    deleteProduct(productId);
  };

  useEffect(() => {
    syncFetchMeta({ totalItems });
  }, [products, totalItems]);

  return (
    <div className="flex justify-center w-full h-full p-4">
      <div className="w-full max-w-[1200px] relative">
        <SellerFilterBar
          categoryConfig={categoryConfig}
          productTypeConfig={productTypeConfig}
          sortConfig={sortConfig}
        />
        <SellerProductList
          products={products}
          onDelete={handleDelete}
          {...uiControls}
        />
      </div>
    </div>
  );
};
