import React from "react";
import { Modal } from "@components/modal/Modal";
import { useConfirmDialogStore } from "@stores/useConfirmDialogStore";

export const ConfirmDialog = () => {
  const { isOpen, message, resolve, closeConfirm } = useConfirmDialogStore();

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      className="w-full max-w-[360px] p-6 h-auto rounded-2xl shadow-xl"
    >
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <p className="text-center text-base text-gray-800 whitespace-pre-wrap">
          {message}
        </p>
        <div className="flex justify-center gap-4 w-full">
          <button
            className="btn-cancel w-full max-w-[60px]"
            onClick={() => {
              resolve?.(false);
              closeConfirm();
            }}
          >
            取消
          </button>
          <button
            className="btn-primary w-full max-w-[60px]"
            onClick={() => {
              resolve?.(true);
              closeConfirm();
            }}
          >
            確認
          </button>
        </div>
      </div>
    </Modal>
  );
};
