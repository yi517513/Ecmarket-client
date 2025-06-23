import React from "react";
import { OffsetPagination } from "./offset/OffsetPagination";
import { InfiniteScrollTrigger } from "./cursor/InfiniteScrollTrigger";

export const Pagination = React.memo(({ mode, ...paginationMeta }) => {
  switch (mode) {
    case "cursor":
      return <InfiniteScrollTrigger {...paginationMeta} />;
    case "offset":
      return <OffsetPagination {...paginationMeta} />;
  }
});
