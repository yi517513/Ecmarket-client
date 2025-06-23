import React from "react";

export const PageNumbers = ({ currentPage, totalPages, handleJump }) => {
  // console.log(currentPage);
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 4);

  if (start > 1) {
    pages.push(
      <button
        key={1}
        onClick={() => handleJump(1)}
        className="pagination-pageNum-btn"
      >
        1
      </button>
    );
    if (start > 3)
      pages.push(
        <span key="dots-start" className="mx-1">
          …
        </span>
      );
  }

  for (let i = start; i <= end; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handleJump(i)}
        className={`pagination-pageNum-btn ${
          i === currentPage ? "pagination-pageNum-btn-active" : ""
        }`}
      >
        {i}
      </button>
    );
  }

  if (end < totalPages) {
    if (end < totalPages - 1)
      pages.push(
        <span key="dots-start" className="mx-1">
          …
        </span>
      );

    pages.push(
      <button
        key={totalPages}
        onClick={() => handleJump(totalPages)}
        className="pagination-pageNum-btn"
      >
        {totalPages}
      </button>
    );
  }
  return pages;
};
