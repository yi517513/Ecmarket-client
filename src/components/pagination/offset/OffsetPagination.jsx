import React from "react";
import { JumpInput } from "./JumpInput";
import { PageNumbers } from "./PageNumbers";

export const OffsetPagination = ({
  total,
  handleNext,
  handlePrev,
  handleJump,
  totalPages,
  currentPage,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 text-sm p-2">
      <span className="text-gray-500">共 {total ?? 0} 筆</span>

      <button
        onClick={async () => {
          await handlePrev();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === 1}
        className="btn-secondary"
      >
        上一頁
      </button>

      <PageNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        handleJump={async (page) => {
          await handleJump(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <button
        onClick={async () => {
          await handleNext();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === totalPages}
        className="btn-secondary"
      >
        下一頁
      </button>

      <span className="text-gray-500">共 {totalPages} 頁</span>

      <JumpInput
        handleJump={async (page) => {
          await handleJump(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};
