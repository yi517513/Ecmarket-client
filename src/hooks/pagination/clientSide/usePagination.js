import { useState } from "react";

export const usePagination = (items = [], limit = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const validItems = Array.isArray(items) ? items : [];
  const totalItems = validItems.length;
  const totalPages = Math.ceil(totalItems / limit);

  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const paginatedItems = validItems.slice(start, end);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return {
    paginatedItems,
    uiControls: { handlePrev, handleNext, totalItems, totalPages, currentPage },
  };
};
