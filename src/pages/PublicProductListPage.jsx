import React, { useEffect } from "react";
import { PublicProductList } from "@features/product/components/list/PublicProductList";
import { usePagination } from "@hooks/pagination/serverSide/usePagination";
import { usePublicFilter } from "@features/product/hooks/usePublicFilter";
import { useMatch } from "react-router-dom";
import { PaginationConfig } from "@components/pagination/configUi/PaginationConfig";
import { useMergedProducts } from "@features/product/hooks/useMergedProducts";
import { useUrlStateSync } from "@hooks/url/useUrlStateSync";
import { PublicFilterBar } from "@features/product/components/list/PublicFilterBar";

export const PublicProductListPage = () => {
  const matchGame = useMatch("/products/:category");
  const category = matchGame?.params.category;

  const { uiControls, paginationLogic, configControls, paginationUrlDeps } =
    usePagination();

  const { resetPagination, paginationParams, syncFetchMeta } =
    paginationLogic || {};

  const {
    productTypeConfig,
    priceRangeConfig,
    extraConfig,
    filterParams,
    filterUrlDeps,
  } = usePublicFilter(resetPagination);

  const { products, nextCursor, totalItems } = useMergedProducts({
    category,
    ...paginationParams,
    ...filterParams,
  });

  const { syncStateToUrl } = useUrlStateSync();

  useEffect(() => {
    // 分離關注。Page 只需知道將 fetch 後的必須參數交給 pagination 就好
    syncFetchMeta({ totalItems, nextCursor });

    // 預期同步至 url 的 state ， state to url
    syncStateToUrl({ ...paginationUrlDeps, ...filterUrlDeps });
  }, [products, totalItems]);

  return (
    <div className="flex justify-center w-full h-full p-4">
      <div className="w-full max-w-[1200px] relative">
        <PublicFilterBar
          productTypeConfig={productTypeConfig}
          priceRangeConfig={priceRangeConfig}
          extraConfig={extraConfig}
        />
        <PaginationConfig {...configControls} />
        <PublicProductList products={products} {...uiControls} />
      </div>
    </div>
  );
};
